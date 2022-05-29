import logo from './logo.svg';
import './App.css';
import { StockMap } from './StockMap.js';
import  Blog  from './Blog';
import {app} from './firebase.js';
import { 
  getAuth, 
  signInWithRedirect, 
  GoogleAuthProvider, 
  getRedirectResult 
} from "firebase/auth";

import { 
getFirestore,
doc, 
onSnapshot,
collection
} from "firebase/firestore";

import {useEffect, useState} from 'react';
import { Outlet, Link } from "react-router-dom";
import f from './chart/return-format';
import * as d3 from 'd3';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


 async function signIn() {
   // Sign in Firebase using popup auth and Google as the identity provider.
   var provider = new GoogleAuthProvider();
   await signInWithRedirect(getAuth(), provider);

   if (result) {
      // This is the signed-in user
      const user = result.user;
      // console.log(user);
    }
 }


async function result(){
   const result = await getRedirectResult(getAuth());
   // console.log(result.user);
};



function App() {

  const colorScale = d3.scaleSequential().domain([-5,5]).interpolator(d3.interpolateRdYlGn);
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



  return (
    

    // <div className="App">
<>

    <Navbar bg="dark" variant="dark">
    {/*<Col align='center'>*/}
      <Nav.Link as={Link} to="/" className="App-link fs-4">Home</Nav.Link>
      {/*</Col>*/}
      {/*<Col align='center'>*/}
      <Nav.Link as={Link} to="/blog" className="App-link fs-4">Blog</Nav.Link>
      {/*</Col>*/}

      <Nav.Link as={Link} to="/subscribe" className="App-link fs-4">Subscribe</Nav.Link>

    </Navbar>
    <br/>




{/*                <nav

        className="App-header"
      >
      <Link  to={'/'} className="App-link" >
        Stock Maps
       </Link>*/}



       {/* 

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
      </div>*/}

{/*      <Link  to={'blog'} className="App-link" >
        Blog
       </Link>
        
      </nav>*/}

{/*          <StockMap/>
          <Blog/>*/}

          <Outlet />



     {/*</div>*/}
    </>

  );
}

export default App;
