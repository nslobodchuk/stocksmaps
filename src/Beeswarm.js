import * as d3 from 'd3';

import  { selection, select } from 'd3-selection';
import 'd3-selection-multi';
import { 
getFirestore,
doc, 
onSnapshot,
collection, 
getDocs
} from "firebase/firestore";
import {useEffect} from 'react';
import {Component} from 'react';
import { useOutletContext } from "react-router-dom";


const width = 600;
const height = 600;
const rMin = 3;
const rMax = 30;


function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export function beeswarm() {


const firestore = getFirestore();


async function bla(){
  const output = {};
  const querySnapshot = await getDocs(collection(firestore, "arkk-stocks-daily-returns"));

  querySnapshot.forEach((doc) => {
    output[doc.id] = doc.data().data;
  });

  //console.log(output);

  const arkkWeights = output["current-arkk-weights"];
  const arkkPrices = output["current-arkk-prices"];

  const sumWeights = d3.sum(arkkWeights, d=>d.weight);

  const hashedData = {};

  arkkWeights.forEach((d,i)=>{

      arkkPrices[i].weight = 100*d.weight/sumWeights;
      hashedData[arkkPrices[i].ticker] = arkkPrices[i];

    });

  const data = arkkPrices;


  const xScale = d3.scaleLinear().domain(d3.extent(data, d => d.return)).range([0+100, width-100]).clamp(true);
  const rScale = d3.scaleSqrt().domain(d3.extent(data, d => d.weight)).range([rMin, rMax]);


  const force = d3.forceSimulation(data)
        .alphaTarget(0.1) // stay hot
        .velocityDecay(0.1) // low friction
        .force('forceX', d3.forceX(d => xScale(d.return))/*.strength(0.02)*/)
        .force('forceY', d3.forceY(height/2)/*.strength(0.1)*/)
        .force('collide', d3.forceCollide(d => rScale(d.weight) + 1))
        //.stop();

   console.log(data);

    const circles = d3.select("#bubbles-div")
      .append('svg')
      .attr("viewBox", "0 0 600 600")
      .style("width", "100%")
      .style("height", "100%")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => rScale(d.weight))
      .style("fill", "#bdbdbd");

   force.on("tick", ()=>circles.attr("cx", d => d.x).attr("cy", d => d.y));


  // const NUM_ITERATIONS = 300;
  
  // for (let i = 0; i < NUM_ITERATIONS; ++i) {
  //   //force.tick();
  //   await timeout(5000);
  //   console.log("Iteration: "+i);
  //   console.log(data[0].ticker + " x: " + data[0].x + "; y: " + data[0].y);
  //   //circles.attr("cx", d => d.x).attr("cy", d => d.y);

  //   for (let k=0; k<data.length; k++){
  //     data[k].return+=Math.random();
  //   }
  //   xScale.domain(d3.extent(data, d => d.return));
  //   force.nodes(data);
  // };
  
  // force.stop();




  onSnapshot(collection(firestore, "arkk-stocks-daily-returns"), (querySnapshot) => {

   const output = {};

   querySnapshot.forEach((doc) => {
    output[doc.id] = doc.data().data;
   });

   const arkkPrices = output["current-arkk-prices"];

    arkkPrices.forEach(function(d,i){
      hashedData[d.ticker].return = d.return;
    })

    xScale.domain(d3.extent(data, d => d.return));
    force.nodes(data);
    force.restart();
    // console.log("Snapshot");
    // console.log(data);

  });







  // console.log(force.nodes());







  // console.log(data);
  // console.log(force.nodes()===data);
}

bla();
}

export default function Beeswarm(){
  const [setViz, transitionPackBeeswarm, transitionBeeswarmPack] = useOutletContext();
  // console.log(transitionPackBeeswarm);
  useEffect(()=>{
    // console.log("Beeswarm useEffect");
    setViz("beeswarm");
    //d3.select("#bubbles-div > svg").remove();
    //beeswarm();

    // Init Swarm Data
    // Update Swarm Data
    // Transition Pack -> Swarm
    if(transitionPackBeeswarm){
      transitionPackBeeswarm();
    }
  }, []);

  // console.log("Beeswarm outside useEffect");


  

  return(
    null
    );
}
