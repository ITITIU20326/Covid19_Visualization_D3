function vaccine() {
    const intervalDuration = 1000; // Time between transitions in milliseconds (adjust as needed)
    let timeLapseInterval; // Variable to store the interval ID
    let currentDayIndex = 0; // Index to keep track of the current day
    let centered; // Variable to keep track of the currently centered country

    // Set up the interval for the time-lapse effect when the button is clicked
    function startTimeLapse() {
        function updateDayAndDraw() {
            if (currentDayIndex < days.length) {
                const currentDate = days[currentDayIndex];
                loadDataAndDraw(currentDate);
                currentDayIndex++;
            } else {
                clearInterval(timeLapseInterval);
            }
        }

        timeLapseInterval = setInterval(updateDayAndDraw, intervalDuration);
    }

    // Add a click event listener to the Time Lapse button
    d3.select("#timeLapseButton").on("click", startTimeLapse);

    const width = 960,
        height = 480;

    const years = [
        { year: 2020, value: "data1" },
        { year: 2021, value: "data2" },
        { year: 2022, value: "data3" },
        { year: 2023, value: "data4" },
    ];

    const options = [
        { name: "Equirectangular (Plate Carrée)", projection: d3.geoEquirectangular() },
    ];

    options.forEach(function (o) {
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
        .datum({ type: "Sphere" })
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
            // Get the bounding box of the path representing the clicked country
            const bounds = path.bounds(d);

            // Call zoomToBoundingBox function to compute center and zoom level
            const { center, zoom } = zoomToBoundingBox(bounds);

            // Perform zoom and pan to the position of the clicked country
            svg.transition()
                .duration(750)
                .call(
                    zoomFunction.transform,
                    d3.zoomIdentity
                        .translate(width / 2, height / 2)
                        .scale(zoom)
                        .translate(-center[0], -center[1])
                );

            // Set the clicked country as the center to avoid too fast panning
            centered = d;

            // If needed, perform other actions when clicking on a country
            // For example, change the color of the clicked country
            svg.selectAll("path")
                .transition()
                .style("fill", function (d) {
                    return centered && d === centered ? "#66CC33" : "#25498a";
                });
        } else {
            // If the country has already been clicked, shrink it back
            svg.transition()
                .duration(750)
                .call(
                    zoomFunction.transform,
                    d3.zoomIdentity
                        .translate(width / 30, height / 30)
                        .scale(1)
                        .translate(0, 0)
                );

            // Reset the state for the next click
            centered = null;

            // Reset the color of all countries to the default color
            svg.selectAll("path")
                .transition()
                .style("fill", "#25498a");
        }

        // Prevent click event from propagating to other elements
        d3.event.stopPropagation();
    }

    // Call the zoom function on the SVG element
    svg.call(zoomFunction);

    // Add a click event listener to handle clicks on the body
    d3.select("body")
        .on("click", (event) => {
            const clickedElement = event.target;

            // Exclude clicks on the select element with an id of "years-menu"
            if (clickedElement.id !== "years-menu") {
                // Get center and zoom level and transition to the specified position
                const { center, zoom } = zoomToBoundingBox([[10, 20], [30, 40]]);
                svg.transition().duration(750)
                    .call(zoomFunction.transform, d3.zoomIdentity
                        .translate(width / 2, height / 2)
                        .scale(zoom)
                        .translate(-projection(center)[0], -projection(center)[1])
                    );
            }
        });

    // Create a menu for selecting projections
    const menu = d3.select("#projection-menu")
        .on("change", change)
        .style("border-radius", "3px")
        .style("right", "210px");

    menu.selectAll("option")
        .data(options)
        .enter().append("option")
        .text(function (d) { return d.name; });

    // Handle change in projection selection
    function change() {
        const selectedOption = options[this.selectedIndex];
        update(selectedOption);
    }

    // Update the projection based on the selected option
    function update(option) {
        svg.selectAll("path").interrupt().transition()
            .duration(1000).ease(d3.easeLinear)
            .attrTween("d", projectionTween(projection, projection = option.projection));
    }

    // Create a menu for selecting years
    const menuYear = d3.select("#years-menu")
        .style("border-radius", "3px")
        .style("right", "210px");

    menuYear.selectAll("option")
        .data(years)
        .enter().append("option")
        .attr("value", function (d) {
            return d.value;
        })
        .text(function (d) { return d.year; });

    // Set up initial date range and data map
    const startDate = new Date("2020-01-01");
    const endDate = new Date("2023-12-31");
    const days = d3.timeDay.range(startDate, endDate, 1);
    const data = d3.map();

    // Define color scale for vaccination data
    const colorScale = d3.scaleThreshold()
        .domain([1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000, 100000000])
        .range(d3.schemeRdPu[9]);

    // Function to load data and draw the map for a specific date
    function loadDataAndDraw(date) {
        svg.selectAll(".state").remove();

        const formattedDate = d3.timeFormat("%Y-%m-%d")(date);

        // Use d3.queue to load geojson and csv data simultaneously
        d3.queue()
            .defer(d3.json, "data/world.geojson")
            .defer(d3.csv, `data/world_total_vaccinations.csv`, function (d) {
                data.set(d.iso_code, +d[`${formattedDate}`]);
            })
            .await(draw);

        // Function to draw the map based on loaded data
        function draw(error, world) {
            if (error) throw error;

            const landGroup = svg.append("g");

            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            landGroup.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                .attr("d", d3.geoPath().projection(projection))
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function (d) { return "Country"; })
                .style("opacity", .8)
                .on("mouseover", function (d) {
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black");
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>Total Cases: ${d.total.toLocaleString()}`)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY + 10) + "px")
                        .transition()
                        .duration(200)
                        .style("opacity", .9);
                })
                .on("mouseout", function (d) {
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8);
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent");
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                });
        }
    }

    // Function to handle changes in the year selection
    d3.select("#years-menu").on("change", function () {
        const selectedOption = d3.select(this).property("value");
        // Call the appropriate update function based on the selected year
        if (selectedOption === "data2") {
            update2021();
        } else if (selectedOption === "data3") {
            update2022();
        } else if (selectedOption === "data4") {
            update2023();
        } else {
            update2020();
        }
    });

    // Function to handle projection transitions
    function projectionTween(projection0, projection1) {
        return function (d) {
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

            return function (_) {
                t = _;
                return path(d);
            };
        };
    }

    // Function to update the map for the year 2020
    function update2020() {
        // Implement logic to update the map for the year 2020
    }

    // Function to update the map for the year 2021
    function update2021() {
        // Implement logic to update the map for the year 2021
    }

    // Function to update the map for the year 2022
    function update2022() {
        // Implement logic to update the map for the year 2022
    }

    // Function to update the map for the year 2023
    function update2023() {
        // Implement logic to update the map for the year 2023
    }
}

// Call the vaccine function to initialize the map
vaccine();
