import * as d3 from 'd3';

import  { selection, select } from 'd3-selection';
import 'd3-selection-multi';

export function initializePackData(data, layouts, hashedData){

	const width = 600;
	const height = 600;


    let root = {children: data};

    let flatNodeHeirarchy = d3.hierarchy(root).sum(d => d.weight);

      let pack = d3.pack()
        .size([width, height])
          .padding(3);


    let packedData = pack(flatNodeHeirarchy);

    // console.log(packedData);


    if(!layouts.pack){
      layouts.pack = {};
      layouts.pack.leaves = packedData.leaves();
      layouts.pack.refs={};

    }

    layouts.pack.leaves.forEach(d=>{
      layouts.pack.refs[d.data.ticker] = d;
    });

    layouts.pack.leaves.forEach(function(d){

      hashedData[d.data.ticker].pack = d;



    })

    // console.log(packedData.leaves());


}