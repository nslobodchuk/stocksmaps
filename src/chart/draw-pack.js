import * as d3 from 'd3';

import  { selection, select } from 'd3-selection';
import 'd3-selection-multi';

import {drawCircles} from './draw-circles';
import {tickerTextSize} from './ticker-text-size';
import f from './return-format';

export function drawPack(data, layouts){


       const {groups, circles, tickerText, returnText} = drawCircles(data);

       groups
       .attr("transform", d => `translate(${d.pack.x},${d.pack.y}) scale(${d.pack.r})`);

       circles
      // .attr("r", d => d.pack.r)
      .style("fill", d=>layouts.colorScale(d.return));

      tickerText
      .text(d=>d.ticker)
      //.attr('font-size', d=>tickerTextSize(d.pack.r));

      returnText
      .text(d=>f(d.return));


      // circles.attr("cx", d => d.pack.x)
      // .attr("cy", d => d.pack.y)
      // .attr("r", d => d.pack.r)
      // .style("fill", d=>layouts.colorScale(d.return));


    layouts.viz = {groups, circles, tickerText, returnText};



   // groups.append('text')
   // .attr("text-anchor", "middle")
   // .attr("dominant-baseline", "hanging")
   // .attr("dy", "0.15em")
   // .attr("font-weight", "bold")
   // .attr("opacity", 1)
   // .text("+6.2%")
   // .attr('font-size', d=>tickerTextSize(d.pack.r));

   



}