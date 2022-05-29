
import * as d3 from 'd3';

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

export default function BlogPost4(){

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
	<Row><h1>Snowflake (SNOW) Deceleration</h1></Row>
    <br/>



	<Row>
{/*	<Col lg={3}/>
	<Col lg={6}>*/}
	


    


            <Row className='mt-4 mb-4'>
<Col lg={5}>
    <p> Revenue growth has dropped to 85%. This is only slightly above NRRR, 174%. 
    Most revenue growth comes from the expansion within existing customers. 
    Number of customers growth has slowed down to 39% YoY.
    </p>
    <p>In the earnings release for Q1 2023 the management is guiding for a 66% growth in 2023. 
    A year ago, in the earnings release for Q1 2022, the guidance for 2022 was 90%.</p>

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



<Row className='mb-4 mt-4'>

    <Col>
    <Image fluid src='/assets/blog/4/SNOW.png'/>
    </Col>
    </Row>



    	<Card>
    		<Card.Body>
    		<Subscribe idProp="2"/>
    		</Card.Body>
    	</Card>





</Row>
</Container>
</>;
}