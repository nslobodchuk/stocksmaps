import BlogPost1 from './blog/post1';
import { Link, Outlet, useLocation} from "react-router-dom";
import {useEffect, useState, useRef} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';






export default function Blog(){




		let location = useLocation();

		const [index, setIndex] = useState(null);


		useEffect(()=>{
						if(location.pathname==="/post1"){
															setIndex("post1");
														} 


						}, [location]);


	return(
		<>
	{location.pathname==="/blog"?
					<Container>

					<h1>Blog Posts</h1>

															<hr/>
					


				        <Row className='mb-4'>
<Col lg={6}>
					<h1>
						<Link  to={'/blog/snow-deceleration'} className="App-link" >
				        	Snowflake Deceleration
				        </Link>
				    </h1>
<p> Revenue growth has dropped to 85%. This is only slightly above NRRR, 174%. 
    Most revenue growth comes from the expansion within existing customers. 
    Number of customers growth has slowed down to 39% YoY.
    </p>
    <p>In the earnings release for Q1 2023 the management is guiding for a 66% growth in 2023. 
    A year ago, in the earnings release for Q1 2022, the guidance for 2022 was 90%.</p>
    </Col>
    <Col lg={6}>
    
    <Image fluid src='/assets/blog/4/SNOW.png'/>
    </Col>
    </Row>


										<hr/>
					


				        <Row className='mb-4'>
<Col lg={6}>
					<h1>
						<Link  to={'/blog/arkk-long-short'} className="App-link" >
				        	Swing Trading ARKK ETF
				        </Link>
				    </h1>
<p>This is yet another variation on the blog post about hedging ARKK ETF. 
In this post I present a slightly different trading strategy where you're long ARKK during an uptrend and take a short position when the trend turns down (as opposed to going to cash). 
    </p>
    </Col>
    <Col lg={6}>
    
    <Image fluid src='/assets/blog/3/arkk-long-short.png'/>
    </Col>
    </Row>




					<hr/>
					


				        <Row className='mb-4'>
<Col lg={6}>
					<h1>
						<Link  to={'/blog/arkk-arkw'} className="App-link" >
				        	Hedging ARKW ETF with ARKK
				        </Link>
				    </h1>
<p>This blog post is a slight variation on the previos blog post about hedging ARKK ETF. 
In that post I described a trading strategy when you exit your long position in ARKK whenever the trend turns down. 
In this post I present a slightly different trading strategy where you go long ARKW ETF (Next Generation Internet ETF) and hedge this long position with ARKK whenever the trend turns down. 
This might be interesting for long-term investors who hold a long portfolio of growth stocks and would like to reduce drawdowns. 
In this blog post you can perform your own backtest by choosing the parameters of EMAs and the backtest period. 
    </p>
    </Col>
    <Col lg={6}>
    
    <Image fluid src='/assets/blog/2/arkk-arkw.png'/>
    </Col>
    </Row>

					<hr/>
					


				        <Row className='mb-4'>
<Col lg={6}>
					<h1>
						<Link  to={'/blog/arkk-momentum'} className="App-link" >
				        	Hedging Your Growth Portfolio: ARKK ETF
				        </Link>
				    </h1>
<p>
Drawdowns reduce total investment returns because it requires a lot of time and  market growth to recover. 
There’s a way both to <b>reduce the extent of drawdowns and improve your total returns</b>. 
The answer is using a combination of exponential moving averages to detect when the trend has turned down. 
Identify the periods when the risk of a drawdown is the largest and avoid them by going market neutral. 
On average, <b>hedging significantly reduces drawdowns, and improves investment returns</b>.

    </p>
    </Col>
    <Col lg={6}>
    
    <Image fluid src='/assets/blog/1/cumul-return.png'/>
    </Col>
    </Row>

    <hr/>
				        

				    </Container>

				  :        
				  <Outlet context={[index]}/>
	}



		</>

		)
}