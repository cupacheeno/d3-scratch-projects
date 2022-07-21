import * as d3 from "d3";

const drawChart = async () => {
  const data = await d3.csv("./data/witch-trials.csv");
  console.dir(data);

  const xAccessor = (d) => parseInt(d["decade"]);
  const yAccessor = (d) => parseInt(d["deaths"]);

  // Setting wrapper and bounds.
  let dimensions = {
    width: window.innerWidth * 0.9,
    height: 400, // Pixels
    margins: {
      top: 15,
      right: 15,
      bottom: 40,
      left: 60,
    },
  };

  dimensions.boundedWidth =
    dimensions.width - dimensions.margins.left - dimensions.margins.right;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margins.top - dimensions.margins.bottom;
  const wrapper = d3.select('#wrapper')
        .append('svg')
                .attr('width', dimensions.width)
                .attr('height', dimensions.height);
  const bounds = wrapper
        .append('g')
            .style('transform', `translate(${dimensions.margins.left}px,${dimensions.margins.top}px)`);
  const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yAccessor))
        .range([dimensions.boundedHeight, 0]);
  const xScale = d3.scaleLinear()
        .domain(d3.extent(data, xAccessor))
        .range([0 , dimensions.boundedWidth]);
  const lineGenerator = d3.line()
        .x(d => xScale(xAccessor(d)))
        .y(d => yScale(yAccessor(d)));
  const line = bounds.append('path')
        .attr('d', lineGenerator(data))
        .attr('fill', 'none')
        .attr('stroke', 'cornflowerblue')
        .attr('stroke-wide', 2);
};

drawChart();
