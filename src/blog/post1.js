
import * as d3 from 'd3';
import arkk from './ARKK.json';

import {useEffect, useState} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import Subscribe from '../Subscribe';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';

import { useNavigate } from "react-router-dom";


function f(n){
	return n>0 ? ("+" + d3.format(".1f")(n*100) + "%") : (d3.format(".1f")(n*100) + "%");
}




//https://query1.finance.yahoo.com/v8/finance/chart/ARKK?formatted=true&lang=en-US&region=US&includeAdjustedClose=true&interval=1d&period1=0&period2=1643932800&events=capitalGain|div|split&useYfid=true

export default function BlogPost1(){

	const navigate = useNavigate();


	const [loading, setLoading] = useState(false);

	const [src1, setSrc1] = useState('');
	const [src2, setSrc2] = useState('');
	const [src3, setSrc3] = useState('');

	const [crl, setCrl] = useState([]);
	const [crh, setCrh] = useState([]);
	const [mdl, setMdl] = useState('');
	const [mdh, setMdh] = useState('');

	const [parameters, setParameters] = useState({});

	const [ value, setValue ] = useState(60);

	const [ ema1, setEma1 ] = useState(5);
	const [ ema2, setEma2 ] = useState(7);
	const [ ema3, setEma3 ] = useState(50);

	const [startDate, setStartDate] = useState(new Date(Date.UTC(2015,1,14)));
  	const [endDate, setEndDate] = useState(new Date(Date.UTC(2022,4,23)));

  	const [searchParams, setSearchParams] = useSearchParams();

  	useEffect(()=>{

  		if(searchParams.get('ema1')){
  			setEma1(searchParams.get('ema1'))
  		}
  		if(searchParams.get('ema2')){
  			setEma2(searchParams.get('ema2'))
  		}
  		if(searchParams.get('ema3')){
  			setEma3(searchParams.get('ema3'))
  		}


  		 if(searchParams.get('start')){
  		 	setStartDate(new Date(searchParams.get('start')*1000));
  			
  		}

  		 if(searchParams.get('end')){
  		 	setEndDate(new Date(searchParams.get('end')*1000));
  		}
  


  		
  		
  	}, [searchParams])




	//results();


	useEffect(()=>{

		const date1 = Math.floor((startDate).getTime() / 1000);
		const date2 = Math.floor((endDate).getTime() / 1000);


		let p1,p2,p3,p4,p5;

		p1 = date1;
		p2 = date2;
		p3 = ema1;
		p4 = ema2;
		p5 = ema3;

		if(searchParams.get('ema1')){
  			setEma1(searchParams.get('ema1'))
  			p3= searchParams.get('ema1');
  		}
  		if(searchParams.get('ema2')){
  			setEma2(searchParams.get('ema2'))
  			p4 = searchParams.get('ema2');
  		}
  		if(searchParams.get('ema3')){
  			setEma3(searchParams.get('ema3'));
  			p5 = searchParams.get('ema3');
  		}


  		 if(searchParams.get('start')){
  		 	setStartDate(new Date(searchParams.get('start')*1000));
  		 	p1 = searchParams.get('start');
  			
  		}

  		 if(searchParams.get('end')){
  		 	setEndDate(new Date(searchParams.get('end')*1000));
  		 	p2 = searchParams.get('end');
  		}




				setLoading(true);

				fetch(`https://functions.yandexcloud.net/d4eps4lcmqg182og1amv?start=${p1}&end=${p2}&ema1=${p3}&ema2=${p4}&ema3=${p5}`)
				.then(res => res.json()).then(json=>{
						setSrc1("data:image/png;base64," + json.img1);
						setSrc2("data:image/png;base64," + json.img2);
						setSrc3("data:image/png;base64," + json.img3);

						setCrl(json.cumulative_return_long)
						setCrh(json.cumulative_return_hedged)
						setMdl(json.max_drawdown_long)
						setMdh(json.max_drawdown_hedged)

						setParameters(json.parameters);



						setLoading(false);
					});
	},[]);



	function sendRequest(e){



		const date1 = Math.floor((startDate).getTime() / 1000);
		const date2 = Math.floor((endDate).getTime() / 1000);

		setSearchParams({
			start: date1,
			end: date2,
			ema1: ema1,
			ema2: ema2,
			ema3: ema3
		});

		//navigate("#results");
		window.history.pushState("", "", "#results");

		const url = `https://functions.yandexcloud.net/d4eps4lcmqg182og1amv?start=${date1}&end=${date2}&ema1=${ema1}&ema2=${ema2}&ema3=${ema3}`;

		setLoading(true);


		fetch(url).then(res => res.json()).then(json=>{

				setSrc1("data:image/png;base64," + json.img1);
				setSrc2("data:image/png;base64," + json.img2);
				setSrc3("data:image/png;base64," + json.img3);

				setCrl(json.cumulative_return_long)
				setCrh(json.cumulative_return_hedged)
				setMdl(json.max_drawdown_long)
				setMdh(json.max_drawdown_hedged)

				setParameters(json.parameters);

				setLoading(false);
	});



	}





//https://jaywilz.github.io/react-bootstrap-range-slider/

	return <>
	<Container>
	<Row><h1>Hedging Your Growth Portfolio: ARKK ETF</h1></Row>
    <br/>



	<Row>
{/*	<Col lg={3}/>
	<Col lg={6}>*/}
	


    <p>
Recently <b>ARKK ETF gave up all its pandemic gains</b>, almost reaching the pandemic low on May 12, 2022. <b>The drawdown from its peak in February 2021 has been -76%</b>. 
Before that, the ETF experienced smaller but also significant drawdowns of about -30% in early 2016 and late 2018. 
Obviously, such large drawdowns are a risk for your portfolio, because you’re never sure if you’re buying at the market top. 
Also, these drawdowns reduce total investment returns because it requires time and a lot of market growth to recover.
    </p>

    <Row className='mb-4'>
<Col lg={6}>
    <Image fluid src='/assets/blog/1/arkk.png'/>
    </Col>
    <Col lg={6}>
    <Image fluid src='/assets/blog/1/arkk-drawdown.png'/>
    </Col>
    </Row>


    <p>Surprisingly, there’s a way both to <b>reduce the extent of drawdowns and improve your total returns</b> when investing in growth stocks. 
    The answer is using a combination of exponential moving averages to detect when the trend has turned down. 
    By following this simple trading strategy, we exit the long position in ARKK ETF when the trend turns down. 
    And we reenter the long position in ARKK when the trend is no longer down. 
    So, the goal is to <b>identify the periods when the risk of a drawdown is the largest</b>, and to simply avoid them by going market neutral.</p>

    <Row className='mb-4'>
<Col lg={6}>
    <Image fluid src='/assets/blog/1/cumul-return.png'/>
    </Col>
    <Col lg={6}>
    
    <Image fluid src='/assets/blog/1/drawdown-strategy.png'/>
    </Col>
    </Row>

        <Row className='mb-4'>
<Col lg={4}>
    <p>In this strategy <b>the signal for going market neutral</b> arrives when the following two conditions are simultaneously satisfied.</p>
    </Col>
    <Col lg={8}>
   		 <ListGroup as="ol" numbered className="mb-4">
		  <ListGroup.Item as='li'> <b>5-day exponential moving average (EMA) is below 7-day EMA.</b></ListGroup.Item>
		  <ListGroup.Item as='li'><b>Closing price of ARKK is below its 50-day EMA.</b></ListGroup.Item>
		</ListGroup>
    </Col>
    </Row>

<p>So, when such a signal arrives, we go market neutral. In terms of the backtest described here, we <b>close our long ARKK position</b>. 
On the other hand, when the signal disappears, we <b>reenter our long ARKK position</b>. 
The latter may happen when either 5-day EMA crosses above 7-day EMA or the closing price of ARKK crosses above 50-day EMA, or both. 
In other words, we’re long whenever there’s no signal.</p>

        <Row className='mt-4 mb-4'>
<Col lg={5}>
    <p>When doing a backtest it’s important to avoid the <b>look-ahead bias</b>. 
The decisions to go market-neutral or to reenter the long position, are based on the closing price of ARKK and the values of EMAs. 
It assumes that at the end of the trading day, you look at the indicators to determine if there’s a signal, 
and based on this information you either keep your existing position, go market-neutral, or reenter the long position. 
So, the backtest assumes that on the day when the hedge signal arrives, you’re still long ARKK because you learn about the signal only at the end of the day. 
And similarly, on the day when the signal to hedge disappears, you’re still market-neutral, because you learn about the change in the trend only at the end of the day.</p>

    </Col>
    <Col lg={7}>
    	<Card>
    		<Card.Body>
    		<Subscribe idProp="1"/>
    		</Card.Body>
    	</Card>
    </Col>
    </Row>


<p><b>Now, how much does hedging improve the performance?</b> It turns out that for the period from February 2015 to May 2022, the simple long strategy yielded on average 9.9% per annum, 
while <b>hedging improved the annualized return to 26.4%!</b> A significant improvement. 
The total return of the long strategy was 95%, while <b>the total return of the hedging strategy was 423%!</b> At the same time, <b>hedging significantly reduced drawdowns</b>. 
{/*Here’s a table with the results for various sub-periods. */}
On average, <b>hedging significantly reduces drawdowns, and improves investment returns</b>.</p>

{/*http://localhost:3000/blog/arkk-momentum?start=1420070400&end=1451520000&ema1=5&ema2=7&ema3=50#results
http://localhost:3000/blog/arkk-momentum?start=1451606400&end=1483142400&ema1=5&ema2=7&ema3=50#results
http://localhost:3000/blog/arkk-momentum?start=1483228800&end=1514678400&ema1=5&ema2=7&ema3=50#results
http://localhost:3000/blog/arkk-momentum?start=1514764800&end=1546214400&ema1=5&ema2=7&ema3=50#results
http://localhost:3000/blog/arkk-momentum?start=1546300800&end=1577750400&ema1=5&ema2=7&ema3=50#results
http://localhost:3000/blog/arkk-momentum?start=1577836800&end=1609372800&ema1=5&ema2=7&ema3=50#results
http://localhost:3000/blog/arkk-momentum?start=1609459200&end=1640908800&ema1=5&ema2=7&ema3=50#results
*/}
      {/*<Table responsive striped bordered hover>
          <thead>
    <tr>

      <th >Period</th>
      <th >Annualized Return, Unhedged</th>
      <th >Annualized Return, Hedged</th>
      <th >Drawdown, Unhedged</th>
      <th >Drawdown, Hedged</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      
      <td>
	      <a 
	      href="https://stocksmaps.com/blog/arkk-momentum?start=1420070400&end=1451520000&ema1=5&ema2=7&ema3=50#results"
	      target="_blank">
	      From {(new Date(1420070400*1000)).toLocaleDateString("en-US")} to {(new Date(1451520000*1000)).toLocaleDateString("en-US")}
	      </a>
      </td>
      <td>+0.2%</td>
      <td>+0.7%</td>
      <td>−16.6%</td>
      <td>−7.8%</td>

    </tr>
        <tr>
      <td>
	      <a 
		      href="https://stocksmaps.com/blog/arkk-momentum?start=1451606400&end=1483142400&ema1=5&ema2=7&ema3=50#results"
		      target="_blank">
		      From {(new Date(1451606400*1000)).toLocaleDateString("en-US")} to {(new Date(1483142400*1000)).toLocaleDateString("en-US")}
		  </a>
	  </td>
      <td>+15.9%</td>
      <td>+17.5%</td>
      <td>−14.3%</td>
      <td>−7.5%</td>

    </tr>
    <tr>
      <td>
      	      <a 
		      href="https://stocksmaps.com/blog/arkk-momentum?start=1483228800&end=1514678400&ema1=5&ema2=7&ema3=50#results"
		      target="_blank">
		      From {(new Date(1483228800*1000)).toLocaleDateString("en-US")} to {(new Date(1514678400*1000)).toLocaleDateString("en-US")}
		  </a>

      </td>
      <td>+77.3%</td>
      <td>+77.3%</td>
      <td>−7.2%</td>
      <td>−7.2%</td>

    </tr>
    <tr>
      <td>
      	
      		      <a 
		      href="https://stocksmaps.com/blog/arkk-momentum?start=1514764800&end=1546214400&ema1=5&ema2=7&ema3=50#results"
		      target="_blank">
		      From {(new Date(1514764800*1000)).toLocaleDateString("en-US")} to {(new Date(1546214400*1000)).toLocaleDateString("en-US")}
		  </a>
      </td>
      <td>−20.6%</td>
      <td>−10.7%</td>
      <td>−28.9%</td>
      <td>−12.6%</td>
    </tr>
    <tr>
      <td>
      	
      		      <a 
		      href="https://stocksmaps.com/blog/arkk-momentum?start=1546300800&end=1577750400&ema1=5&ema2=7&ema3=50#results"
		      target="_blank">
		      From {(new Date(1546300800*1000)).toLocaleDateString("en-US")} to {(new Date(1577750400*1000)).toLocaleDateString("en-US")}
		  </a>
      </td>
      <td>+8.4%</td>
      <td>+19.5%</td>
      <td>−18.6%</td>
      <td>−14.1%</td>
    </tr>
    <tr>
      <td>
      	
      		      <a 
		      href="https://stocksmaps.com/blog/arkk-momentum?start=1577836800&end=1609372800&ema1=5&ema2=7&ema3=50#results"
		      target="_blank">
		      From {(new Date(1577836800*1000)).toLocaleDateString("en-US")} to {(new Date(1609372800*1000)).toLocaleDateString("en-US")}
		  </a>
      </td>
      <td>+294.2%</td>
      <td>+214.4%</td>
      <td>−14.5%</td>
      <td>−15.8%</td>
    </tr>
        <tr>
      <td>
      	
      		      <a 
		      href="https://stocksmaps.com/blog/arkk-momentum?start=1609459200&end=1640908800&ema1=5&ema2=7&ema3=50#results"
		      target="_blank">
		      From {(new Date(1609459200*1000)).toLocaleDateString("en-US")} to {(new Date(1640908800*1000)).toLocaleDateString("en-US")}
		  </a>
      </td>
      <td>−28.5%</td>
      <td>−15.3%</td>
      <td>−29.8%</td>
      <td>−18.8%</td>
    </tr>
  </tbody>

</Table>*/}

<p>The results above are based on 5-day, 7-day and 50-day EMAs but you might be interested in other parameters for EMAs. 
Also, the performance of the hedging strategy varies with time. 
So, I’ve included the <b>form below where you can <span className="text-primary">do your own backtest</span></b>. 
You can pick your own EMA parameters and the backtest period. <b>Can you achieve better investment returns and drawdowns?</b></p>
<hr/>
    <h1 className="text-primary mt-3 mb-3">Choose Your Own Backtest Parameters:</h1>


{/*
<Card style={{backgroundColor:'blue'}}>

<Card.Body align="center">
<Card.Title>Short-Term EMA Parameter 1</Card.Title>
</Card.Body>
</Card>
*/}

  	<Form className="mt-2 mb-2">
      <Form.Group as={Row}>
        <Col lg="5" align="center">
          <h2><Badge>Short-Term EMA Parameter 1</Badge></h2>
        </Col>

        <Col lg="1">
          <Form.Control value={ema1} onChange={e => setEma1(e.target.value)}/>
        </Col>


        <Col lg="6" align='center'>
          <Form.Range 
            value={ema1}
            onChange={e => setEma1(e.target.value)}
            min={2} max={200} step={1}
          />
        </Col>

      </Form.Group>


    </Form>


  	<Form className="mt-2 mb-2">
      <Form.Group as={Row}>


        <Col lg="5" align="center" >
          <h2><Badge>Short-Term EMA Parameter 2</Badge></h2>
        </Col>

        <Col lg="1">
          <Form.Control value={ema2} onChange={e => setEma2(e.target.value)}/>
        </Col>


        <Col lg="6" align='center' >
          <Form.Range 
            value={ema2}
            onChange={e => setEma2(e.target.value)}
            min={2} max={200} step={1}
          />
        </Col>

      </Form.Group>


    </Form>




  	<Form className="mt-2 mb-2">

      <Form.Group as={Row}>
        <Col lg="5" align="center">
          <h2><Badge>Medium-Term EMA Parameter</Badge></h2>
        </Col>

        <Col lg="1">
          <Form.Control value={ema3} onChange={e => setEma3(e.target.value)}/>
        </Col>


        <Col lg="6" align='center'>
          <Form.Range 
            value={ema3}
            onChange={e => setEma3(e.target.value)}
            min={2} max={200} step={1}
          />
        </Col>

      </Form.Group>



    </Form>





<Row className="mt-2 mb-2">


	<Col align='center' lg="5">

      <h2><Badge>Period Start</Badge></h2>



      </Col>

      <Col align='center' lg="3">

            
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        maxDate={endDate}
        popperPlacement="bottom"
      />


      </Col>
            <Col align='center' lg="4">

      </Col>
</Row>


<Row className="mt-2 mb-2">
	<Col align='center' lg="5" >

      <h2><Badge>Period End</Badge></h2>

      </Col>

      <Col align='center' lg="3">

      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        minDate={startDate}
        popperPlacement="bottom"
      />

      </Col>
      <Col align='center' lg="4">

      </Col>
</Row>
<br/>

<Row>
	<Col align='center'>

<div className="d-grid gap-2 mb-5 mt-5">
  <Button variant="primary" size="lg" 
  	disabled={loading}

  	onClick={loading ? null : sendRequest}>
    {loading? "Loading..." : "Run Backtest"}
  </Button>

</div>

          </Col>
</Row>


<br/>

  <hr/>


  <h1 id="results">Your Backtest Results:</h1>



<Row className='mb-4 mt-4'>
<Col lg={6}>
        <Table responsive striped bordered hover>
  <thead>
    <tr>

      <th>Strategy</th>
      <th className="text-primary">Total Return</th>
      <th className="text-primary">Annualized Return</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td >Simple Long</td>
      <td className="text-primary">{f(crl[0])}</td>
      <td className="text-primary">{f(crl[1])}</td>
    </tr>
    <tr>
      <td>Long With Hedging</td>
      <td className="text-primary">{f(crh[0])}</td>
      <td className="text-primary">{f(crh[1])}</td>
    </tr>
  </tbody>
</Table>
    </Col>
    <Col lg={6}>
    {loading?<Spinner animation="border"/>:<Image fluid src={src2}/>}
    </Col>
    </Row>


    <Row className='mb-4 mt-4'>

    <Col lg={6}>

        <Table responsive striped bordered hover>

  <tbody>
    <tr>
      <td className="text-primary"><b>Drawdown</b>, Simple Long</td>
      <td className="text-primary">{f(mdl)}</td>

    </tr>
     <tr>
      <td className="text-primary"><b>Drawdown</b>, Long With Hedging</td>
      <td className="text-primary">{f(mdh)}</td>
    </tr>
  </tbody>

</Table>
   
    </Col>

    <Col lg={6}>
         {loading?<Spinner animation="border"/>:<Image fluid src={src3}/>}
    </Col>

    </Row>



    <Row className='mb-4 mt-4'>

    <Col lg={6}>

        <Table responsive striped bordered hover>
          <thead>
    <tr>

      <th colSpan={2}>Backtest Parameters</th>

    </tr>
  </thead>

  <tbody>
    <tr>
      <td>Period Start</td>
      <td>{(new Date(parameters.start*1000)).toLocaleDateString("en-US")}</td>

    </tr>
        <tr>
      <td>Period End</td>
      <td>{(new Date(parameters.end*1000)).toLocaleDateString("en-US")}</td>

    </tr>
    <tr>
      <td>EMA Parameter 1</td>
      <td>{parameters.ema1}</td>

    </tr>
    <tr>
      <td>EMA Parameter 2</td>
      <td>{parameters.ema2}</td>
    </tr>
    <tr>
      <td>EMA Parameter 3</td>
      <td>{parameters.ema3}</td>
    </tr>
  </tbody>

</Table>
   
    </Col>

    <Col lg={6}>
         {loading?<Spinner animation="border"/>:<Image fluid src={src1}/>}
    </Col>
    
    </Row>


<br/>

{/*<Subscribe/>
<br/>*/}
{/*</Col>
<Col lg={3}/>*/}


    	<Card>
    		<Card.Body>
    		<Subscribe idProp="2"/>
    		</Card.Body>
    	</Card>





</Row>
</Container>
</>;
}