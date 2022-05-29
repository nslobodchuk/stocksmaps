import * as d3 from 'd3';

import {useEffect, useState} from 'react';
import {Component} from 'react';
import { useOutletContext } from "react-router-dom";
import {tickerTextSize} from './chart/ticker-text-size';
import f from './chart/return-format';


export default function PackForce(){


                                const [fireData, count] = useOutletContext();
                                const [colorScale, setColorScale] = useState(null);
                                const [groups, setGroups] = useState(null);

                                useEffect(function(){

                                                      const width = 600;
                                                      const height = 800;
                                                      const rMin = 5;
                                                      const rMax = 40;

                                                      const data = fireData.stocks;
                                                      const etf = fireData.etf;




                                                      const rScale = d3.scaleSqrt()
                                                                       .domain(d3.extent(data, d => d.weight))
                                                                       .range([rMin, rMax]);

                                                      const extent = d3.extent(data, d=>d.return).map(d=>Math.abs(d));
                                                      extent[0] = -Math.max(extent[0], extent[1]);
                                                      extent[1] = -extent[0];



                                                      const colorScale = d3.scaleSequential()
                                                                           .domain(extent)
                                                                           .interpolator(d3.interpolateRdBu)
                                                                           //.interpolator(d3.interpolateRdYlGn);


                                                      console.log(data);



                                                      setColorScale({f: colorScale});


                                                      const force = d3.forceSimulation(data)
                                                            .alphaTarget(0.05) // stay hot
                                                            .velocityDecay(0.5) // low friction
                                                            .force('forceY', d3.forceY(height/2).strength(0.1))
                                                            .force('forceX', d3.forceX(width/2).strength(0.1))
                                                            .force('collide', d3.forceCollide(d => rScale(d.weight)+2))
                                                            .stop();

                                                      const NUM_ITERATIONS = 100;

                                                        for (let i = 0; i < NUM_ITERATIONS; ++i) {
                                                          force.tick();
                                                        };






                                                      const groups = d3.select("#swarm-svg")
                                                                      .append("g")
                                                                      .attr('id', 'circles-group')
                                                                      .selectAll("g")
                                                                      .data(data)
                                                                      .enter()
                                                                      .append("g");
                                                      setGroups(groups);

                                                      const circles = groups.append("circle").attr('r', 1);

                                                      const tickerText = groups.append('text')
                                                            .attr("text-anchor", "middle")
                                                            .append('tspan')
                                                            .attr("dy", "-0.1")
                                                            .attr("font-weight", "bold")
                                                            .attr("fill", "#212121")
                                                            .attr('font-size', tickerTextSize(1));

                                                      const returnText = groups
                                                            .append('text')
                                                            .attr('class', 'return-text')
                                                            .attr("text-anchor", "middle")
                                                            .attr("dy", "0.4")
                                                            .attr("font-weight", "bold")
                                                            .attr("fill", "#212121")
                                                            .attr('font-size', tickerTextSize(1));


                                                      groups.attr("transform", d => `translate(${d.x},${d.y}) scale(${rScale(d.weight)})`)
                                                      circles.style("fill", d=>colorScale(d.return));
                                                      tickerText.text(d=>d.ticker);
                                                      returnText.text(d=>f(d.return));


                                                      force.on("tick", ()=>{
                                                                              groups.attr("transform", d => `translate(${d.x},${d.y}) scale(${rScale(d.weight)})`);
                                                                            }
                                                              );

                                                      force.restart();

                                                      return ()=>force.stop();


                                                    },
                                          [fireData]
                                          )
                                  
                                  useEffect(function(){
                                    console.log(fireData);
                                    console.log(colorScale);
                                    console.log(groups);


                                      


                                    if(count&&fireData&&colorScale&&groups){
                                      console.log(count);

                                      const extent = d3.extent(fireData.stocks, d=>d.return).map(d=>Math.abs(d));
                                      extent[0] = -Math.max(extent[0], extent[1]);
                                      extent[1] = -extent[0];


                                      colorScale.f.domain(extent);

                                      groups.selectAll("circle")
                                            .transition()
                                            .style("fill", d=>colorScale.f(d.return));

                                      groups.selectAll("text.return-text")
                                            .text(d=>f(d.return));





                                      



                                    }
                                    
                                  }, [count]);


  return(
          
                <svg 
                    width="100%"
                    height="100%"
                    viewBox="0 0 600 800"
                    id="swarm-svg"
                >

                </svg>
         
        );
}
