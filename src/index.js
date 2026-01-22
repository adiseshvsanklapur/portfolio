import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Goals from "./Goals";
import Layout from "./Layout";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/goals" element={<Goals />} />
      </Route>
    </Routes>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
