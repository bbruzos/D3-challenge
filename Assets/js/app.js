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
var CurrentXAxis = "poverty";
var CurrentYAxis = "healthcare";

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

// Retrieve Data 
d3.csv("data.csv").then(function(data, err) {
    if (err) throw err;
data.forEach(d => {
    d.poverty = +d.poverty;
    d.povertyMoe = +d.povertyMoe;
    d.age = +d.age;
    d.ageMoe = +d.ageMoe;
    d.income = +d.income;
    d.incomeMoe = +d.incomeMoe;
    d.healthcare = +d.healthcare;
    d.healthcareLow = +d.healthcareLow;
    d.healthcareHigh = +d.healthcareHigh;
    d.obesity = +d.obesity;
    d.obesityLow = +d.obesityLow;
    d.obesityHigh = +d.obesityHigh;
    d.smokes = +d.smokes;
    d.smokesLow = +d.smokesLow;
    d.smokesHigh = +d.smokesHigh;
  });

  // func for xLinearScale 
  var xLinearScale = xScale(data, CurrentXAxis);
  // func for yLinearScale
  var yLinearScale = yScale(data, CurrentYAxis);

  // Initialize axis func's
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // add x-axis & y-axis
  var xAxis = chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    var yAxis = chartGroup.append("g")
    .call(leftAxis);

    

});