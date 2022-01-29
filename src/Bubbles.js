import {bubbles} from './CirclePack.js';
import {beeswarm} from './Beeswarm.js';
import {useEffect, useState, useRef} from 'react';
import CirclePack from './CirclePack';
import Beeswarm from './Beeswarm';
import { Link, Outlet, useLocation} from "react-router-dom";
import {initializeBeeswarmData} from './chart/initialize-beeswarm-data';
import {updateBeeswarmData} from './chart/update-beeswarm-data';
import {drawBeeswarm} from './chart/draw-beeswarm';
import {initializePackData} from './chart/initialize-pack-data';
import {drawPack} from './chart/draw-pack';
import {updatePackData} from './chart/update-pack-data';
import {transitionPackBeeswarm} from './chart/transition-pack-beeswarm';
import {transitionBeeswarmPack} from './chart/transition-beeswarm-pack';
import f from './chart/return-format';

import * as d3 from 'd3';

import { 
getFirestore,
doc, 
onSnapshot,
collection, 
getDocs
} from "firebase/firestore";
import {app} from './firebase.js';

function dataListener() {

const firestore = getFirestore();



const hashedData = {};
let data = null;
const layouts = { force: null, 
                  pack: null, 
                  viz: {circles: null, groups: null, text: null}, 
                  transition: null,
                  colorScale: d3.scaleSequential().domain([-5,5]).interpolator(d3.interpolateRdYlGn),
                  ARKK: null
};


// this.transitionPackBeeswarm.f = ()=>(
//     (function(data, layouts){
//           transitionPackBeeswarm(data, layouts);
//         })(data, layouts)
//     );

// this.transitionPackBeeswarm.f = function(){
//           transitionPackBeeswarm(data, layouts);
//         }



  onSnapshot(collection(firestore, "arkk-stocks-daily-returns"), (querySnapshot) => {

   const output = {};

   querySnapshot.forEach((doc) => {
    output[doc.id] = doc.data().data;
   });

   layouts.ARKK = output["current-arkk-etf-price"];


        d3.select("#arkk-return-span")
     .text(f(output["current-arkk-etf-price"].return)).transition()
     .style("color", layouts.colorScale(output["current-arkk-etf-price"].return));

     d3.select("title")
     .text("StocksMaps ARKK: " + (output["current-arkk-etf-price"].return>0?"+":"") + f(output["current-arkk-etf-price"].return)+"%");

  const date = new Date(output["current-arkk-etf-price"].time*1000);

  d3.select("#last-updated-info-span").text(d3.timeFormat("%H:%M:%S %B %d, %Y")(date));

   const arkkPrices = output["current-arkk-prices"];

   // First snapshot => do some work
   if(!hashedData[arkkPrices[0].ticker]){

        const arkkWeights = output["current-arkk-weights"];
        const sumWeights = d3.sum(arkkWeights, d=>d.weight);

        arkkWeights.forEach((d,i)=>{

        arkkPrices[i].weight = 100*d.weight/sumWeights;
        hashedData[arkkPrices[i].ticker] = arkkPrices[i];
    });
         data = arkkPrices;

         


        // Init Swarm Data
        // Init Pack Data

        // Draw Swarm
        // Draw Pack

        // console.log(hashedData);
        // console.log(this.vizRef);

        if(this.vizRef.current==="circle-pack"){
          initializePackData(data, layouts, hashedData);
          drawPack(data, layouts);
        } else {
          initializeBeeswarmData(data, layouts);
          drawBeeswarm(data, layouts);
        }

        // setTimeout(()=>transitionPackBeeswarm(data, layouts), 5000);
        // setTimeout(()=>transitionBeeswarmPack(data, layouts), 15000);

        this.setTransitionPackBeeswarm(function(){
          
          return ()=>{
            if(!layouts.force||!layouts.force.force){
                initializeBeeswarmData(data, layouts);
              }
            transitionPackBeeswarm(data, layouts);
          }
        });


        this.setTransitionBeeswarmPack(function(){
          
          return ()=>{
            if(!layouts.pack){
                initializePackData(data, layouts, hashedData);
              }
            transitionBeeswarmPack(data, layouts);
          }
        });



   } else {
         arkkPrices.forEach(function(d,i){

          hashedData[d.ticker].return = d.return;
      });


         // Update Swarm Data
         // Update Pack Data

         // Transition Swarm
         // Transition Pack


         //updateBeeswarmData(data, layouts);
         //updatePackData(data, layouts, hashedData);

         if(this.vizRef.current==="circle-pack"){
           updatePackData(data, layouts, hashedData);
         } else {
           updateBeeswarmData(data, layouts);
         }


   }
   //this.vizFunctions[this.vizRef.current]();

   


    // console.log("Snapshot in Bubbles " + this.vizRef.current);
    //   console.log(arkkPrices);

  });

}



export function Bubbles(){

  let location = useLocation();

  const urlViz = location.pathname.split("/");


 const [viz, _setViz] = useState(urlViz[urlViz.length-1]==="circle-pack"?"circle-pack":"beeswarm");

  const vizRef = useRef(viz);

  const setViz = t => {
        vizRef.current = t;
        _setViz(t);
  }

  const vizFunctions = {
    "beeswarm": beeswarm,
    "circle-pack": bubbles
  }

  const [transitionPackBeeswarm, setTransitionPackBeeswarm] = useState(null);
  const [transitionBeeswarmPack, setTransitionBeeswarmPack] = useState(null);


  // console.log("Inside Bubbles " + viz);
  // console.log(viz);

	useEffect(dataListener.bind({
    vizFunctions: vizFunctions,
    vizRef: vizRef,
    setTransitionPackBeeswarm: setTransitionPackBeeswarm,
    setTransitionBeeswarmPack: setTransitionBeeswarmPack,
  }), []);


	return(
    <>
      <nav

        className="App-header"
      >
      <Link  to={'swarm'} className="App-link" >
        Swarm
      </Link>

      <Link  to={'pack'} className="App-link" >
        Pack
       </Link>
        
      </nav>
      <h1 id="arkk-return-h1">ARKK ETF: <span id="arkk-return-span"></span></h1>
      <svg id="bubbles-svg"
      width="100%"
      height="100%"
      viewBox="0 0 600 600"
      >

      </svg>
     <p id="last-updated-info">Last updated at <span id="last-updated-info-span"></span></p>

      <Outlet context={[setViz, transitionPackBeeswarm, transitionBeeswarmPack]}/>

    </>
    );
}