
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
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";


function f(n){
	return n>0 ? ("+" + d3.format(".1f")(n*100) + "%") : (d3.format(".1f")(n*100) + "%");
}




//https://query1.finance.yahoo.com/v8/finance/chart/ARKK?formatted=true&lang=en-US&region=US&includeAdjustedClose=true&interval=1d&period1=0&period2=1643932800&events=capitalGain|div|split&useYfid=true

export default function BlogPost3(){

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

				fetch(`https://functions.yandexcloud.net/d4ebg4b7dn25ilr86n2h?start=${p1}&end=${p2}&ema1=${p3}&ema2=${p4}&ema3=${p5}`)
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

		const url = `https://functions.yandexcloud.net/d4ebg4b7dn25ilr86n2h?start=${date1}&end=${date2}&ema1=${ema1}&ema2=${ema2}&ema3=${ema3}`;

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
	<Row><h1>Swing Trading ARKK ETF</h1></Row>
    <br/>



	<Row>
{/*	<Col lg={3}/>
	<Col lg={6}>*/}
	


    


            <Row className='mt-4 mb-4'>
<Col lg={5}>
    <p>This is yet another variation on the blog post about <Link to="../arkk-momentum">hedging ARKK ETF</Link>. 
In that post I described a trading strategy when you exit your long position in ARKK whenever the trend turns down. 
In this post I present a slightly different trading strategy where you're <b>long ARKK during an uptrend and take a short position when the trend turns down</b> (as opposed to going to cash). 

    </p>

        <p><b>In the form below perform your backtest</b> by choosing the parameters of EMAs and the backtest period. 
    The output contains the comparison of a simple long and a long-short strategies. 
    The EMAs determine if the trend in ARKK ETF is down. 
    If the trend is down, the backtest goes short ARKK ETF.</p>

    </Col>
    <Col lg={7}>
      <Card>
        <Card.Body>
        <Subscribe idProp="1"/>
        </Card.Body>
      </Card>
    </Col>
    </Row>





<hr/>
    <h1 className="text-primary mt-3 mb-3">Choose Your Own Backtest Parameters:</h1>




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
      <td>Long-Short</td>
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
      <td className="text-primary"><b>Drawdown</b>, Long-Short</td>
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