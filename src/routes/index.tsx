import React from 'react';
import { Route, Routes } from 'react-router-dom';


import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Budget } from "../pages/client/Budget";
import { BudgetDetails } from "../pages/client/Budget/BudgetDetails";
import { Business } from "../pages/client/Business";
import { Favorites } from "../pages/client/Favorites/Favorites";
import { Home } from "../pages/client/Home";
import { EditProfile } from "../pages/client/Profile/EditProfile";
import { Service } from "../pages/client/Service";
import { BudgetEntrepreneur } from "../pages/entrepreneur/BudgetEntrepreneur";
import { CreateProposal } from "../pages/entrepreneur/BudgetEntrepreneur/CreateProposal";
import { DetailsBudgetEntrepreneur } from "../pages/entrepreneur/BudgetEntrepreneur/DetailsBudgetEntrepreneur";
import { BusinessEntrepreneur } from "../pages/entrepreneur/BusinessEntrepreneur";
import { BusinessCreate } from "../pages/entrepreneur/BusinessEntrepreneur/create";
import { BusinessEdit } from '../pages/entrepreneur/BusinessEntrepreneur/edit';
import { ChatEntrepreneur } from "../pages/entrepreneur/ChatEntrepreneur";
import { ChatMessageEntrepreneur } from "../pages/entrepreneur/ChatEntrepreneur/ChatMessageEntrepreneur";
import { ClientsEntrepreneur } from "../pages/entrepreneur/ClientsEntrepreneur";
import { Dashboard } from "../pages/entrepreneur/Dashboard";
import { ServicesEntrepreneur } from "../pages/entrepreneur/ServicesEntrepreneur";
import { CreateServicesEntrepreneur } from "../pages/entrepreneur/ServicesEntrepreneur/create";
import { EditServicesEntrepreneur } from '../pages/entrepreneur/ServicesEntrepreneur/edit';
import { ShowServicesEntrepreneur } from "../pages/entrepreneur/ServicesEntrepreneur/show";
import { Settings } from "../pages/entrepreneur/Settings";

export const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/business/:id" element={<Business />} />
            <Route path="/services/:company_id" element={<Service />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/budget/details" element={<BudgetDetails />} />

            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/business" element={<BusinessEntrepreneur />} />
            <Route path="/admin/business/create" element={<BusinessCreate />} />
            <Route path="/admin/business/edit/:id" element={<BusinessEdit />} />
            <Route path="/admin/services" element={<ServicesEntrepreneur />} />
            <Route path="/admin/services/create" element={<CreateServicesEntrepreneur />} />
            <Route path="/admin/services/:id" element={<ShowServicesEntrepreneur />} />
            <Route path="/admin/services/edit/:id" element={<EditServicesEntrepreneur />} />
            <Route path="/admin/clients" element={<ClientsEntrepreneur />} />
            <Route path="/admin/budget" element={<BudgetEntrepreneur />} />
            <Route path="/admin/budget/details/:proposal_id" element={<DetailsBudgetEntrepreneur />} />
            <Route path="/admin/budget/create-proposal/:proposal_id" element={<CreateProposal />} />
            <Route path="/admin/chat" element={<ChatEntrepreneur />} />
            <Route path="/admin/chat/message" element={<ChatMessageEntrepreneur />} />
            <Route path="/admin/settings" element={<Settings />} />
        </Routes>
    );
};
