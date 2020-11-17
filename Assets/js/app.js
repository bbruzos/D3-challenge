// SVG window
var svgWidth = 1000;
var svgHeight = 650;

// SVG margins
var margin = {
    top: 20,
    right: 40,
    bottom: 150,
    left: 100;\
};

// Set chart height and width
var width = svgWidth - margin.right - margin.left;
var height = svgHeight - margin.top - margin.bottom;

// Append div to scatter id
var chart = d3.select('#scatter')
  .append('div')
  .classed('chart', true);

// Append svg to chart 
var svg = chart.append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);

// SVG group
var chartGroup = svg.append('g')
.attr('transform', `translate(${margin.left}, ${margin.top})`);

// x and y-axis initial params
var chosenXAxis = 'poverty';
var chosenYAxis = 'healthcare';

// Func for x-scale to update upon label click
function xScale(censusData, chosenXAxis) {
    var xLinearScale = d3.scaleLinear()
    .domain([d3.min(censusData, d => d[chosenXAxis]) * 0.8,
    d3.max(censusData, d => d[chosenXAxis]) * 1.2])
    .range([0, width]);

return xLinearScale;
}

// Func for y-scale to update opun label click
function yScale(censusData, chosenYAxis) {
    var yLinearScale = d3.scaleLinear()
    .domain([d3.min(censusData, d => d[chosenYAxis]) * 0.8,
    d3.max(censusData, d => d[chosenYAxis]) * 1.2])
    .range([0, width]);

return yLinearScale;
}

// Update x-axis
function renderXAxis(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  }

// Update y-axis
function renderYAxis(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
  }

// Updating circles 
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr('cx', data => newXScale(data[chosenXAxis]))
      .attr('cy', data => newYScale(data[chosenYAxis]))

    return circlesGroup;
}
  
// Update State labels
function renderText(textGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    textGroup.transition()
      .duration(1000)
      .attr('x', d => newXScale(d[chosenXAxis]))
      .attr('y', d => newYScale(d[chosenYAxis]));

    return textGroup
}

// Tooltip x-axis

function tipX(value, chosenXAxis) {

    if (chosenXAxis === 'poverty') {
        return `$(value)`;
    }

    else if (chosenXAxis === 'income') {
        return `$(value)`;
    }
    else {
        return `$(value)`;
    }
}

// Update circle groups
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup){
    // X labels
    if (chosenXAxis === 'poverty') {
        var xLabel = 'Poverty:';
      }
    else if (chosenXAxis === 'income'){
        var xLabel = 'Median Income:';
      }
    else {
        var xLabel = 'Age:';
      }
    // Y labels
    if (chosenYAxis ==='healthcare') {
        var yLabel = "Lacks Healthcare:"
      }
    else if(chosenYAxis === 'obesity') {
        var yLabel = 'Obesity:';
      }
    else{
        var yLabel = 'Smokers:';
      }
    // Tooltip creation
    var toolTip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-8, 0])
    .html(function(d) {
        return (`${d.state}<br>${xLabel} ${styleX(d[chosenXAxis], chosenXAxis)}<br>${yLabel} ${d[chosenYAxis]}%`);
  });
    circlesGroup.call(toolTip);

    // Initialize tooltip
    circlesGroup.on('mouseover', toolTip.show)
    .on('mouseout', toolTip.hide);

    return circlesGroup;
}