import * as d3 from 'd3';

import  { selection, select } from 'd3-selection';
import 'd3-selection-multi';
import {tickerTextSize} from './ticker-text-size';

export function transitionBeeswarmPack(data, layouts){

      const {groups, arkkGroup} = layouts.viz;
      const {force, xScale, rScale} = layouts.force;

      force.stop();


     //circles.interrupt();

      if(layouts.transition){
            //groups.interrupt("transform");
            //layouts.force.axisBottomG.selectAll("g.tick").interrupt("transform");
      }

      d3.select("#bottom-axis-group").selectAll("*").interrupt("scale");

      layouts.transition = groups
      .transition("transform")
      .duration(2000)
      .attr("transform", d => `translate(${d.pack.x},${d.pack.y}) scale(${d.pack.r})`);


      arkkGroup.transition("transform").duration(2000).attr('opacity', 0);

      d3.select("#bottom-axis-group").selectAll("g.tick").transition("transform").duration(2000).attr('opacity', 0);

      // circles
      // .transition("radius")
      // .duration(2000).attr("r", d => d.pack.r);

      // text
      // .transition("size")
      // .duration(2000)
      // .attr('font-size', d=>tickerTextSize(d.pack.r));

      layouts.transition.on('end', ()=>layouts.transition=null);



      



}