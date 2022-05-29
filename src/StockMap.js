
// import {beeswarm} from './Beeswarm.js';
import {useEffect, useState, useRef} from 'react';
// import Pack from './Pack';
// import Swarm from './Swarm';
import { Link, Outlet, useLocation, useOutletContext} from "react-router-dom";
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
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';

// function dataListener() {

// const firestore = getFirestore();



// const hashedData = {};
// let data = null;
// const layouts = { force: null, 
//                   pack: null, 
//                   viz: {circles: null, groups: null, text: null}, 
//                   transition: null,
//                   colorScale: d3.scaleSequential().domain([-5,5]).interpolator(d3.interpolateRdYlGn),
//                   ARKK: null
// };


//   onSnapshot(collection(firestore, "arkk-stocks-daily-returns_"), (querySnapshot) => {

//    const output = {};

//    querySnapshot.forEach((doc) => {
//     output[doc.id] = doc.data().data;
//    });

//    layouts.ARKK = output["current-arkk-etf-price"];


//         d3.select("#arkk-return-span")
//      .text(f(output["current-arkk-etf-price"].return)).transition()
//      .style("color", layouts.colorScale(output["current-arkk-etf-price"].return));

//      d3.select("title")
//      .text("StocksMaps ARKK: " + (output["current-arkk-etf-price"].return>0?"+":"") + f(output["current-arkk-etf-price"].return)+"%");

//   const date = new Date(output["current-arkk-etf-price"].time*1000);

//   d3.select("#last-updated-info-span").text(d3.timeFormat("%H:%M:%S %B %d, %Y")(date));

//    const arkkPrices = output["current-arkk-prices"];

//    // First snapshot => do some work
//    if(!hashedData[arkkPrices[0].ticker]){

//         const arkkWeights = output["current-arkk-weights"];
//         const sumWeights = d3.sum(arkkWeights, d=>d.weight);

//         arkkWeights.forEach((d,i)=>{

//         arkkPrices[i].weight = 100*d.weight/sumWeights;
//         hashedData[arkkPrices[i].ticker] = arkkPrices[i];
//     });
//          data = arkkPrices;


//         if(this.vizRef.current==="circle-pack"){
//           initializePackData(data, layouts, hashedData);
//           drawPack(data, layouts);
//         } else {
//           initializeBeeswarmData(data, layouts);
//           drawBeeswarm(data, layouts);
//         }



//         this.setTransitionPackBeeswarm(function(){
          
//           return ()=>{
//             if(!layouts.force||!layouts.force.force){
//                 initializeBeeswarmData(data, layouts);
//               }
//             transitionPackBeeswarm(data, layouts);
//           }
//         });


//         this.setTransitionBeeswarmPack(function(){
          
//           return ()=>{
//             if(!layouts.pack){
//                 initializePackData(data, layouts, hashedData);
//               }
//             transitionBeeswarmPack(data, layouts);
//           }
//         });



//    } else {
//          arkkPrices.forEach(function(d,i){

//           hashedData[d.ticker].return = d.return;
//       });



//          if(this.vizRef.current==="circle-pack"){
//            updatePackData(data, layouts, hashedData);
//          } else {
//            updateBeeswarmData(data, layouts);
//          }


//    }

//   });

// }




export function StockMap(){

  const hashedData = {};
  const colorScale = d3.scaleSequential().domain([-5,5]).interpolator(d3.interpolateRdYlGn);



  const [fireData, setFireData] = useState(null);
  const [hashedDataRef, setHashedDataRef] = useState({ref: hashedData});
  const [count, setCount] = useState(0);
  const [index] = useOutletContext();
  const [indexName, setIndexName] = useState(null);
  const [indexReturn, setIndexReturn] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);



	useEffect(
              function(){  
                          //console.log(index);
                          if(!index){
                            return;
                          }
                          setFireData(null);
                          const db = getFirestore();

                          let count = 0;

                          const docRef = doc(db, "etf-stocks-prices", index);


                          const unsubscribe = onSnapshot(
                                      docRef, 
                                      (querySnapshot) => {
                                                           const fireData = querySnapshot.data();
                                                           // const output = {};
                                                           // querySnapshot.forEach((doc) => {
                                                           //                                  output[doc.id] = doc.data().data;
                                                           //                                 }
                                                           //                      );
                                                           const arkkPrices = JSON.parse(fireData.data);

                                                           //console.log(arkkPrices);

                                                           // First snapshot => do some work
                                                           if(!hashedData[arkkPrices[0].ticker]){

                                                                //const arkkWeights = output["current-arkk-weights"];
                                                                //const sumWeights = d3.sum(arkkWeights, d=>d.weight);

                                                            //     arkkWeights.forEach((d,i)=>{

                                                            //     arkkPrices[i].weight = 100*d.weight/sumWeights;

                                                            //     hashedData[arkkPrices[i].ticker] = arkkPrices[i];
                                                            // });


                                                                arkkPrices.forEach((d,i)=>{

                                                                hashedData[arkkPrices[i].ticker] = arkkPrices[i];
                                                            });


                                                                hashedData.etf = JSON.parse(fireData.index);
                                                                setFireData({stocks: arkkPrices, etf: hashedData.etf});
                                                                //console.log(hashedData.etf);
                                                                setIndexName(hashedData.etf.name);

                                                                const sectorCount = {}

                                                                arkkPrices.forEach(d=>{
                                                                  if(sectorCount[d.sector]){
                                                                    sectorCount[d.sector].push(d.ticker);
                                                                  } else{
                                                                    sectorCount[d.sector]=[d.ticker];
                                                                  }

                                                                  
                                                                })
                                                                 
                                                                 //console.log(sectorCount);



                                                           } else {

                                                                 arkkPrices.forEach(function(d,i){
                                                                                                    hashedData[d.ticker].return = d.return;
                                                                                                  }
                                                                                    );
                                                                 hashedData.etf.return = JSON.parse(fireData.index).return

                                                                 count+=1;
                                                                 setCount(count);

                                                                 //console.log(hashedData);


                                                           }
                                                           setIndexReturn(hashedData.etf.return);
                                                           const date = new Date(hashedData.etf.time*1000);
                                                           const dateText = d3.timeFormat("%H:%M:%S %B %d, %Y")(date);
                                                           setLastUpdated(dateText);

                                                           setHashedDataRef({ref: hashedData});
                                                           


                                                          }
                                    )
                          return () => {  console.log("Unsubscribe");
                                          unsubscribe();
                                        };
                        },
              [index]
            );



	return(
    <>
     {/*  <nav

        className="App-header"
      >*/}
{/*      <Link  to={'swarm'} className="App-link" >
        Swarm
      </Link>*/}

{/*      <Link  to={'pack'} className="App-link" >
        Pack
       </Link>
       <Link  to={'packforce'} className="App-link" >
        PackForce
       </Link>*/}
        
      {/* </nav>*/}


<Row>
        <Col align="center">
            <h1 id="arkk-return-h1">
            {indexName}: <span id="arkk-return-span" style={{color: colorScale(indexReturn)}}>{f(indexReturn)}</span>
            </h1>

 
     
     {/*fireData ? <Pack fireData={fireData} count={count}/> : <p>Loading</p>*/}
           </Col>
      </Row>

           <br/>


     <Row>

            <Col align="center">
             {fireData ? <Outlet context={[fireData, count, index]}/> : <Spinner animation="border"/>}

             </Col>
      </Row>
           <br/>

      {/*<Outlet context={[setViz, transitionPackBeeswarm, transitionBeeswarmPack]}/>*/}
      <Row>
        <Col align="center">
           <p>Last updated at {lastUpdated}</p>
        </Col>
      </Row>

    </>
    );
}