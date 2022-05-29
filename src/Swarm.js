import * as d3 from 'd3';

import {useEffect, useState} from 'react';
import {Component} from 'react';
import { useOutletContext } from "react-router-dom";
import {tickerTextSize} from './chart/ticker-text-size';
import f from './chart/return-format';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Swarm(){


                                const [fireData, count, index] = useOutletContext();
                                const [colorScale, setColorScale] = useState(null);
                                const [groups, setGroups] = useState(null);
                                const [force, setForce] = useState(null);
                                const [yScale, setYScale] = useState(null);

                                useEffect(function(){

                                                      d3.select("#swarm-div").selectAll("*").remove();


                                                      if(!index){
                                                        return;
                                                      }

                                                      //console.log(""+index+"");

                                                                let width = 600;
                                                                let height = 800;
                                                                let rMin = 10;
                                                                let rMax = 50;
                                                                let yStrength = 2;

                                                      

                                                      if(index==="^GSPC"){
                                                                           width = 600;
                                                                           height = 2000;
                                                                           rMin = 10;
                                                                           rMax = 60;
                                                                           yStrength = 2;
                                                      }

                                                      if(index==="^DJI"){
                                                                           width = 600;
                                                                           height = 800;
                                                                           rMin = 10;
                                                                           rMax = 100;
                                                      }

                                                      if(index==="ARKK"){
                                                                           width = 600;
                                                                           height = 800;
                                                                           rMin = 10;
                                                                           rMax = 150;
                                                      }
                                                      

                                                      const svg = d3.select("#swarm-div").append('svg')
                                                      .attr("width", "100%")
                                                      .attr("height", "100%")
                                                      .attr("viewBox", `0 0 ${width} ${height}`);

                                                      const data = fireData.stocks;
                                                      const etf = fireData.etf;




                                                      const rScale = d3.scaleSqrt()
                                                                       .domain(d3.extent(data, d => d.marketCap))
                                                                       .range([rMin, rMax]);

                                                      //const extent = d3.extent(data, d=>d.return)//.map(d=>Math.abs(d));
                                                      // extent[0] = -Math.max(extent[0], extent[1]);
                                                      // extent[1] = -extent[0];
                                                      const extent = [d3.quantile(data, 0.05, d=>d.return),d3.quantile(data, 0.95, d=>d.return)]

                                                      const yScale = d3.scaleLinear()
                                                                       .domain(extent)
                                                                       .range([height-50, 50])
                                                                       .clamp(true);

                                                      setYScale({f: yScale});

                                                      // const colorScale = d3.scaleSequential()
                                                      //                      .domain(extent)
                                                      //                      .interpolator(d3.interpolateRdBu)
                                                      //                      //.interpolator(d3.interpolateRdYlGn);
                                                      const colorScale = d3.scaleOrdinal(d3.schemeTableau10)
                                                                           .domain(data, d=>d.sector);

                                                      //console.log(data);



                                                      setColorScale({f: colorScale});


                                                      const force = d3.forceSimulation(data)
                                                            .alphaTarget(0.05) // stay hot
                                                            .velocityDecay(0.5) // low friction
                                                            .force('forceY', d3.forceY(d => yScale(d.return)).strength(yStrength))
                                                            .force('forceX', d3.forceX(width/2).strength(0.05))
                                                            .force('collide', d3.forceCollide(d => rScale(d.marketCap)+2))
                                                            .stop();

                                                      setForce(force);

                                                      const NUM_ITERATIONS = 100;

                                                        for (let i = 0; i < NUM_ITERATIONS; ++i) {
                                                          force.tick();
                                                        };

                                                      const axisGroup = svg
                                                        .append('g')
                                                        .attr("transform", 'translate(0,0)')
                                                        .attr('id', 'vertical-axis-group')
                                                        //.attr("opacity", "0.7");

                                                      const axisLeft = d3.axisLeft(yScale).tickSize(-600).tickFormat(f);

                                                      //axisLeft.ticks(5)

                                                      axisLeft(axisGroup);

                                                      //console.log(axisLeft);

                                                      axisGroup.select(".domain").remove();

                                                      axisGroup.selectAll(".tick text")
                                                               .attr('dx',"0.5em")
                                                               .attr('dy',"-0.5em")
                                                               .style("text-anchor", "start")
                                                               .attr('fill', '#9e9e9e')
                                                               .attr("font-size", "1em");

                                                      axisGroup.selectAll(".tick line")
                                                               .attr('stroke', '#9e9e9e')
                                                               .attr("stroke-dasharray", "2,2");

                                                      axisGroup.selectAll(".tick line")
                                                               .filter((d,i)=>d===0)
                                                               .attr('stroke', '#d50000')
                                                               .attr('stroke-width', '5');

                                                      axisGroup.selectAll(".tick text")
                                                               .filter((d,i)=>d===0)
                                                               .attr('fill', '#d50000');

                                                      axisGroup.selection().selectAll(".tick line")
                                                               .filter((d,i)=>d<0)
                                                               .attr('stroke', '#d50000')

                                                      axisGroup.selection().selectAll(".tick text")
                                                               .filter((d,i)=>d<0)
                                                               .attr('fill', '#d50000');

                                                      axisGroup.selection().selectAll(".tick line")
                                                               .filter((d,i)=>d>0)
                                                               .attr('stroke', '#2196f3')

                                                      axisGroup.selection().selectAll(".tick text")
                                                               .filter((d,i)=>d>0)
                                                               .attr('fill', '#2196f3');


                                                      const arkkGroup = svg
                                                            .append("g")
                                                            .attr("id", "arkk-group")
                                                            .attr("font-size", "10")
                                                            .attr("transform", `translate(0,${yScale(etf.return)})`);


                                                      arkkGroup.append('line')
                                                            .attr('x1', 0)
                                                            .attr('x2', width)
                                                            .attr('y1', 0)
                                                            .attr('y2', 0)
                                                            //.attr('stroke', '#00bcd4')
                                                            .attr('stroke', '#9e9e9e')
                                                            .attr('stroke-width', 5);

                                                      arkkGroup.append('text')
                                                               .attr('dx',"0.2em")
                                                               .attr('dy',"-0.5em")
                                                               .style("text-anchor", "start")
                                                               //.attr('fill', '#00bcd4')
                                                               .attr('fill', '#9e9e9e')
                                                               .attr("font-size", "3em")
                                                               .text(etf.ticker);




                                                       arkkGroup.append('text')
                                                               .attr('class', 'etf-return')
                                                               .attr('dx',width)
                                                               .attr('dy',"-0.5em")
                                                               .style("text-anchor", "end")
                                                               //.attr('fill', '#00bcd4')
                                                               .attr('fill', '#9e9e9e')
                                                               .attr("font-size", "3em")
                                                               .text(f(etf.return));



                                                      const groups = svg
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


                                                      groups.attr("transform", d => `translate(${d.x},${d.y}) scale(${rScale(d.marketCap)})`)
                                                      circles.style("fill", d=>colorScale(d.sector));
                                                      tickerText.text(d=>d.ticker);
                                                      returnText.text(d=>f(d.return));


                                                      force.on("tick", ()=>{
                                                                              groups.attr("transform", d => `translate(${d.x},${d.y}) scale(${rScale(d.marketCap)})`);
                                                                            }
                                                              );

                                                      force.restart();

                                                      return ()=>force.stop();


                                                    },
                                          [fireData]
                                          )
                                  
                                  useEffect(function(){
                                    // console.log(fireData);
                                    // console.log(colorScale);
                                    // console.log(groups);


                                      


                                    if(count&&fireData&&colorScale&&groups&&force&&yScale){
                                      //console.log(count);

                                      //const extent = d3.extent(fireData.stocks, d=>d.return)//.map(d=>Math.abs(d));
                                      const extent = [d3.quantile(fireData.stocks, 0.05, d=>d.return),d3.quantile(fireData.stocks, 0.95, d=>d.return)]
                                      // extent[0] = -Math.max(extent[0], extent[1]);
                                      // extent[1] = -extent[0];

                                      yScale.f.domain(extent).clamp(true);
                                      force.nodes(fireData.stocks);
                                      force.restart();


                                      // colorScale.f.domain(extent);

                                      // groups.selectAll("circle")
                                      //       .transition()
                                      //       .style("fill", d=>colorScale.f(d.return));

                                      groups.selectAll("text.return-text")
                                            .text(d=>f(d.return));


                                      const axisGroup = d3.select('#vertical-axis-group')
                                        .transition();

                                      const axisLeft = d3.axisLeft(yScale.f).tickSize(-600).tickFormat(f);

                                      axisLeft(axisGroup);

                                      axisGroup.selection().select(".domain").interrupt().remove();

                                      axisGroup.selection().selectAll(".tick text")
                                               .attr('dx',"0.5em")
                                               .attr('dy',"-0.5em")
                                               .style("text-anchor", "start")
                                               .attr('fill', '#9e9e9e')
                                               .attr("font-size", "1em");

                                      axisGroup.selection().selectAll(".tick line")
                                               .attr('stroke', '#9e9e9e')
                                               .attr("stroke-dasharray", "4,4");

                                      axisGroup.selection().selectAll(".tick line")
                                               .filter((d,i)=>d===0)
                                               .attr('stroke', '#d50000')
                                               .attr('stroke-width', '5');

                                      axisGroup.selection().selectAll(".tick text")
                                               .filter((d,i)=>d===0)
                                               .attr("font-weight", "bold")
                                               .attr('fill', '#d50000');



                                      axisGroup.selection().selectAll(".tick line")
                                               .filter((d,i)=>d<0)
                                               .attr('stroke', '#d50000')

                                      axisGroup.selection().selectAll(".tick text")
                                               .filter((d,i)=>d<0)
                                               .attr('fill', '#d50000');

                                      axisGroup.selection().selectAll(".tick line")
                                               .filter((d,i)=>d>0)
                                               .attr('stroke', '#2196f3')

                                      axisGroup.selection().selectAll(".tick text")
                                               .filter((d,i)=>d>0)
                                               .attr('fill', '#2196f3');

   

                                      d3.select("#arkk-group .etf-return")
                                        .text(f(fireData.etf.return));

                                      d3.select("#arkk-group")
                                        .transition()
                                        .attr("transform", `translate(0,${yScale.f(fireData.etf.return)})`);

                                      



                                    }
                                    
                                  }, [count]);


  return(
<Row>
<Col align="center">
<div id="swarm-div"></div>


                      </Col>
      </Row>
          

         
        );
}
