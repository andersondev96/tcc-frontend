import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {Home} from '../pages/Clients/Home';
import { Business } from "../pages/Clients/Business";
import { Service } from "../pages/Clients/Service";

 export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home />}/>
        <Route path="/business" element={<Business />}/>
        <Route path="/service" element={<Service />}/>
      </Routes>
    </BrowserRouter>
  );
 };
