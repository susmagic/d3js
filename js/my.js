var chartData = {
      "name": "sports",
      "children": [
        {"name": "Хоккей", "size": 368048, "src": "img/hokkey.jpeg"},
        {"name": "Биатлон ", "size": 169072, "src": "img/biatlon.jpeg"},
        {"name": "Бобслей", "size": 50692, "src": "img/bobsley.jpeg"},
        {"name": "Горнолыжный спорт", "size": 41152, "src": "img/gornolizhnii sport.jpeg"},
        {"name": "Керлинг", "size": 60574, "src": "img/kerling.jpeg"},
        {"name": "Конькобежный спорт", "size": 92700, "src": "img/konkobezhnii sport.jpeg"},
        {"name": "Лыжное двоеборье", "size": 12698, "src": "img/lizhnoe dvoeboree.jpeg"},
        {"name": "Лыжные гонки", "size": 34720, "src": "img/lizhnii gonki.jpeg"},
        {"name": "Прыжки с трамплина", "size": 19310, "src": "img/prizhki s tramplina.jpeg"},
        {"name": "Санный спорт", "size": 12738, "src": "img/sanii.jpeg"},
        {"name": "Скелетон", "size": 27284, "src": "img/skeleton.jpeg"},
        {"name": "Сноуборд", "size": 92610, "src": "img/snoubord.jpeg"},
        {"name": "Фигурное катание", "size": 234064, "src": "img/fig katanie.jpeg"},
        {"name": "Фристайл", "size": 84814, "src": "img/freestyle.jpeg"},
        {"name": "Шорт-трек", "size": 37772, "src": "img/short trek.jpeg"}
      ]
    
  
};
	
var diameter = 470,
    format = d3.format(",d"),
    color = d3.scale.category20c();
	
	
	
var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(.5);

var svg = d3.select(".sports").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var buildChart = function(root) {

  var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(root))
          .filter(function(d) { return !d.children; }))
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"});
	
  
	  
  node.append("circle")
      .attr("r", function(d) { return d.r; })
      .style("fill", '#fff')
	  .on("mouseover", function (d) {
			d3.select(this).transition()
									.duration(500)
									.attr("r",80);
	  })
	   .on("mouseout", function (d) {
			d3.select(this).transition()
									.duration(500)
									.attr("r",function(d) { return d.r; })
	  });
	  
	  
	  
	  
  node.append("image")
      .attr("xlink:href", function(d) {return d.src})
      .attr("x", function(d) { return  -0.6*d.r; })
      .attr("y", function(d) { return -0.6*d.r; })
      .attr("width", function(d) { return 1.2*d.r; })
      .attr("height", function(d) { return 1.2*d.r; });
	
	
	 
  node.append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
	.style('pointer-events', 'none')
    .text(function(d) { return d.className});
	
  node.append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
	.style('pointer-events', 'none')
	.attr("y", "25")
    .text(function(d) { return  d.value });
	

	

};
buildChart(chartData);



// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.size, src: node.src});
  }

  recurse(null, root);
  return {children: classes};
}

d3.select(self.frameElement).style("height", diameter + "px");

