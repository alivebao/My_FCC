$().ready(function() {
    let chartMargin = {
        top: 15,
        right: 10,
        bottom: 30,
        left: 75
    };
    let width = $(".chart").width() - chartMargin.left - chartMargin.right;
    let height = $(".chart").height() - chartMargin.bottom - chartMargin.top;
    
    $.getJSON("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json", function(result) {
        let xMin = 999;
        let xMax = 0;
        result = result.reverse();
        $.each(result, function(i, content) {
            let tempTime = content.Time;
            xMin > parseInt(tempTime.split(":")[0]) ? xMin = parseInt(tempTime.split(":")[0]) : xMin;
            xMax < parseInt(tempTime.split(":")[0]) ? xMax = parseInt(tempTime.split(":")[0]) : xMax;
        })
        xMax++;
        let xScale = d3.scale.linear()
                        .domain([xMin, xMax])
                        .range([width, 0]);
        let xAxis = d3.svg.axis()
                        .scale(xScale)
                        .orient("bottom")
                        
        let yScale = d3.scale.linear()
                        .domain([result.length, 0])
                        .range([height, 0]);
        let yAxis = d3.svg.axis()
                        .scale(yScale)
                        .orient("left")
                        .ticks(10, "");
                        
        let svg = d3.select("body")
                    .select(".chart");
                    
        let texts = svg.selectAll("text")
            .data(result)
            .enter()
            .append("text")
            .text(function(d) {
                return d.Name;
            })
            .attr("x", function(d) {
                var arrTemp = d.Time.split(":");
                var resultTemp = parseInt(arrTemp[0]) * 60 + parseInt(arrTemp[1]);
                return xScale(resultTemp / 60) + 90;
            })
            .attr("y", function(d, i) {
                return yScale(result.length - i) + 20;
            })
              
        svg.append("g")
            .attr("class", "axis")
            .attr("transform","translate(" + chartMargin.left + "," + chartMargin.top + ")")
            .call(yAxis)
            .append('text')
            .attr('font-weight', 'bold')
            .text('Order');
            
        svg.append("g")
            .attr("class", "axis")
            .attr("transform","translate(" + chartMargin.left + "," + (chartMargin.top + height) + ")")
            .call(xAxis)
            .append('text')
            .attr("transform","translate(" + (width - chartMargin.left) + ", 0)")
            .attr('font-weight', 'bold')
            .text('Record/min');
            
        let rects = svg.selectAll("circle")
            .data(result)
            .enter()
            .append("circle")
            .attr("transform","translate(" + chartMargin.left + "," + chartMargin.top + ")")
            .attr("cx", function(d, i){
                var arrTemp = d.Time.split(":");
                var resultTemp = parseInt(arrTemp[0]) * 60 + parseInt(arrTemp[1]);
                return xScale(resultTemp / 60);
            } )
            .attr("cy",function(d, i){
                return yScale(result.length - i);
            })
            .attr("r", 5)
    })
});