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
    .attr("dx", d => switchX[CurrentXAxis]);

  return circleGroup;
}

// Update circle group with a transition for Y variable
function renderYCircles(circleGroup, switchY, CurrentYAxis) {
    circleGroup.transition()
    .duration(1000)
    .attr("cy", d => switchY(d[CurrentYAxis]))
    .attr("dy", d => switchY[CurrentYAxis]);

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

  // Append circle groups
  var circleGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("g");

  var circles = circleGroup.append("circle")
    .attr("cx", d => xLinearScale(d[CurrentXAxis]))
    .attr("cy", d => yLinearScale(d[CurrentYAxis]))
    .attr("r", 15)
    .classed('stateCirc', true);

  // Insert circle text
  var circleText = circleGroup.append("text")
    .text(d => d.abbr)
    .attr("dx", d => xLinearScale(d[CurrentXAxis]))
    .attr("dy", d => yLinearScale(d[CurrentYAxis])+5) 
    .classed('stateAcc', true);

  // 3-axis label group for x-axis
  var xLabels = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var PovertyLabel = xLabels.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "income")
    .classed("active blue", true)
    .text("In Poverty (%)");

  // 3-axis label group for y-axis
  var yLabels = chartGroup.append("g")
  .attr("transform", "rotate(-90)")

  var HealthcareLabel = yLabels.append("text")
    .attr("y", -50)
    .attr("x", -(height/2))
    .attr("dy", "1em")
    .attr("value", "healthcare") 
    .classed("active green", true)
    .text("Lacks Healthcare (%)");


}).catch(function(error) {
    console.log(error);
});
