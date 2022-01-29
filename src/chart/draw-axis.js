import * as d3 from 'd3';

export default function drawAxis(axis, transition){

    let t;

    // console.log(transition);

    if(transition){
       t = d3.select("#bottom-axis-group").transition("scale").duration(2000);
    } else {
       t = d3.select("#bottom-axis-group");
    }





		axis(t);

	    t.selection().selectAll(".domain").interrupt().remove();

        t.selection().selectAll(".tick line")
        //.attr("stroke", d=>layouts.colorScale(d))
        .attr("stroke", "#eeeeee")
        //.attr("stroke-opacity", 0.2)
        //.attr("stroke-dasharray", "2,2");

        t.selection().selectAll(".tick text")
        .attr('fill', '#bcbcbc');

        // t.selection().selectAll(".tick line")
        // .filter((d,i)=>d===0)
        // .attr('stroke', '#616161');

        // t.selection().selectAll(".tick text")
        // .filter((d,i)=>d===0)
        // .attr('fill', '#616161');

        // t.selection().selectAll(".tick text")
        // .style("text-anchor", "end")
        // .attr('dy', "-0.3em")
        // .attr("transform", "rotate(90)")
        // .attr("font-size", "2em")
        // .attr("opacity", "0.4");

}