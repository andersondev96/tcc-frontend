import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {Home} from '../pages/Clients/Home';
import { Business } from "../pages/Clients/Business";

 export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home />}/>
        <Route path="/business" element={<Business />}/>
      </Routes>
    </BrowserRouter>
  );
 };
