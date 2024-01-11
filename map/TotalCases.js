function age() {
    const width = 960,
        height = 480;

    const years = [
        {year: 2019, value: "data1"}, {year: 2020, value: "data2"}, {year: 2021, value: "data3"}, {year: 2022, value: "data4"},
        {year: 2023, value: "data5"}
    ]

    const options = [
        {name: "Equirectangular (Plate Carrée)", projection: d3.geoEquirectangular()},
    ];

    options.forEach(function(o) {
        o.projection.rotate([0, 0]).center([0, 0]);
    });

    let i = 0;
    let projection = options[i].projection;
    const path = d3.geoPath(projection);
    const svg = d3.select("body")
        .append("svg")
        .attr("class", "world")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 23 ${width} 455`);

    svg.append("defs")
        .append("path")
        .datum({type: "Sphere"})
        .attr("id", "sphere")
        .attr("d", path);
    svg.append("use")
        .attr("class", "fill")
        .attr("xlink:href", "#sphere");

    function zoomToBoundingBox(bbox) {
        const [[x0, y0], [x1, y1]] = bbox;
        const bounds = [[x0, y0], [x1, y1]];

        // Compute the center of the bounding box
        const center = [
            (bounds[0][0] + bounds[1][0]) / 2,
            (bounds[0][1] + bounds[1][1]) / 2
        ];

        // Compute the zoom level based on the bounding box width
        const dx = bounds[1][0] - bounds[0][0];
        const dy = bounds[1][1] - bounds[0][1];
        const zoom = Math.min(12, 0.9 / Math.max(dx / width, dy / height));

        // Return the center and zoom level, but don't apply the zoom and pan to the map
        return { center, zoom };
    }

    const zoomFunction = d3.zoom()
        .scaleExtent([1, 8])
        .on("zoom", zoomed);

    function zoomed() {
        svg.selectAll("path")
            .attr("transform", d3.event.transform)
            .on("click", clicked);
    }
    function clicked(d) {
        if (d && centered !== d) {
            // Lấy bounding box của path đại diện cho nước được click
            const bounds = path.bounds(d);
    
            // Gọi hàm zoomToBoundingBox để tính toán center và zoom level
            const { center, zoom } = zoomToBoundingBox(bounds);
    
            // Thực hiện phóng to và pan đến vị trí của nước được click
            svg.transition()
                .duration(750)
                .call(
                    zoomFunction.transform,
                    d3.zoomIdentity
                        .translate(width / 2, height / 2)
                        .scale(zoom)
                        .translate(-center[0], -center[1])
                       
                );
    
            // Đặt nước được click làm trung tâm để tránh việc pan quá nhanh
            centered = d;
    
            // Nếu cần, thực hiện các hành động khác khi click vào nước
            // Ví dụ: thay đổi màu sắc của nước được click
            svg.selectAll("path")
                .transition()
                .style("fill", function (d) {
                    return centered && d === centered ? "#66CC33" : "#25498a";
                });
            } else {
                // Nếu nước đã được click rồi, thì thu nhỏ lại
                svg.transition()
                    .duration(750)
                    .call(
                        zoomFunction.transform,
                        d3.zoomIdentity
                            .translate(width/30, height/30 )
                            .scale(1)
                            .translate(0, 0)
                    );
    
                // Reset trạng thái để chuẩn bị cho lần click tiếp theo
                centered = null;
    
                // Reset màu sắc của tất cả các nước về màu mặc định
                svg.selectAll("path")
                    .transition()
                    .style("fill", "#25498a");
            }
    
            // Ngăn chặn sự kiện click lan toả đến các element khác
            d3.event.stopPropagation();
        }
        let centered;
    svg.call(zoomFunction);

    d3.select("body")
        .on("click", (event) => {
            const clickedElement = event.target;

            // Exclude clicks on the select element with an id of "years-menu"
            if (clickedElement.id !== "years-menu") {
                const { center, zoom } = zoomToBoundingBox([[10, 20], [30, 40]]);
                svg.transition().duration(750)
                    .call(zoomFunction.transform, d3.zoomIdentity
                        .translate(width / 2, height / 2)
                        .scale(zoom)
                        .translate(-projection(center)[0], -projection(center)[1])
                    );
            }
        });

    const menu = d3.select("#projection-menu")
        .on("change", change)
        .style("border-radius", "3px")
        .style("right", "210px")

    menu.selectAll("option")
        .data(options)
        .enter().append("option")
        .text(function(d) { return d.name; });

    function change() {
        const selectedOption = options[this.selectedIndex];
        update(selectedOption);
    }

    function update(option) {
        svg.selectAll("path").interrupt().transition()
            .duration(1000).ease(d3.easeLinear)
            .attrTween("d", projectionTween(projection, projection = option.projection))
    }

// Years
    const menuYear = d3.select("#years-menu")
        .style("border-radius", "3px")
        .style("right", "210px")

    menuYear.selectAll("option")
        .data(years)
        .enter().append("option")
        .attr("value", function(d) {
            return d.value;
        })
        .text(function(d) { return d.year; });

    const data = d3.map();

    const colorScale = d3.scaleThreshold()
        .domain([1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000, 100000000])
        .range(d3.schemeRdPu[9]);
        
    function update2020() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/total_cases.csv", function(d) {
                data.set(d.Code, +d.Case_2020)
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;
            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0); 

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Total Cases: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    update2020();

    d3.select("#years-menu").on("change", function() {
        const selectedOption = d3.select(this).property("value");
        if (selectedOption === "data3") {
            update2021();
        }
        else if (selectedOption === "data4") {
            update2022();
        }
        else if (selectedOption === "data5") {
            update2023();
        }
        else {
            update2020();
        }
    })

    function projectionTween(projection0, projection1) {
        return function(d) {
            let t = 0;
            const projection = d3.geoProjection(project)
                .scale(1)
                .translate([width / 2, height / 2]);
            const path = d3.geoPath(projection);

            function project(a, b) {
                a *= 180 / Math.PI, b *= 180 / Math.PI;
                const p0 = projection0([a, b]), p1 = projection1([a, b]);
                return [(1 - t) * p0[0] + t * p1[0], (1 - t) * -p0[1] + t * -p1[1]];
            }
            return function(_) {
                t = _;
                return path(d);
            };
        };
    }
    function update2021() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/total_cases.csv", function(d) {
                data.set(d.Code, +d.Case_2021)
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;
            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0); 

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Total Cases: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    update2021();
    function update2022() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/total_cases.csv", function(d) {
                data.set(d.Code, +d.Case_2022)
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;
            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0); 

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Total Cases: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    update2022();

    function update2023() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/total_cases.csv", function(d) {
                data.set(d.Code, +d.Case_2023)
            })
            .await(draw);

        function draw (error, world) {
            if (error) throw error;
            // create a group for the land path elements
            const landGroup = svg.append("g");

            // create a tooltip element and hide it initially
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0); 

            // add the land areas to the map as path elements
            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                // draw each country
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                // set the color of each country
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function(d){ return "Country" } )
                .style("opacity", .8)
                // add event handlers for mouseover and mouseout events
                .on("mouseover", function(d) {
                    // change the fill color of the hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    // show tooltip with country name and total value
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Total Cases: ${d.total}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function(d) {
                    // change the fill color of the previously hovered path element
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    // hide tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    update2023();

}