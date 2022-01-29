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

import Beeswarm from "./Beeswarm";
import CirclePack from "./CirclePack";

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route
          index
          element={<Beeswarm />}
          />
          <Route path="swarm" element={<Beeswarm />} />
          <Route path="pack" element={<CirclePack />} />
          <Route path="*" element={<Beeswarm />} />

        </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
