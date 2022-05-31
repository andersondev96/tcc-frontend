import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {Home} from '../pages/Clients/Home';
import { Business } from "../pages/Clients/Business";
import { Service } from "../pages/Clients/Service";
import { Start } from "../pages/Start";
import { Login } from "../pages/Start/Login";
import { NewAccount } from "../pages/Start/NewAccount";

 export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home />}/>
        <Route path="/business" element={<Business />}/>
        <Route path="/service" element={<Service />}/>
        <Route path="/start" element={<Start />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/new-user" element={<NewAccount />}/>
      </Routes>
    </BrowserRouter>
  );
 };
