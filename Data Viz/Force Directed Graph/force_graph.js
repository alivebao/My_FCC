$().ready(function(){
  let chartMargin = {
        top: 15,
        right: 10,
        bottom: 30,
        left: 75
    };
  let width = $(".chart").width() - chartMargin.left - chartMargin.right;
  let height = $(".chart").height() - chartMargin.bottom - chartMargin.top;
  var transformData = "translate(" + chartMargin.left + "," + (chartMargin.top) + ")"

  var svg = d3.select('body').select('.chart');
  var dataLink = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json';

  $.getJSON(dataLink, function(data){
    var nodes = data.nodes;
    var links = data.links;
    var force = d3.layout.force()
          .nodes(nodes) //指定节点数组
          .links(links) //指定连线数组
          .size([width,height]) //指定作用域范围
          .linkDistance(50) //指定连线长度
          .charge([-100]); //相互之间的作用力
    force.start();    //开始作用

   var svg_texts = svg.selectAll("text")
       .data(nodes)
       .enter()
       .append("text")
       .style("fill", "black")
       .attr("dx", 20)
       .attr("dy", 8)
       .attr("transform", transformData)
       .text(function(d){
          return d.country;
       });

   var svg_links = svg.selectAll("line")
       .data(links)
       .enter()
       .append("line")
       .style("stroke","#ccc")
       .style("stroke-width",1)
       .attr("transform", transformData);;

   var color = d3.scale.category20();

   var svg_nodes = svg.selectAll("circle")
       .data(nodes)
       .enter()
       .append("circle")
       .attr("r",5)
       .attr("transform", transformData)
       .style("fill",function(d,i){
           return color(i);
       })
       .call(force.drag);  //使得节点能够拖动


    force.on("tick", function(){ //对于每一个时间间隔
      //更新连线坐标
      svg_links.attr("x1",function(d){ return d.source.x; })
          .attr("y1",function(d){ return d.source.y; })
          .attr("x2",function(d){ return d.target.x; })
          .attr("y2",function(d){ return d.target.y; });
      //更新节点坐标
      svg_nodes.attr("cx",function(d){ return d.x; })
          .attr("cy",function(d){ return d.y; });
      //更新文字坐标
      svg_texts.attr("x", function(d){ return d.x; })
         .attr("y", function(d){ return d.y; });
  });
 });
});