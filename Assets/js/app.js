// SVG Window
var svgWidth = 1000;
var svgHeight = 500; 

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

// Creating width/height of chart
var width = svgWidth - margin.left -margin.right;
var height = svgHeight - margin.top -margin.bottom;

// SVG Wrapper
var svg = d3.select("#scatter")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight + 50);

// Add SVG group
var chartGroup = svg.append("g")
.attr("transform", 'translate(${margin.left}, ${margin.top})');

// Initial Params
var CurrentXAxis = "Poverty";
var CurrentYAxis = "Healthcare";

// Creating X-scale
function xScale(data, CurrentXAxis) {

    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[CurrentXAxis])-2,d3.max(data, d => d[CurrentXAxis])+2])
      .range([height, 0]);

    return yLinearScale
}

// Creating Y-scale
function yScale(data, CurrentYAxis) {

    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[CurrentYAxis])-2,d3.max(data, d => d[CurrentYAxis])+2])
      .range([height, 0]);
  
    return yLinearScale;
  
}

// Update circle group with a transition for X variable
function renderXCircles(circleGroup, switchX, CurrentXAxis) {
    circleGroup.transition()
    .duration(1000)
    .attr("cx", d => switchX(d[CurrentXAxis]))
    .attr("dx", d => switchX[CurrentXAxis]));

  return circleGroup;
}

// Update circle group with a transition for Y variable
function renderYCircles(circleGroup, switchY, CurrentYAxis) {
    circleGroup.transition()
    .duration(1000)
    .attr("cy", d => switchY(d[CurrentYAxis]))
    .attr("dy", d => switchY[CurrentYAxis]));

  return circleGroup;
}
