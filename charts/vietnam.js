function vietnam() {
  const width = 1600;
  const height = 500;
  let padding = 90;

  let rowConverter = function (d) {
    return {
      date: new Date(d["date"]),
      total_vaccinations: +d["total_vaccinations"],
    };
  };

  d3.csv(
    "data/vietnam-cases.csv",
    rowConverter,
    function (error, data) {
      if (!error) {
        let vaccinationsScale = d3
          .scaleLinear()
          .domain([0, d3.max(data, function (d) { return d.total_vaccinations; })])
          .range([height - padding, padding]);

        let dateScale = d3
          .scaleTime()
          .domain([
            new Date("2021-01-01"),
            new Date("2023-12-31"),
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
            return vaccinationsScale(d.total_vaccinations);
          });

        let vaccinationsChart = svg
          .datum(data)
          .append("path")
          .attr("d", line)
          .attr("stroke", "#0013de")
          .style("stroke-width", 4)
          .style("fill", "none")
          .attr("class", "vaccinations-line");

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

        let vaccinationsAxis = d3
          .axisLeft(vaccinationsScale)
          .ticks(5)
          .tickFormat(d3.format(".2s"));

        svg
          .append("g")
          .attr("class", "yAxis")
          .attr("transform", "translate(" + padding + ",0)")
          .attr("font-weight", "bold")
          .style("stroke-width", "2px")
          .call(vaccinationsAxis);

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
          })
          .on("mousemove", function () {
            let [x, y] = d3.mouse(this);
            let x0 = dateScale.invert(x);
            let i = bisect(data, x0, 1);
            let selectedData = data[i];

            tooltip
              .html("Date: " + selectedData.date.toLocaleDateString() + "<br>Vaccinations: " + selectedData.total_vaccinations)
              .style("left", x + 10 + "px")
              .style("top", y - 10 + "px");
          });

        let bisect = d3.bisector(function (d) {
          return d.date;
        }).left;
      }
    }
  );
}