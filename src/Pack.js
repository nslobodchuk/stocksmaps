import * as d3 from 'd3';

import {useEffect, useState} from 'react';
import {Component} from 'react';
import { useOutletContext } from "react-router-dom";
import {tickerTextSize} from './chart/ticker-text-size';
import f from './chart/return-format';



export default function Pack(){
                                const [fireData, count] = useOutletContext();
                                const [colorScale, setColorScale] = useState(null);
                                const [groups, setGroups] = useState(null);

                                useEffect(function(){

                                                      const width = 600;
                                                      const height = 600;
                                                      const data = fireData.stocks;
                                                      let root = {children: data};
                                                      //let root = d3.group(data, d => d.sector);

                                                      console.log(root);
                                                      console.log(d3.hierarchy(root));
                                                      console.log(d3.hierarchy(root).count().value);

                                                      //console.log(data);

                                                      // const mappedData = d3.group(data, d => d.sector);

                                                      // console.log(mappedData);

                                                      // console.log(d3.hierarchy(mappedData));

                                                      // var root = d3.stratify()
                                                      //              .id(function(d) { return d.sector; })
                                                      //              //.parentId(function(d) { return d.sector; })
                                                      //               (data);

                                                      //console.log(root);


                                                      let flatNodeHeirarchy = d3.hierarchy(root)
                                                                                .sum(d => d.marketCap)
                                                                                //.sort(function(a, b) { return b.weight - a.weight || b.value - a.value; });

                                                      let pack = d3.pack()
                                                                   .size([width, height])
                                                                   .padding(1);
                                                      let packedData = pack(flatNodeHeirarchy);



                                                      console.log(packedData);

                                                      console.log(packedData.descendants())

                                                      const leaves = packedData.leaves();
                                                      const descendants = packedData.descendants();

                                                      const extent = d3.extent(leaves, d=>d.data.return).map(d=>Math.abs(d));
                                                      extent[0] = -Math.max(extent[0], extent[1]);
                                                      extent[1] = -extent[0];

                                                      const colorScale = d3.scaleSequential()
                                                                           .domain(extent)
                                                                           .interpolator(d3.interpolateRdBu)
                                                                           //.interpolator(d3.interpolateRdYlGn);;

                                                      setColorScale({f: colorScale});

                                                      const groups = d3.select("#pack-svg")
                                                                      .append("g")
                                                                      .attr('id', 'circles-group')
                                                                      .selectAll("g")
                                                                      .data(leaves)
                                                                      .enter()
                                                                      .append("g");
                                                      setGroups(groups);

                                                      const circles = groups.append("circle").attr('r', 1)
                                                      // .attr('fill', 'none')
                                                      // .attr('stroke', 'black')
                                                      // .attr('stroke-width', 0.01);

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


                                                      groups.attr("transform", d => `translate(${d.x},${d.y}) scale(${d.r})`);

                                                      circles.style("fill", d=>d.data.return?colorScale(d.data.return):"none");

                                                      tickerText.text(d=>d.data.ticker);

                                                      returnText.text(d=>f(d.data.return));

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
                                            .style("fill", d=>colorScale.f(d.data.return));

                                      groups.selectAll("text.return-text")
                                            .text(d=>f(d.data.return));
                                    }
                                    
                                  }, [count]);



                                return(
                                        <div>
                                              <svg 
                                                  width="100%"
                                                  height="100%"
                                                  viewBox="0 0 600 600"
                                                  id="pack-svg"
                                              >
                                              </svg>
                                        </div>
                                      );
                              }