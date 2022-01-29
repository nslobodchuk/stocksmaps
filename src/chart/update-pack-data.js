import * as d3 from 'd3';

import  { selection, select } from 'd3-selection';
import 'd3-selection-multi';
import f from './return-format';

export function updatePackData(data, layouts){

      const {circles, returnText} = layouts.viz;

      circles
      .transition("color")
      .duration(2000)
      .style("fill", d=>layouts.colorScale(d.return));


      returnText
      .text(d=>f(d.return));


      // console.log(layouts.pack.leaves);



}