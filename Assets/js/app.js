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

