import * as d3 from 'd3';

import  { selection, select } from 'd3-selection';
import 'd3-selection-multi';
import {tickerTextSize} from './ticker-text-size';
import drawAxis from './draw-axis';
import f from './return-format';

export function transitionPackBeeswarm(data, layouts){

      let {groups, circles, text, arkkGroup} = layouts.viz;

      const {force, xScale, rScale} = layouts.force;

      xScale.domain(d3.extent(data, d => d.return));
      
      if(layouts.transition){
            //groups.interrupt("transform");
            //layouts.force.axisBottomG.selectAll("g.tick").interrupt("transform");
            // circles.interrupt("radius");
            // text.interrupt("size");
      }


      layouts.transition = groups
      .transition("transform")
      .duration(2000)
      .attr("transform", d => `translate(${d.x},${d.y}) scale(${rScale(d.weight)})`);



                  if(!layouts.force.axisBottomG){       
                        layouts.force.axisBottom = d3.axisBottom(xScale).tickSize(-550).tickFormat(f).ticks(5);
                     }



      drawAxis(layouts.force.axisBottom, false);
      d3.select("#bottom-axis-group").selectAll("g.tick").attr('opacity', 0);
      d3.select("#bottom-axis-group").selectAll("g.tick").transition("transform").duration(2000).attr('opacity', 1);

     



      if(!arkkGroup){
                 arkkGroup = d3.select("#arkk-group")
                 .attr("transform", `translate(${xScale(layouts.ARKK.return)},30)`)
                .attr('opacity', 0);

                arkkGroup.append("line")
                .attr("y1", 0)
                .attr("y2", 550)
                .attr("stroke-width", 3)
                .attr("stroke", "#bcbcbc");

                 arkkGroup.append('g')
                .attr("transform", "translate(5,0)")
                .append("text")
                .text("ARKK " + f(layouts.ARKK.return))
                .attr("fill", "#bcbcbc")
                .attr("transform", 'rotate(90)');

                layouts.viz.arkkGroup = arkkGroup;
      }

      arkkGroup.transition("transform").duration(2000).attr('opacity', 1);

      // circles
      // .transition("radius")
      // .duration(2000)
      // .attr("r", d => rScale(d.weight));

      // text
      // .transition("size")
      // .duration(2000)
      // .attr('font-size', d=>tickerTextSize(rScale(d.weight)));


      layouts.transition.on('end', ()=>{
            layouts.transition = null;

            force.on("tick", ()=>groups.attr("transform", d => `translate(${d.x},${d.y}) scale(${rScale(d.weight)})`));
            force.restart();
      });


      



}