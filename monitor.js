const svg = d3.select("body").append("svg")
    .attr("width", 600)
    .attr("height", 800)


// Definieren Sie die Projektion
const projection = d3.geoMercator()
    .scale(3000)
    .center([14, 52.35])

// Erstellen Sie einen Pfadgenerator
const path = d3.geoPath().projection(projection)

// Laden Sie die Geodaten
d3.json("./assets/geodata/germany.geojson").then(data => {
    // Erstellen Sie Pfade für jede Feature
    svg.selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", "#1561AC")

    let bundeslaender = d3.selectAll("path")
        .data(data.features)
    bundeslaender.on("mouseover", function (d) {
        d3.select(this)
            .transition()
            .duration(200) // duration in milliseconds
            .style("fill", "#F8EC00")
    })

    bundeslaender.on("mouseout", function (d) {
        d3.select(this)
            .transition()
            .duration(200) // duration in milliseconds
            .style("fill", "#1561AC")
    })



})
