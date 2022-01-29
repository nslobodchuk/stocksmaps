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


const f = d3.format(".1f");


export function bubbles() {


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


  const [circle, returnText, myColor] = viz(arkkWeights, arkkPrices);

  d3.select("#arkk-return-span")
     .text((output["current-arkk-etf-price"].return>0?"+":"") + f(output["current-arkk-etf-price"].return)+"%")
     .style("color", myColor(output["current-arkk-etf-price"].return));

  d3.select("title")
     .text("StocksMaps ARKK: " + (output["current-arkk-etf-price"].return>0?"+":"") + f(output["current-arkk-etf-price"].return)+"%");


  const date = new Date(output["current-arkk-etf-price"].time*1000);

  d3.select("#last-updated-info-span").text(d3.timeFormat("%H:%M:%S %B %d, %Y")(date));

  // const unsub = onSnapshot(doc(firestore, "arkk-stocks-daily-returns", "current-arkk-prices"), (doc) => {

  //   const arkkPrices = doc.data().data;
  //   const data = {};

  //   arkkPrices.forEach(function(d,i){
  //     data[d.ticker] = d.return;
  //   })

  //   circle.transition().attr("fill", d=>myColor(data[d.data.ticker]))
  //    .attr('stroke', d=>myColor(data[d.data.ticker]));


  //    returnText.text(d=> ((data[d.data.ticker]<0?"":"+") + f(data[d.data.ticker]) + "%"))

  //   console.log("Current data: ", doc.data().data);
  // });

  onSnapshot(collection(firestore, "arkk-stocks-daily-returns"), (querySnapshot) => {

   const output = {};

   querySnapshot.forEach((doc) => {
    output[doc.id] = doc.data().data;
   });

   const arkkPrices = output["current-arkk-prices"];
   const data = {};

    arkkPrices.forEach(function(d,i){
      data[d.ticker] = d.return;
    })

    circle.transition().attr("fill", d=>myColor(data[d.data.ticker]))
     .attr('stroke', d=>myColor(data[d.data.ticker]));


     returnText.text(d=> ((data[d.data.ticker]<0?"":"+") + f(data[d.data.ticker]) + "%"))

     d3.select("#arkk-return-span")
     .text((output["current-arkk-etf-price"].return>0?"+":"") + f(output["current-arkk-etf-price"].return)+"%").transition()
     .style("color", myColor(output["current-arkk-etf-price"].return));

     d3.select("title")
     .text("StocksMaps ARKK: " + (output["current-arkk-etf-price"].return>0?"+":"") + f(output["current-arkk-etf-price"].return)+"%");

     const date = new Date(output["current-arkk-etf-price"].time*1000);

     d3.select("#last-updated-info-span").text(d3.timeFormat("%H:%M:%S %B %d, %Y")(date));

  });

}





	function viz(arkkWeights, arkkPrices){

    //console.log(data.map(d=>("$" + d.ticker)).join(" "));


    //console.log(data);
    //console.log(yahoo);


    //const quotes = yahoo.quoteResponse.result.map(d=>({ticker: d.symbol, return: d.regularMarketChangePercent}));

		


		//console.log(quotes);



		//data = data.slice(0,-2);

		// data = data.map((d,i)=>{
		// 	d.return = quotes[i].return;
  //     //d.return = 100*weeklyReturns[d.ticker];

		// 	return d;
		// });

    const sumWeights = d3.sum(arkkWeights, d=>d.weight);

    arkkWeights.forEach((d,i)=>{

      arkkPrices[i].weight = 100*d.weight/sumWeights;

    });

    const data = arkkPrices;



		// data[data.length-1].ticker = "Cash";
		//console.log(data);

		// const tickers = data.map(d=>d.ticker);
  //   console.log(tickers);
  //   tickers.push("ARKK")
		// console.log(
		// 	"https://query1.finance.yahoo.com/v7/finance/quote?&symbols="+
		// 	tickers.join());

		//const extent = d3.extent(data, d=>Math.log(1+d.return/100));
    const extent = [-5,5];
    //const extentInverted = d3.extent(data, d=>Math.abs(1/d.return));

    const myColor = d3.scaleSequential().domain(extent).interpolator(d3.interpolateRdYlGn);
    // const myColor = d3.scaleSequential().domain(extent).interpolator(d3.interpolatePiYG);
    // const myColor = d3.scaleSequential().domain(extent).interpolator(d3.interpolateViridis);
    // const myColor = d3.scaleSequential().domain(extent).interpolator(d3.interpolateCividis);
    //const myColor = d3.scaleSequential().domain([extent[1],extent[0]]).interpolator(d3.interpolateViridis);
    //const myColor = d3.scaleSequential().domain([10,-10]).interpolator(d3.interpolateViridis);
    // const myColor = d3.scaleSequential().domain([-10,10]).interpolator(d3.interpolateViridis);


		// const myColor = d3.scaleSequential().domain(extent).interpolator(d3.interpolateMagma);
		// const colorText = d3.scaleSequential().domain(extent).interpolator(d3.interpolateViridis);
    // const myColor = d3.scaleSequential().domain(extent).interpolator(d3.interpolateRdBu);
    // const myColor = d3.scaleSequential().domain(extent).interpolator(d3.interpolateSpectral);
    // const myColor = d3.scaleSequential().domain(extent).interpolator(d3.interpolatePRGn);
    // const myColor = d3.scaleSequential().domain(extent).interpolator(d3.interpolateBrBG);
    //const myColor = d3.scaleSequential().domain(extent).interpolator(d3.interpolateCividis);

    // const colorText = d3.scaleSequential().domain(extentInverted).interpolator(d3.interpolateBlues);
    const colorText = d3.scaleSequential().domain(extent).interpolator(d3.interpolateGreys);


		let root = {children: data};
		let flatNodeHeirarchy = d3.hierarchy(root).sum(d => d.weight);

		//console.log(flatNodeHeirarchy);


		  let width = 600;
		  let height = 600;
      let headSpace = 0;
		  let pack = d3.pack()
		  	.size([width, height])
      		.padding(3)

    let packedData = pack(flatNodeHeirarchy);

    const svg = select("#bubbles-div")
    	.append('svg')
      .attr("viewBox", "0 0 600 600")
      .style("width", "100%")
      .style("height", "100%")
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "middle");

       const rect = svg.append("rect")
      .style("width", "100%")
      .style("height", "100%")
      .attr("fill", "white")
      // .attr("stroke", "red")
      // .attr("stroke-width", "10");

      // const header = svg.append("text")
      // .attr("transform", `translate(${width/2},${headSpace/2})`)
      // .attr("alignment-baseline", "middle")
      // .attr("text-anchor", "middle")
      // .attr("font-weight", "bold")
      // //.attr("stroke", "#212121")
      // .attr("font-size", "20");

      // header.append("tspan").attr("fill", "#212121").text("ARKK performance on Dec 23, 2021: ");

      // const arkkReturn = header.append("tspan")
      // .attr("fill", myColor(0))
      // .text(f(quotes[quotes.length-1].return)+"%");





      const bubbles = svg.append("g").attr("transform", `translate(${0},${headSpace})`);



     

      const leaf = bubbles.selectAll("g")
    .data(packedData.leaves())
    .enter().append("g")
      .attr("transform", d => `translate(${d.x},${d.y})`);



        const circle = leaf.append("circle")
      .attr("r", d => d.r*0.8)
     .attr("stroke-width", d=>d.r*0.4)
      .attr("fill", d=>myColor(d.data.return))
     .attr('stroke', d=>myColor(d.data.return))
     // .attr("fill", myColor(0))
     // .attr('stroke', myColor(0));

     //  leaf.append("circle")
     //  .attr("r", d => d.r*0.8)
     // .attr("fill", "#eeeeee")
     // .attr("opacity", 0.5);

   //         leaf.append("rect")
   //      .attr('x', d => -d.r*0.8/Math.sqrt(2))
   // .attr('y', d => -d.r*0.8/Math.sqrt(2))
   // .attr('width', d => d.r*2*0.8/Math.sqrt(2))
   // .attr('height', d => d.r*2*0.8/Math.sqrt(2))
   //   .attr("fill", "#eeeeee")
   //   .attr("opacity", 0.8);

     // leaf.append("circle")
     //  .attr("r", d => d.r)
     //  .attr("stroke-width", 1)
     // //.attr("stroke-width", d=>d.r*0.4)
     // .attr("fill", "none")
     // .attr('stroke', "#212121");

          function getBottomPathData(d) {
        // adjust the radius a little so our text's baseline isn't sitting directly on the circle
        var r = d.r * 0.9;
        var startX = - r;
        return 'm' + startX + ',' + 0 + ' ' +
          'a' + r + ',' + r + ' 0 0 0 ' + (2*r) + ',0';
      }


                function getTopPathData(d) {
        // adjust the radius a little so our text's baseline isn't sitting directly on the circle
        var r = d.r * 0.9;
        var startX = - r;
        return 'm' + startX + ',' + 0 + ' ' +
          'a' + r + ',' + r + ' 0 0 1 ' + (2*r) + ',0';
      }

    leaf.append("path")
    .attr("d", getBottomPathData)
    .attr("id", d=>"bottom-" + d.data.ticker)
    .attr("fill", "none")
    .attr("stroke", 'none');

        leaf.append("path")
    .attr("d", getTopPathData)
    .attr("id", d=>"top-" + d.data.ticker)
    .attr("fill", "none")
    .attr("stroke", 'none');

    const logos = leaf.append("svg:image")
   // .attr('x', d => -d.r*0.6/Math.sqrt(2))
   // .attr('y', d => -d.r*0.6/Math.sqrt(2))
   // .attr('width', d => d.r*2*0.6/Math.sqrt(2))
   // .attr('height', d => d.r*2*0.6/Math.sqrt(2))
   .attr('x', d => -d.r*0.7/Math.sqrt(2))
   .attr('y', d => -d.r*0.7/Math.sqrt(2))
   .attr('width', d => d.r*2*0.7/Math.sqrt(2))
   .attr('height', d => d.r*2*0.7/Math.sqrt(2))
   // .attr('x', d => -d.r/Math.sqrt(2))
   // .attr('y', d => -d.r/Math.sqrt(2))
   // .attr('width', d => d.r*2/Math.sqrt(2))
   // .attr('height', d => d.r*2/Math.sqrt(2))
   // .attr('x', d => 0)
   // .attr('y', d => 0)
   // .attr('width', d => 0)
   // .attr('height', d => 0)
   //  .attr('x', d => -d.r*0.5/Math.sqrt(2))
   // .attr('y', d => -d.r*0.5/Math.sqrt(2))
   // .attr('width', d => d.r*2*0.5/Math.sqrt(2))
   // .attr('height', d => d.r*2*0.5/Math.sqrt(2))
   .attr('opacity', 1)
   .attr("xlink:href", d => "./logos/"+ d.data.ticker + ".png");

      const text = leaf.append("text");


      // text.append("tspan")
      // .attr("x", 0)
      // .attr("text-anchor", "middle")
      // .attr("dominant-baseline", "baseline") 
      // 					.text(d=>(d.data.ticker))
      // 					.attr("fill", "#B0BEC5")
      // 					.attr("font-weight", "bold")
      // 					// .attr("fill", d=> myColor(extent[1]-d.data.return + extent[0]))
      // 					.attr('font-size', d=>(1.05*Math.sqrt(d.data.weight)+"em"))
      //           .attr('xlink:href', d=>"circle-" + d.data.ticker);


            const tickerText = leaf.append("text")
            .append("textPath")
      .attr('xlink:href', d=>"#top-" + d.data.ticker)
      // .attr("text-anchor", "middle")
      // .attr("dominant-baseline", "baseline") 
                .text(d=>(d.data.ticker))
                .attr("alignment-baseline", "hanging")
                .attr("startOffset", "50%")
                .attr("text-anchor", "middle")
                //.attr("fill", "#e0e0e0")
                .attr("fill", "#424242")
                //.attr("fill", "white")
                //.attr("fill", d=>colorText(d.data.return))
                //.attr("fill", d=>colorText(Math.abs(1/d.data.return)))
                .attr("font-weight", "bold")
                .attr("letter-spacing", 2)
                // .attr("fill", d=> myColor(extent[1]-d.data.return + extent[0]))
                .attr('font-size', d=>(0.8*Math.sqrt(d.data.weight)+"em"));
                //.attr('font-size', d=>(0.8*Math.sqrt(d.data.weight)+"em"));

     //  text.append("tspan")
     //  .attr("x", 0)
     //  .attr("dy", "1.2em")
     // .attr("text-anchor", "middle")
     // //.attr("dominant-baseline", "hanging")
     //  					.text(d=>("          " + f(d.data.return) + "%"))
     //  					.attr("fill", "#B0BEC5")
     //  					.attr("font-weight", "bold")
     //  					// .attr("fill", d=> myColor(extent[1]-d.data.return + extent[0]))
     //  					.attr('font-size', d=>(1.05*Math.sqrt(d.data.weight)+"em"));


      const returnText = leaf.append("text").append("textPath")
      .attr('xlink:href', d=>"#bottom-" + d.data.ticker)
      // .attr("text-anchor", "middle")
      // .attr("dominant-baseline", "baseline") 
                .text(d=> ((d.data.return<0?"":"+") + f(d.data.return) + "%"))
                .attr("startOffset", "50%")
                .attr("text-anchor", "middle")
                //.attr("fill", d=>colorText(d.data.return))
                 .attr("fill", "#424242")
                //.attr("fill", "white")
                .attr("font-weight", "bold")
                .attr("letter-spacing", 2)
                // .attr("fill", d=> myColor(extent[1]-d.data.return + extent[0]))
                .attr('font-size', d=>(0.8*Math.sqrt(d.data.weight)+"em"));
                // .attr('font-size', d=>(0.8*Math.sqrt(d.data.weight)+"em"));



                return [circle, returnText, myColor];



	}

  bla();

	
	// });



}


export default function CirclePack(){
  const [setViz, transitionPackBeeswarm, transitionBeeswarmPack] = useOutletContext();
  useEffect(()=>{
    // console.log("Circle Pack");
    setViz("circle-pack");
    //d3.select("#bubbles-div > svg").remove();
    //bubbles();

    // Init Pack Data
    // Update Pack Data
    // Transition Swarm -> Pack

   if(transitionBeeswarmPack){
      transitionBeeswarmPack();
    }

  }, []);

  
  return(
    null
    );
}