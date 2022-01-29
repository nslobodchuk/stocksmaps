import * as d3 from 'd3';

import  { selection, select } from 'd3-selection';
import 'd3-selection-multi';

export function initializeBeeswarmData(data, layouts){

	const width = 600;
	const height = 600;
	const rMin = 5;
	const rMax = 35;


    const extent = d3.extent(data, d => d.return).map(d=>Math.abs(d));

    extent[0] = -Math.max(extent[0], extent[1]);
    extent[1] = -extent[0];


	// const xScale = d3.scaleLinear().domain(d3.extent(data, d => d.return)).range([0+100, width-100]).clamp(true);
  const xScale = d3.scaleLinear().domain(extent).range([0+100, width-100]).clamp(true);
	const rScale = d3.scaleSqrt().domain(d3.extent(data, d => d.weight)).range([rMin, rMax]);


  const force = d3.forceSimulation(data)
        .alphaTarget(0.1) // stay hot
        .velocityDecay(0.1) // low friction
        .force('forceX', d3.forceX(d => xScale(d.return)).strength(0.5))
        .force('forceY', d3.forceY(height/2).strength(0.03))
        .force('collide', d3.forceCollide(d => rScale(d.weight) + 1))
        .stop();

  const NUM_ITERATIONS = 200;

    for (let i = 0; i < NUM_ITERATIONS; ++i) {
    	force.tick();
    };

    // const circles = d3.select("#bubbles-svg")
    //   .selectAll("circle")
    //   .data(data)
    //   .enter()
    //   .append("circle")
    //   .attr("cx", d => d.x)
    //   .attr("cy", d => d.y)
    //   .attr("r", d => rScale(d.weight))
    //   .style("fill", "#bdbdbd");

    // force.on("tick", ()=>circles.attr("cx", d => d.x).attr("cy", d => d.y));

    layouts.force = {force: force, xScale: xScale, rScale: rScale};


    // console.log(data);


}