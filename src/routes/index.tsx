import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {Home} from '../pages/Clients/Home';

 export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
 };
