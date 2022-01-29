import * as d3 from 'd3';


export default function f(n){
	return n>0 ? ("+" + d3.format(".1f")(n) + "%") : (d3.format(".1f")(n) + "%");
}