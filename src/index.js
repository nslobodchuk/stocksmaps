import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Swarm from "./Swarm";
import Pack from "./Pack";
import PackForce from "./PackForce";
import Blog from "./Blog";
import { StockMap } from './StockMap.js'; 
import StockMapWrap from './stock-map-wrap';
import BlogPost1 from './blog/post1';
import BlogPost2 from './blog/post2';
import BlogPost3 from './blog/post3';
import BlogPost4 from './blog/post4';

import Subscribe from './Subscribe';


ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          

          <Route path="*" element={<StockMapWrap />} >

                <Route
                  // path="/" 
                  element={<StockMap />}
                >

                              <Route
                                index
                                element={<Swarm />}
                              />
                              <Route path="swarm" element={<Swarm />} />
                              <Route path="pack" element={<Pack />} />
                              <Route path="packforce" element={<PackForce />} />
                              <Route path="*" element={<Swarm />} />

                </Route>
          </Route>
          <Route path="blog" element={<Blog />}>
            <Route path="arkk-momentum" element={<BlogPost1 />} />
            <Route path="arkk-arkw" element={<BlogPost2 />} />
            <Route path="arkk-long-short" element={<BlogPost3 />} />
            <Route path="snow-deceleration" element={<BlogPost4 />} />
          </Route>

          <Route path="subscribe" element={<Subscribe />}/>

          
        </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('app-root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
