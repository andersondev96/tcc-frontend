import React from 'react';
import { Routes, Route } from 'react-router-dom';


import { Business } from "../pages/client/Business";
import { Service } from "../pages/client/Service";
import { Home } from "../pages/client/Home";
import { EditProfile } from "../pages/client/Profile/EditProfile";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Welcome } from "../pages/Welcome";
import { Favorites } from "../pages/client/Favorites/Favorites";
import { Budget } from "../pages/client/Budget";
import { BudgetDetails } from "../pages/client/Budget/BudgetDetails";
import { Dashboard } from "../pages/entrepreneur/Dashboard";
import { BusinessEntrepreneur } from "../pages/entrepreneur/BusinessEntrepreneur";
import { BusinessCreate } from "../pages/entrepreneur/BusinessEntrepreneur/create";
import { ServicesEntrepreneur } from "../pages/entrepreneur/ServicesEntrepreneur";
import { CreateServicesEntrepreneur } from "../pages/entrepreneur/ServicesEntrepreneur/create";
import { ShowServicesEntrepreneur } from "../pages/entrepreneur/ServicesEntrepreneur/show";
import { ClientsEntrepreneur } from "../pages/entrepreneur/ClientsEntrepreneur";
import { BudgetEntrepreneur } from "../pages/entrepreneur/BudgetEntrepreneur";
import { DetailsBudgetEntrepreneur } from "../pages/entrepreneur/BudgetEntrepreneur/DetailsBudgetEntrepreneur";
import { CreateProposal } from "../pages/entrepreneur/BudgetEntrepreneur/CreateProposal";
import { ChatEntrepreneur } from "../pages/entrepreneur/ChatEntrepreneur";
import { ChatMessageEntrepreneur } from "../pages/entrepreneur/ChatEntrepreneur/ChatMessageEntrepreneur";
import { Settings } from "../pages/entrepreneur/Settings";

export const Router: React.FC = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/business" element={<Business />} />
            <Route path="/service" element={<Service />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/budget/details" element={<BudgetDetails />} />

            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/business" element={<BusinessEntrepreneur />} />
            <Route path="/admin/business/create" element={<BusinessCreate />} />
            <Route path="/admin/services" element={<ServicesEntrepreneur />} />
            <Route path="/admin/create" element={<CreateServicesEntrepreneur />} />
            <Route path="/admin/services/show" element={<ShowServicesEntrepreneur />} />
            <Route path="/admin/clients" element={<ClientsEntrepreneur />} />
            <Route path="/admin/budget" element={<BudgetEntrepreneur />} />
            <Route path="/admin/budget/details" element={<DetailsBudgetEntrepreneur />} />
            <Route path="/admin/budget/create-proposal" element={<CreateProposal />} />
            <Route path="/admin/chat" element={<ChatEntrepreneur />} />
            <Route path="/admin/chat/message" element={<ChatMessageEntrepreneur />} />
            <Route path="/admin/settings" element={<Settings />} />
        </Routes>
    );
};
