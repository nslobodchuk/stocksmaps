import { Link, Outlet, useLocation} from "react-router-dom";
import {useEffect, useState, useRef} from 'react';
import f from './chart/return-format';
import * as d3 from 'd3';
import { 
getFirestore,
doc, 
onSnapshot,
collection
} from "firebase/firestore";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';



export default function StockMapWrap(){

	let location = useLocation();

	const [index, setIndex] = useState(null);

	useEffect(()=>{
					if(location.pathname==="/GSPC"){
														setIndex("^GSPC");

													} else

					if(location.pathname==="/DJI"){
														setIndex("^DJI");
													} else

					if(location.pathname==="/ARKK"){
														setIndex("ARKK");
													} else {
																setIndex("^NDX");
															} 
					}, [location]);



	//const colorScale = d3.scaleSequential().domain([-5,5]).interpolator(d3.interpolateRdYlGn);
	const colorScale = function(v){
		let c = 'black';

		if (v<0){
			 c = '#b71c1c';
		} else if (v>0){
			 c = '#1b5e20';
		}

		return c;
	}
  const f2 = d3.format(",.2f");

  const [ndxPrice, setNdxPrice] = useState(null);
  const [ndxReturn, setNdxReturn] = useState(null);
  const [gspcPrice, setGspcPrice] = useState(null);
  const [gspcReturn, setGspcReturn] = useState(null);
  const [djiPrice, setDjiPrice] = useState(null);
  const [djiReturn, setDjiReturn] = useState(null);
  const [arkkPrice, setArkkPrice] = useState(null);
  const [arkkReturn, setArkkReturn] = useState(null);







    useEffect(
              function(){  
                          const db = getFirestore();
                          let count = 0;
                          const collectionRef = collection(db, "etf-prices");
                          const unsubscribe = onSnapshot(
                                      collectionRef, 
                                      (querySnapshot) => {
                                                          const output = {};
                                                           querySnapshot.forEach((doc) => {
                                                                                            output[doc.id] = JSON.parse(doc.data().data);
                                                                                           });
                                                           //console.log(output);

                                                           setNdxPrice(output["^NDX"].price);
                                                           setNdxReturn(output["^NDX"].return);

                                                           setGspcPrice(output["^GSPC"].price);
                                                           setGspcReturn(output["^GSPC"].return);

                                                           setDjiPrice(output["^DJI"].price);
                                                           setDjiReturn(output["^DJI"].return);

                                                           setArkkPrice(output["ARKK"].price);
                                                           setArkkReturn(output["ARKK"].return);

                                      })


                          return () => {  console.log("Unsubscribe");
                                          unsubscribe();
                                        };
                        },[]);

	





	return(
		<>
		<br/>
<Container fluid>
<Row>
		<Nav variant="pills" justify activeKey={location.pathname==="/"?"/NDX":location.pathname}>
		<Col align="center">
  <Nav.Item  className='fs-10'>
    <Nav.Link as={Link} to={'/NDX'} eventKey="/NDX">
    NASDAQ-100  <span style={{color: colorScale(ndxReturn)}}>({f(ndxReturn)})</span>
		</Nav.Link>
  </Nav.Item>
  </Col>
   <Col align="center">
  <Nav.Item>
    <Nav.Link as={Link} to={'/GSPC'} eventKey='/GSPC'>
    	S&P 500 <span style={{color: colorScale(gspcReturn)}}>
    						({f(gspcReturn)})
		        </span>
    </Nav.Link>
  </Nav.Item>
  </Col>
    <Col align="center">
  <Nav.Item>

    <Nav.Link as={Link} to={'/DJI'}  eventKey='/DJI'>
      Dow 30 <span style={{color: colorScale(gspcReturn)}}>
		            ({f(gspcReturn)})
		        </span>
    </Nav.Link>
  </Nav.Item>
  </Col>
  <Col align="center">
    <Nav.Item>
    
    <Nav.Link as={Link} to={'/ARKK'} eventKey='/ARKK'>
      ARKK <span style={{color: colorScale(arkkReturn)}}>
		              ({f(arkkReturn)})
		            </span>
    </Nav.Link>
  </Nav.Item>
  </Col>
</Nav>
</Row>
</Container>



{/*				<div className='maps-links-div'>
				<div className='header-link-div'>
		      <Link  to={'/NDX'} className="App-link" >
		        NASDAQ-100 
		      </Link>
		      <Link  to={'/NDX'} className="App-link" >
		        <span style={{color: colorScale(ndxReturn)}}>
		          {f2(ndxPrice)} ({f(ndxReturn)})
		        </span>
		      </Link>
		      </div>

		      <div className='header-link-div'>
		      <Link  to={'/GSPC'} className="App-link" >
		        S&P 500
		      </Link>
		      <Link  to={'/GSPC'} className="App-link" >
		        <span style={{color: colorScale(gspcReturn)}}>
		            {f2(gspcPrice)} ({f(gspcReturn)})
		        </span>
		      </Link>
		      </div>

		      <div className='header-link-div'>
		        <Link  to={'/DJI'} className="App-link" >
		          Dow 30
		        </Link>
		        <Link  to={'/DJI'} className="App-link" >
		          <span style={{color: colorScale(djiReturn)}}>
		            {f2(djiPrice)} ({f(djiReturn)})
		          </span>
		        </Link>
		      </div>
		      <div className='header-link-div'>
		        <Link  to={'/ARKK'} className="App-link" >
		          ARKK
		        </Link>
		        <Link  to={'/ARKK'} className="App-link" >
		           <span style={{color: colorScale(arkkReturn)}}>
		              {f2(arkkPrice)} ({f(arkkReturn)})
		            </span>
		        </Link>
		      </div>
		      </div>*/}
<br/>
		<Container>


		<Row>
		<Col>

			<Outlet context={[index]}/>
		</Col>
		</Row>
		</Container>
		</>
		)
}