$().ready(function(){
  var margin = {
    top: 5,
    right: 0,
    bottom: 90,
    left: 100
  };
  var width = 1000 - margin.left - margin.right;
  var height = 550 - margin.top - margin.bottom;
  var dataURL = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json';
  var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var tickNums = 20;
  
  var colors = ["#5e4fa2", "#3288bd", "#66c2a5", "#abdda4", "#e6f598", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d53e4f", "#9e0142"];
  
  $.getJSON(dataURL, function(data){
    var baseTemp = data.baseTemperature;
    var dataYear = [];
    var minTemp = 100;
    var maxTemp = -100;
    for(var i = 0 ; i < data.monthlyVariance.length; i++){
      if(minTemp > data.monthlyVariance[i].variance){
        minTemp = data.monthlyVariance[i].variance
      }
      if(maxTemp < data.monthlyVariance[i].variance){
        maxTemp = data.monthlyVariance[i].variance
      }
      dataYear.push(data.monthlyVariance[i].year);
    }
    
    var colorScale = d3.scale.quantile()
      .domain([minTemp + baseTemp, maxTemp + baseTemp])
      .range(colors);

    var gridWidth = width / dataYear.length * 12;
    var gridHeight = height / month.length;
    
    var svg = d3.select('body').select('.chart'); 
    
    svg.selectAll('.monthLabel')
      .data(month)
      .enter()
      .append('text')
      .text(function(d) {
        return d;
      })
      .attr('x', 0)
      .attr('y', function(d, i) {
        return i * gridHeight;
      })
      .attr('text-anchor','end')
      .attr('transform', 'translate(90, ' + gridHeight / 1.5 + ')');
      
    var xScale = d3.scale.linear()
      .domain([dataYear[0], dataYear[dataYear.length - 1]])
      .range([0, width]);
      
    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      .tickFormat(function(d){
        return String(d);
      })
      .ticks(tickNums);
      
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform','translate(' +  margin.left + ',' + (margin.top + height) + ')')
      .call(xAxis);
      
    var div = d3.select(".card").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
     
    svg.selectAll('.rect')
      .data(data.monthlyVariance)
      .enter()
      .append('rect')
      .attr('x', function(d){
        return (d.year - dataYear[0]) * gridWidth;
      })
      .attr('y', function(d){
        return ((d.month - 1) * gridHeight);
      })
      .attr('width', gridWidth)
      .attr('height', gridHeight)
      .attr('transform','translate(' +  margin.left + ',' + margin.top + ')')
      .style('fill', function(d){
        return colorScale(d.variance + baseTemp);
      })
      .on("mouseover", function(d) {
        div.transition()
          .duration(100)
          .style("opacity", 0.8);
          div.html("<span class='year'>" + d.year + " - " + month[d.month - 1] + "</span><br>" +
              "<span class='temperature'>" + (Math.floor((d.variance + baseTemp) * 1000) / 1000) + " &#8451" + "</span><br>" +
              "<span class='variance'>" + d.variance + " &#8451" + "</span>")
            .style("left", (d3.event.pageX - ($('.tooltip').width()/2)) + "px")
            .style("top", (d3.event.pageY - 75) + "px");
        })
      .on("mouseout", function(d) {
        div.transition()
          .duration(200)
          .style("opacity", 0);
      });;
  });
});