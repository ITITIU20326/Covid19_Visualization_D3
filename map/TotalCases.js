function cases() {
    
    const intervalDuration = 1000; // Time between transitions in milliseconds (adjust as needed)
    let currentYearIndex = 0; // Index to keep track of the current year
    let timeLapseInterval; // Variable to store the interval ID
    function updateYear() {
        const selectedOption = years[currentYearIndex].value;

        // Call the corresponding update function based on the current year
        if (selectedOption === "data1") {
            update2020_12();
        }else if (selectedOption === "data2") {
            update2021_1();
        }else if (selectedOption === "data3") {
            update2021_2();
        }else if (selectedOption === "data4") {
            update2021_3();
        }else if (selectedOption === "data5") {
            update2021_4();
        }else if (selectedOption === "data6") {
            update2021_5();
        }else if (selectedOption === "data7") {
            update2021_6();
        }else if (selectedOption === "data8") {
            update2021_7();
        }else if (selectedOption === "data9") {
            update2021_8();
        }else if (selectedOption === "data10") {
            update2021_9();
        }else if (selectedOption === "data11") {
            update2021_10();
        }else if (selectedOption === "data12") {
            update2021_11();
        }else if (selectedOption === "data13") {
            update2021_12();
        }else if (selectedOption === "data14") {
            update2022_1();
        }else if (selectedOption === "data15") {
            update2022_2();
        }else if (selectedOption === "data16") {
            update2022_3();
        }else if (selectedOption === "data17") {
            update2022_4();
        }else if (selectedOption === "data18") {
            update2022_5();
        }else if (selectedOption === "data19") {
            update2022_6();
        }else if (selectedOption === "data20") {
            update2022_7();
        }else if (selectedOption === "data21") {
            update2022_8();
        }else if (selectedOption === "data22") {
            update2022_9();
        }else if (selectedOption === "data23") {
            update2022_10();
        }else if (selectedOption === "data24") {
            update2022_11();
        }else if (selectedOption === "data25") {
            update2022_12();
        }else if (selectedOption === "data26") {
            update2023_1();
        }else if (selectedOption === "data27") {
            update2023_2();
        }else if (selectedOption === "data28") {
            update2023_3();
        }else if (selectedOption === "data29") {
            update2023_4();
        }else if (selectedOption === "data30") {
            update2023_5();
        }else if (selectedOption === "data31") {
            update2023_6();
        }else if (selectedOption === "data32") {
            update2023_7();
        }else if (selectedOption === "data33") {
            update2023_8();
        }else if (selectedOption === "data34") {
            update2023_9();
        }else if (selectedOption === "data35") {
            update2023_10();
        }else if (selectedOption === "data36") {
            update2023_11();
        }else if (selectedOption === "data37") {
            update2023_12();
        }
        else{
            update2020_12();
        }
        // Move to the next year
        currentYearIndex = (currentYearIndex + 1) % years.length;
        if (selectedOption === "data37") {
            clearInterval(timeLapseInterval);
        }
    }

    // Set up the interval for the time-lapse effect when the button is clicked
    function startTimeLapse() {
        timeLapseInterval = setInterval(updateYear, intervalDuration);
    }

    // Stop the time-lapse when the user clicks on the map
    d3.select("body").on("click", function () {
        clearInterval(timeLapseInterval);
    });

    // Add a click event listener to the Time Lapse button
    d3.select("#timeLapseButton").on("click", startTimeLapse);
    const width = 960,
        height = 480;

        const years = [
            { year: 2020-12, value: "data1" },{ year: 2021-1, value: "data2" },
            { year: 2021-2, value: "data3" },{ year: 2021-3, value: "data4" },{ year: 2021-4, value: "data5" },{ year: 2021-5, value: "data6" },
            { year: 2021-6, value: "data7" },{ year: 2021-7, value: "data8" },{ year: 2021-8, value: "data9" },{ year: 2021-9, value: "data10" },
            { year: 2021-10, value: "data11" },{ year: 2021-11, value: "data12" },{ year: 2021-12, value: "data13" },{ year: 2022-1, value: "data14" },
            { year: 2022-2, value: "data15" },{ year: 2022-3, value: "data16" },{ year: 2022-4, value: "data17" },{ year: 2022-5, value: "data18" },
            { year: 2022-6, value: "data19" },{ year: 2022-7, value: "data20" },{ year: 2022-8, value: "data21" },{ year: 2022-9, value: "data22" },
            { year: 2022-10, value: "data23" },{ year: 2022-11, value: "data24" },{ year: 2022-12, value: "data25" },{ year: 2023-1, value: "data26" },
            { year: 2023-2, value: "data27" },{ year: 2023-3, value: "data28" },{ year: 2023-4, value: "data29" },{ year: 2023-5, value: "data30" },
            { year: 2023-6, value: "data31" },{ year: 2023-7, value: "data32" },{ year: 2023-8, value: "data33" },{ year: 2023-9, value: "data34" },
            { year: 2023-10, value: "data35" },{ year: 2023-11, value: "data36" },{ year: 2023-12, value: "data37" },

        ];
        

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
        .domain([1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000, 100000000000])
        .range(d3.schemeRdPu[9]);
        
        
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
    d3.select("#years-menu").on("change", function() {
        const selectedOption = d3.select(this).property("value");
        if (selectedOption === "data1") {
            update2020_12();
        }else if (selectedOption === "data2") {
            update2021_1();
        }else if (selectedOption === "data3") {
            update2021_2();
        }else if (selectedOption === "data4") {
            update2021_3();
        }else if (selectedOption === "data5") {
            update2021_4();
        }else if (selectedOption === "data6") {
            update2021_5();
        }else if (selectedOption === "data7") {
            update2021_6();
        }else if (selectedOption === "data8") {
            update2021_7();
        }else if (selectedOption === "data9") {
            update2021_8();
        }else if (selectedOption === "data10") {
            update2021_9();
        }else if (selectedOption === "data11") {
            update2021_10();
        }else if (selectedOption === "data12") {
            update2021_11();
        }else if (selectedOption === "data13") {
            update2021_12();
        }else if (selectedOption === "data14") {
            update2022_1();
        }else if (selectedOption === "data15") {
            update2022_2();
        }else if (selectedOption === "data16") {
            update2022_3();
        }else if (selectedOption === "data17") {
            update2022_4();
        }else if (selectedOption === "data18") {
            update2022_5();
        }else if (selectedOption === "data19") {
            update2022_6();
        }else if (selectedOption === "data20") {
            update2022_7();
        }else if (selectedOption === "data21") {
            update2022_8();
        }else if (selectedOption === "data22") {
            update2022_9();
        }else if (selectedOption === "data23") {
            update2022_10();
        }else if (selectedOption === "data24") {
            update2022_11();
        }else if (selectedOption === "data25") {
            update2022_12();
        }else if (selectedOption === "data26") {
            update2023_1();
        }else if (selectedOption === "data27") {
            update2023_2();
        }else if (selectedOption === "data28") {
            update2023_3();
        }else if (selectedOption === "data29") {
            update2023_4();
        }else if (selectedOption === "data30") {
            update2023_5();
        }else if (selectedOption === "data31") {
            update2023_6();
        }else if (selectedOption === "data32") {
            update2023_7();
        }else if (selectedOption === "data33") {
            update2023_8();
        }else if (selectedOption === "data34") {
            update2023_9();
        }else if (selectedOption === "data35") {
            update2023_10();
        }else if (selectedOption === "data36") {
            update2023_11();
        }else if (selectedOption === "data37") {
            update2023_12();
        }
        else{
            update2020_12();
    }})
    function update2020_12() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['12/2020']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2020_12();
    
    function update2021_1() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['1/2021']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2021_1();
    function update2021_2() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['2/2021']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2021_2();
    function update2021_3() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['3/2021']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2021_3();
    function update2021_4() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['4/2021']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2021_4();
    function update2021_5() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['5/2021']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2021_5();
    function update2021_6() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['6/2021']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2021_6();
    function update2021_7() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['7/2021']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2021_7();
    function update2021_8() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['8/2021']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2021_8();
    function update2021_9() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['9/2021']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2021_9();
    function update2021_10() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['10/2021']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2021_10();
    function update2021_11() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/wMonths_cases.csv", function(d) {
                data.set(d.iso_code, +d['11/2021']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2021_11();
    function update2021_12() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['12/2021']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2021_12();
    function update2022_1() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['1/2022']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2022_1();
    function update2022_2() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['2/2022']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2022_2();
    function update2022_3() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['3/2022']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2022_3();
    function update2022_4() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['4/2022']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2022_4();
    function update2022_5() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['5/2022']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2022_5();
    function update2022_6() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['6/2022']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2022_6();
    function update2022_7() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['7/2022']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2022_7();
    function update2022_8() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['8/2022']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2022_8();
    function update2022_9() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['9/2022']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2022_9();
    function update2022_10() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['10/2022']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2022_10();
    function update2022_11() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['11/2022']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2022_11();
    function update2022_12() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['12/2022']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2022_12();
    function update2023_1() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['1/2023']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2023_1();
    function update2023_2() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['2/2023']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2023_2();
    function update2023_3() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['3/2023']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2023_3();
    function update2023_4() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['4/2023']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2023_4();
    function update2023_5() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['5/2023']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2023_5();
    function update2021_6() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['6/2023']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2023_6();
    function update2023_7() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['7/2023']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2023_7();
    function update2023_8() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['8/2023']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2023_8();
    function update2023_9() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['9/2023']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2023_9();
    function update2023_10() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['10/2023']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2023_10();
    function update2023_11() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['11/2023']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2023_11();
    function update2023_12() {
        svg.selectAll(".state").remove();

        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, "data/Months_cases.csv", function(d) {
                data.set(d.iso_code, +d['12/2023']) 
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
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Vaccines: ${d.total.toLocaleString()}`)
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

    update2023_12();
    
}