const svg = d3.select("#chart").append("svg")
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
    svg.selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", "#1561AC")
        .style("stroke", "#222266")
        .style("stroke-width", 1)

    let bundeslaender = d3.selectAll("path")
        .data(data.features)
    bundeslaender.on("mouseover", function (d) {
        d3.select(this)
            .transition()
            .duration(200) // duration in milliseconds
            .style("fill", "#F8EC00")
            .style("stroke", "#F8EC00")
    })

    bundeslaender.on("mouseout", function (d) {
        d3.select(this)
            .transition()
            .duration(200) // duration in milliseconds
            .style("fill", "#1561AC")
            .style("stroke", "#222266")
            pulse(fourthBundesland);
        })

        // Select the fourth Bundesland
        let fourthBundesland = bundeslaender.filter((d, i) => i === 3);

        // Create a function to pulse the color
        function pulse(selection) {
            selection
                .transition()
                .duration(1000)
                .style("fill", "#133167")
                .style("stroke", "#222266")
                .transition()
                .duration(1000)
                .style("fill", "#1561AC")
                .style("stroke", "#222266")
                .on("end", function() {
                    pulse(d3.select(this));
                });
        }

        // Apply the pulse function to the fourth Bundesland
        pulse(fourthBundesland);



})
