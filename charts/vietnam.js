function vietnam() {
  const width = 1600;
  const height = 500;
  let padding = 90;
  let padding2 = padding * 1.4;

  // Define row converter for CSV
  let rowConverter2 = function (d) {
    return {
      year: +d["year"], // Assuming the column name in your new CSV is "year"
      world: +d["world"], // Assuming the column name in your new CSV is "world"
    };
  };

  d3.csv(
    "data/total_cases_per_million.csv",
    rowConverter2,
    function (error, data) {
      if (!error) {
        // Combine values for duplicate years
        let combinedData = combineByYear(data);

        // Define scale for world data
        let worldScale = d3
          .scaleLinear()
          .domain([0, d3.max(combinedData, function (d) { return d.world; })])
          .range([height - padding, padding]);

        // Define x-axis scale
        let yearScale = d3
          .scaleLinear()
          .domain([
            d3.min(combinedData, function (d) { return d.year; }),
            d3.max(combinedData, function (d) { return d.year; }),
          ])
          .rangeRound([padding, width - padding * 2]);

        // Add SVG for the chart
        let svg = d3
        .select("#vietnam-area")
        .append("svg")
        .attr("height", height)
        .attr("width", width);
    
      // Define line function
      let line = d3
        .line()
        .x(function (d) {
          return yearScale(d.year);
        })
        .y(function (d) {
          return worldScale(d.world);
        });
    
      // Draw the line chart
      let worldChart = svg
        .datum(combinedData)
        .append("path")
        .attr("d", line)
        .attr("stroke", "#0013de")
        .style("stroke-width", 4)
        .style("fill", "none")
        .attr("class", "world-line");
    
      // Add x-axis
      let yearAxis = d3
        .axisBottom(yearScale)
        .ticks(4)
        .tickFormat(d3.format("i"));
    
      svg
        .append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .attr("font-weight", "bold")
        .style("stroke-width", "2px")
        .call(yearAxis);
    
      // Add y-axis
      let worldAxis = d3
        .axisLeft(worldScale)
        .ticks(5)
        .tickFormat(d3.format(".2s"));
    
      svg
        .append("g")
        .attr("class", "yAxis")
        .attr("transform", "translate(" + padding + ",0)")
        .attr("font-weight", "bold")
        .style("stroke-width", "2px")
        .call(worldAxis);
    
      // Add axis labels
      svg
        .append("text")
        .text("Worldwide COVID-19 Cases Per Million People")
        .attr("class", "Axis-label")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height - padding * 0.3)
        .attr("font-size", 14)
        .attr("font-weight", "bold");
    
      svg
        .append("text")
        .text("Year")
        .attr("class", "Axis-label")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height - padding * 0.6)
        .attr("font-weight", "bold")
        .attr("font-size", 14);
    
      svg
        .append("text")
        .text("Cases Per Million People")
        .attr("class", "Axis-label")
        .attr("text-anchor", "middle")
        .attr("x", -height / 2)
        .attr("y", padding / 2)
        .attr("font-size", 14)
        .attr("font-weight", "bold")
        .attr("transform", "rotate(-90)");
    
      // Add tooltip
      let tooltip = d3
      .select("#vietnam-area")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  
    // Add event listeners for tooltip
    svg
      .on("mouseover", function () {
        tooltip.style("opacity", 1);
      })
      .on("mouseout", function () {
        tooltip.style("opacity", 0);
      })
      .on("mousemove", function () {
        let [x, y] = d3.mouse(this);
        let x0 = yearScale.invert(x);
        let i = bisect(combinedData, x0, 1);
        let selectedData = combinedData[i];
  
        tooltip
          .html("Year: " + selectedData.year + "<br>Cases: " + selectedData.world)
          .style("left", x + 10 + "px")
          .style("top", y - 10 + "px");
      });
  
    // Function to get nearest x-position
    let bisect = d3.bisector(function (d) {
      return d.year;
    }).left;
  
    
      // Function to combine values for duplicate years
      function combineByYear(data) {
        let combinedData = [];
        data.forEach(function (d) {
          let existing = combinedData.find(function (item) {
            return item.year === d.year;
          });
    
          if (existing) {
            existing.world += d.world;
          } else {
            combinedData.push({ year: d.year, world: d.world });
          }
        });
    
        return combinedData;
      }
    }
  }
  )
}