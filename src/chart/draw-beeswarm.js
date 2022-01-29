import * as d3 from 'd3';

import  { selection, select } from 'd3-selection';
import 'd3-selection-multi';

import {drawCircles} from './draw-circles';
import {tickerTextSize} from './ticker-text-size';
import f from './return-format';
import drawAxis from './draw-axis';

export function drawBeeswarm(data, layouts){

  const {force, xScale, rScale} = layouts.force;


  const {groups, circles, tickerText, returnText} = drawCircles(data);


    

    const axisBottom = d3.axisBottom(xScale).tickSize(-550).tickFormat(f);

    axisBottom.ticks(5)

    //   console.log(d3.select("#bubbles-svg").append('g').attr("transform", `translate(0,${550})`)
    // .call(axisBottom));


    // .call(axisBottom)
    // .call(g => g.select(".domain").remove())
    // .call(g => g.selectAll(".tick line")
    //     .attr("stroke-opacity", 0.5)
    //     .attr("stroke-dasharray", "2,2"))
    // .call(g => g.selectAll(".tick line, .tick text")
    //   .filter((d,i)=>d===0)
    //   .attr('stroke', 'red'))

    drawAxis(axisBottom, false);

    layouts.force.axisBottom = axisBottom;

    const arkkGroup = d3.select("#arkk-group")
    .attr("transform", `translate(${xScale(layouts.ARKK.return)},30)`);

    arkkGroup.append("line")
    // .attr("x1", xScale(layouts.ARKK.return))
    // .attr("x2", xScale(layouts.ARKK.return))
    .attr("y1", 0)
    .attr("y2", 550)
    .attr("stroke-width", 3)
    //.attr("stroke-linecap", "round")
    .attr("stroke", "#bcbcbc");

    // d3.select("#bubbles-svg")
    // .append("rect")
    // .attr("x", xScale(layouts.ARKK.return)-60)
    // .attr("y", 30)
    // .attr("rx", 5)
    // .attr("ry", 5)
    // .attr("width", 120)
    // .attr("height", 30)
    // .attr("fill", "red");

    // d3.select("#bubbles-svg")
    // .append('g')
    // .attr("transform", `translate(${xScale(layouts.ARKK.return)},50)`)
    // .append("text")
    // .text("ARKK " + f(layouts.ARKK.return))
    // .attr("fill", "black")
    // .attr("text-anchor","middle")
    // //.attr("font-size", "2em")
    // .attr("font-weight", "bold")
    // //.attr("transform", 'rotate(90)');

     arkkGroup.append('g')
    .attr("transform", "translate(5,0)")
    .append("text")
    .text("ARKK " + f(layouts.ARKK.return))
    .attr("fill", "#bcbcbc")
    //.attr("text-anchor","middle")
    //.attr("font-size", "2em")
    .attr("transform", 'rotate(90)');


    

    groups
    .attr("transform", d => `translate(${d.x},${d.y}) scale(${rScale(d.weight)})`)
    //.attr('font-size', d=>tickerTextSize(rScale(d.weight)));

      circles
      //.attr("r", d => rScale(d.weight))
      //.attr("r", d => 35)
      .style("fill", d=>layouts.colorScale(d.return));

      tickerText
      .text(d=>d.ticker)
      //.attr('font-size', d=>tickerTextSize(rScale(d.weight)));

       returnText
      .text(d=>f(d.return));

    force.on("tick", ()=>{
      // if(layouts.transition===false){
      //       circles.attr("cx", d => d.x).attr("cy", d => d.y);
      //     }
          groups.attr("transform", d => `translate(${d.x},${d.y}) scale(${rScale(d.weight)})`);
          //circles.attr("cx", d => d.x).attr("cy", d => d.y);
    });

    layouts.viz = {groups, circles, tickerText, returnText, arkkGroup};


   //      groups.append("svg:image")

   // .attr('x', d => -rScale(d.weight)*1/Math.sqrt(2))
   // .attr('y', d => -rScale(d.weight)*1/Math.sqrt(2))
   // .attr('width', d => rScale(d.weight)*2*1/Math.sqrt(2))
   // .attr('height', d => rScale(d.weight)*2*1/Math.sqrt(2))
   // .attr('opacity', 1)
   // .attr("xlink:href", d => "./logos/"+ d.ticker + ".png");

   // groups.append('text')
   // .attr("text-anchor", "middle")
   // .attr("dominant-baseline", "hanging")
   // .attr("dy", "0.15em")
   // .attr("font-weight", "bold")
   // .attr("opacity", 1)
   // .text("+6.2%");





}