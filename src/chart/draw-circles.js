import * as d3 from 'd3';

import  { selection, select } from 'd3-selection';
import 'd3-selection-multi';
import {tickerTextSize} from './ticker-text-size';
export function drawCircles(data){


// const circles = d3.select("#bubbles-svg")
//       .selectAll("circle")
//       .data(data)
//       .enter()
//       .append("circle");

   d3.select("#bubbles-svg")
   .append('g')
   .attr("transform", `translate(0,${580})`)
   .attr('id', 'bottom-axis-group');

    d3.select("#bubbles-svg")
    .append("g")
    .attr("id", "arkk-group")
    .attr('opacity', 1);


      const groups = d3.select("#bubbles-svg")
      .append("g")
      .attr('id', 'circles-group')
      .selectAll("g")
      .data(data)
      .enter()
      .append("g");

      const circles = groups.append("circle").attr('r', 1);

      const tickerText = groups.append('text')
            .attr("text-anchor", "middle")
            .append('tspan')
            //.attr("dominant-baseline", "text-top")
            .attr("dy", "-0.1")
            .attr("font-weight", "bold")
            .attr("fill", "#212121")
            .attr('font-size', tickerTextSize(1));

      const returnText = groups
            // .append('g')
            // .attr('transform', 'translate(0,0.5)')
            .append('text')
            .attr("text-anchor", "middle")
            //.attr("dominant-baseline", "hanging")
            .attr("dy", "0.4")
            .attr("font-weight", "bold")
            .attr("fill", "#212121")
            .attr('font-size', tickerTextSize(1));


      return {groups, circles, tickerText, returnText};
}