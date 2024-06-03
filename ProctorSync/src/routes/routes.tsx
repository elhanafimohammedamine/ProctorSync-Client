import {createBrowserRouter} from "react-router-dom";
import App from "@/App";
import DefaultLayoutAdmin from "@/layout/DefaultLayoutAdmin.tsx";
import PedagogicalElementsPage from "@/pages/PedagogicalElementsPage.tsx";
import ClassroomsPage from "@/pages/ClassroomsPage.tsx";
import ProfessorsGroupsPage from "@/pages/ProfessorsGroupsPage.tsx";
import GroupMembersPage from "@/pages/GroupMembersPage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import PersonalPage from "@/pages/personalPage.tsx";
import ExamSchedulingPage from "@/pages/ExamSchedulingPage.tsx";
import ProtectedRoute from "./protected-routes";
import NotFoundPage from "@/pages/NotFoundPage";
import UnuthorizedPage from "@/pages/UnuthorizedPage";



export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/unauthorized",
        element: <UnuthorizedPage />
    },
    {
        path: "/",
        element: <ProtectedRoute allowedRole="ADMIN">
            <App />
        </ProtectedRoute>,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "",
                element: <DefaultLayoutAdmin/>,
                children: [
                    {
                        path: "personnels",
                        element:
                            <ProtectedRoute allowedRole="ADMIN">
                                <PersonalPage />
                            </ProtectedRoute>
                            
                    },
                    {
                        path: "modules",
                        element:
                            <ProtectedRoute allowedRole="ADMIN">
                                <PedagogicalElementsPage />
                            </ProtectedRoute>
                    },
                    {
                        path: "salles",
                        element:
                            <ProtectedRoute allowedRole="ADMIN">
                                <ClassroomsPage />
                            </ProtectedRoute>
                    },
                    {
                        path: "groupes",
                        element:
                            <ProtectedRoute allowedRole="ADMIN">
                                <ProfessorsGroupsPage />    
                            </ProtectedRoute>
                            
                    },
                    {
                        path: "groupe/membres",
                        element:
                            <ProtectedRoute allowedRole="ADMIN">
                                <GroupMembersPage />
                            </ProtectedRoute>
                    },
                    {
                        path: "nouveau-examen",
                        element:
                            <ProtectedRoute allowedRole="ADMIN">
                                <ExamSchedulingPage />
                            </ProtectedRoute>
                    }
                ]
            },
        ]
    },
]);