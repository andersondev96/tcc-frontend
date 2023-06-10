import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';


import { RequireAuth } from '../hooks/RequireAuth';
import { ForgotPassword } from '../pages/ForgotPassword';
import { ResetPassword } from '../pages/ResetPassword';
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
import { EditProposal } from '../pages/entrepreneur/BudgetEntrepreneur/EditProposal';
import { BusinessEntrepreneur } from "../pages/entrepreneur/BusinessEntrepreneur";
import { BusinessCreate } from "../pages/entrepreneur/BusinessEntrepreneur/create";
import { BusinessEdit } from '../pages/entrepreneur/BusinessEntrepreneur/edit';
import { ChatEntrepreneur } from "../pages/entrepreneur/ChatEntrepreneur";
import { ClientsEntrepreneur } from "../pages/entrepreneur/ClientsEntrepreneur";
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
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/business/:id" element={<Business />} />
            <Route path="/services/:company_id" element={<Service />} />

            <Route
                path="/profile"
                element={
                    <RequireAuth>
                        <EditProfile />
                    </RequireAuth>
                }
            />

            <Route
                path="/favorites"
                element={
                    <RequireAuth>
                        <Favorites />
                    </RequireAuth>
                }
            />

            <Route
                path="/budget"
                element={
                    <RequireAuth>
                        <Budget />
                    </RequireAuth>
                }
            />

            <Route
                path="/budget/details/:proposal_id"
                element={
                    <RequireAuth>
                        <BudgetDetails />
                    </RequireAuth>
                }
            />

            <Route path="admin">
                <Route
                    path="/admin/business"
                    element={
                        <RequireAuth>
                            <BusinessEntrepreneur />
                        </RequireAuth>
                    }
                />

                <Route
                    path="/admin/business/create"
                    element={
                        <RequireAuth>
                            <BusinessCreate />
                        </RequireAuth>
                    }
                />

                <Route
                    path="/admin/business/edit/:id"
                    element={
                        <RequireAuth>
                            <BusinessEdit />
                        </RequireAuth>
                    }
                />

                <Route
                    path="/admin/services"
                    element={
                        <RequireAuth>
                            <ServicesEntrepreneur />
                        </RequireAuth>
                    }
                />

                <Route
                    path="/admin/services/create"
                    element={
                        <RequireAuth>
                            <CreateServicesEntrepreneur />
                        </RequireAuth>
                    }
                />

                <Route
                    path="/admin/services/:id"
                    element={
                        <RequireAuth>
                            <ShowServicesEntrepreneur />
                        </RequireAuth>
                    }
                />

                <Route
                    path="/admin/services/edit/:id"
                    element={
                        <RequireAuth>
                            <EditServicesEntrepreneur />
                        </RequireAuth>
                    }
                />

                <Route
                    path="/admin/clients"
                    element={
                        <RequireAuth>
                            <ClientsEntrepreneur />
                        </RequireAuth>
                    }
                />

                <Route
                    path="/admin/budget"
                    element={
                        <RequireAuth>
                            <BudgetEntrepreneur />
                        </RequireAuth>
                    }
                />

                <Route
                    path="/admin/budget/details/:proposal_id"
                    element={
                        <RequireAuth>
                            <DetailsBudgetEntrepreneur />
                        </RequireAuth>
                    }
                />

                <Route
                    path="/admin/budget/create-proposal/:proposal_id"
                    element={
                        <RequireAuth>
                            <CreateProposal />
                        </RequireAuth>
                    }
                />

                <Route
                    path="/admin/budget/edit-proposal/:proposal_id"
                    element={
                        <RequireAuth>
                            <EditProposal />
                        </RequireAuth>
                    }
                />

                <Route
                    path="/admin/chat"
                    element={
                        <RequireAuth>
                            <ChatEntrepreneur />
                        </RequireAuth>
                    }
                />

                <Route
                    path="/admin/settings"
                    element={
                        <RequireAuth>
                            <Settings />
                        </RequireAuth>
                    }
                />
            </Route>

            <Route path="*" element={<Home />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    );
};
