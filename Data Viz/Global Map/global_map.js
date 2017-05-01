$().ready(function(){
  d3.select(window).on("resize", sizeChange);

  var width = '100%';
  var height = '100%';
  var earthDataURL = 'https://d3js.org/world-50m.v1.json';
  var metoriesDataURL = 'https://data.nasa.gov/resource/y77d-th95.geojson';
  
  var hue = 0;

  var svg = d3.select('#container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  svg.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', '#266D98');

  var projection = d3.geo.mercator()
    .translate([780,360])
    .scale(300);

  var path = d3.geo.path()
    .projection(projection);
  
  // Tooltip
  var div = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  var map = svg.append('g');

  d3.json(earthDataURL, function(json) {
    map.selectAll('path')
      .data(topojson.feature(json, json.objects.countries).features)
      .enter()
      .append('path')
      .attr('fill', '#95E1D3')
      .attr('stroke', '#266D98')
      .attr('d', path);
  });

  d3.json(metoriesDataURL, function(json) {
    json.features.map(function(e) {
      hue += .35;
      e.color = 'hsl(' + hue + ',100%, 50%)';
    })

    json.features.sort(function(a, b) {
      return b.properties.mass - a.properties.mass
    })

    var meteorites = svg.append('g')
      .selectAll('path')
      .data(json.features)
      .enter()
      .append('circle')
      .attr('cx', function(d) { return projection([d.properties.reclong,d.properties.reclat])[0] })
      .attr('cy', function(d) { return projection([d.properties.reclong,d.properties.reclat])[1] })
      .attr('r', function(d) { 
        var range = 718750/2/2;
    
        if (d.properties.mass <= range) return 2;
        else if (d.properties.mass <= range*2) return 10;
        else if (d.properties.mass <= range*3) return 20;
        else if (d.properties.mass <= range*20) return 30;
        else if (d.properties.mass <= range*100) return 40;
        return 50;
      })
      .attr('fill-opacity', function(d) {
        var range = 718750/2/2;
        if (d.properties.mass <= range) return 1;
        return .5;
      })
      .attr('stroke-width', 1)
      .attr('stroke', '#EAFFD0')
      .attr('fill', function(d) { return d.color })
      .on('mouseover', function(d) {
        d3.select(this).attr('d', path).style('fill', 'black');
        d3.select(this).attr('cursor', 'pointer');
        div.transition()
          .duration(200)
          .style('opacity', .9);
        div.html( '<span class="def">fall:</span> ' + d.properties.fall + '<br>' + 
                  '<span class="def">mass:</span> ' + d.properties.mass + '<br>' + 
                  '<span class="def">name:</span> ' + d.properties.name + '<br>' + 
                  '<span class="def">nametype:</span> ' + d.properties.nametype + '<br>' +
                  '<span class="def">recclass:</span> ' + d.properties.recclass + '<br>' + 
                  '<span class="def">reclat:</span> ' + d.properties.reclat + '<br>' + 
                  '<span class="def">year:</span> ' + d.properties.year + '<br>')
          .style('left', (d3.event.pageX+30) + 'px')
          .style('top', (d3.event.pageY/1.5) + 'px')
      })
      .on('mouseout', function(d) {
        // Reset color of dot
        d3.select(this).attr('d', path).style('fill', function(d) { return d.properties.hsl });

        // Fade out tooltip
        div.transition()
          .duration(500)
          .style('opacity', 0);
      });
    sizeChange();   
  });
  function sizeChange() {
    d3.selectAll("g").attr("transform", "scale(" + $("#container").width()/1900 + ")");
    $("svg").height($("#container").width()/2);
  }
});