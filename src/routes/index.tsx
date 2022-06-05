import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from '../pages/Clients/Home';
import { Start } from "../pages/Start";
import { SelectUser } from "../pages/Start/SelectUser";
import { Login } from "../pages/Start/Login";
import { NewAccount } from "../pages/Start/NewAccount";
import { NewEntrepreneur } from "../pages/Entrepreneurs/NewEntrepreneur";
import { SearchResults } from '../pages/Clients/SearchResults';
import { AdvancedSearch } from "../pages/Clients/Business/Search/AdvancedSearch";
import { Business } from "../pages/Clients/Business";
import { Service } from "../pages/Clients/Service";

 export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home />}/>
        <Route path="/results" element={<SearchResults />}/>
        <Route path="/advanced-search" element={<AdvancedSearch />}/>
        <Route path="/business" element={<Business />}/>
        <Route path="business/service" element={<Service />}/>
        <Route path="/start" element={<Start />}/>
        <Route path="start/select" element={<SelectUser />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/new-user" element={<NewAccount />}/>
        <Route path="/new-entrepreneur" element={<NewEntrepreneur />}/>
      </Routes>
    </BrowserRouter>
  );
 };
