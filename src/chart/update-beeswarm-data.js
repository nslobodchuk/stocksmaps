import * as d3 from 'd3';

import  { selection, select } from 'd3-selection';
import 'd3-selection-multi';
import f from './return-format';
import drawAxis from './draw-axis';

export function updateBeeswarmData(data, layouts){
	const force = layouts.force.force;
	const xScale = layouts.force.xScale;

      const extent = d3.extent(data, d => d.return).map(d=>Math.abs(d));

    extent[0] = -Math.max(extent[0], extent[1]);
    extent[1] = -extent[0];

	xScale.domain(extent);
    force.nodes(data);

    const {circles, returnText, arkkGroup} = layouts.viz;

      circles
      .transition("color")
      .style("fill", d=>layouts.colorScale(d.return));

      returnText
      .text(d=>f(d.return));


    if(layouts.transition){

      d3.select("#bottom-axis-group").selectAll("g.tick").interrupt("transform");


    } else {
        force.restart();


        // const t = layouts.force.axisBottomG
        // .transition()
        // .duration(4000)
        // .call(layouts.force.axisBottom)

        // t.selection().selectAll(".domain").interrupt().remove();

        // t.selection().selectAll(".tick line")
        // .attr("stroke-opacity", 0.5)
        // .attr("stroke-dasharray", "2,2");

        // t.selection().selectAll(".tick line, .tick text")
        // .filter((d,i)=>d===0)
        // .attr('stroke', 'red');

    }

    arkkGroup.transition("scale")
    .duration(2000)
    .attr("transform", `translate(${xScale(layouts.ARKK.return)},30)`);
    arkkGroup.select("text")
    .text("ARKK " + f(layouts.ARKK.return));



    // const t = d3.select("#bottom-axis-group")
    //       .transition("scale")
    //       .duration(2000);

            drawAxis(layouts.force.axisBottom, true);

           // setTimeout(()=>t.selection().selectAll("*").interrupt("scale"), 500);


    // console.log("inside updateBeeswarmData")
    // console.log(data);
}