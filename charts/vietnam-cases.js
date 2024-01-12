function vietnam2() {
    const width = 1600;
    const height = 500;
    let padding = 90;
    let duration = 5000; // Duration of the time-lapse animation in milliseconds
  
    let rowConverter = function (d) {
      return {
        date: new Date(d["date"]),
        total_cases: +d["total_cases"],
      };
    };
  
    d3.csv(
      "data/vietnam-covid-cases.csv",
      rowConverter,
      function (error, data) {
        if (!error) {
          let casesScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, function (d) { return d.total_cases; })])
            .range([height - padding, padding]);
  
          let dateScale = d3
            .scaleTime()
            .domain([
              new Date("2020-01-24"),
              new Date("2023-11-20"),
            ])
            .range([padding, width - padding * 2]);
  
          let svg = d3
            .select("#vietnam-area")
            .append("svg")
            .attr("height", height)
            .attr("width", width);
  
          let line = d3
            .line()
            .x(function (d) {
              return dateScale(d.date);
            })
            .y(function (d) {
              return casesScale(d.total_cases);
            });
  
          let casesChart = svg
            .datum(data)
            .append("path")
            .attr("d", line)
            .attr("stroke", "#0013de")
            .style("stroke-width", 4)
            .style("fill", "none")
            .attr("class", "cases-line");
  
          // Create focus group
          let focusGroup = svg.append("g")
            .attr("class", "focus-group");
  
          // Create focus circle
          let focusCircle = focusGroup.append("circle")
            .attr("class", "focus-circle")
            .attr("r", 6)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 4)
            .style("opacity", 0); // Initially hidden
          
          // Update focus circle
          function updateFocus(selectedData) {
            // Update focus circle
            focusCircle
              .attr("cx", dateScale(selectedData.date))
              .attr("cy", casesScale(selectedData.total_cases))
              .style("opacity", 1);
          }
  
          let dateAxis = d3
            .axisBottom(dateScale)
            .ticks(d3.timeYear.every(1))
            .tickFormat(d3.timeFormat("%Y"));
  
          svg
            .append("g")
            .attr("class", "xAxis")
            .attr("transform", "translate(0," + (height - padding) + ")")
            .attr("font-weight", "bold")
            .style("stroke-width", "2px")
            .call(dateAxis);
  
          let casesAxis = d3
            .axisLeft(casesScale)
            .ticks(5)
            .tickFormat(d3.format(".2s"));
  
          svg
            .append("g")
            .attr("class", "yAxis")
            .attr("transform", "translate(" + padding + ",0)")
            .attr("font-weight", "bold")
            .style("stroke-width", "2px")
            .call(casesAxis);
  
          let tooltip = d3
            .select("#vietnam-area")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
  
          svg
            .on("mouseover", function () {
              tooltip.style("opacity", 1);
            })
            .on("mouseout", function () {
              tooltip.style("opacity", 0);
              // Remove focus circle and text on mouseout
              focusCircle.style("opacity", 0);
              focusTextGroup.selectAll(".focus-text").remove();
            })
            .on("mousemove", function () {
              let [x, y] = d3.mouse(this);
              let x0 = dateScale.invert(x);
              let i = bisect(data, x0, 1);
              let selectedData = data[i];
  
              tooltip
                .html("Date: " + selectedData.date.toLocaleDateString() + "<br>cases: " + selectedData.total_cases.toLocaleString())
                .style("left", x + 10 + "px")
                .style("top", y - 10 + "px");
  
              // Update focus circle and text
              updateFocus(selectedData);
            });
  
          let bisect = d3.bisector(function (d) {
            return d.date;
          }).left;
  
          // Time-lapse function
          function startTimelapse() {
            let totalLength = casesChart.node().getTotalLength();
            
            casesChart
              .attr("stroke-dasharray", totalLength + " " + totalLength)
              .attr("stroke-dashoffset", totalLength)
              .transition()
              .duration(duration)
              .ease(d3.easeLinear)
              .attr("stroke-dashoffset", 0);
          }
  
          // Trigger time-lapse on button click
          d3.select("#startTimelapseButton")
            .on("click", function () {
              startTimelapse();
            });
        }
      }
    );
  }
  