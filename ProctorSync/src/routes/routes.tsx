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



export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage/>},
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <DefaultLayoutAdmin/>,
                children: [
                    {path: "personnels", element: <PersonalPage/>},
                    {path: "modules", element: <PedagogicalElementsPage/>},
                    {path: "salles", element: <ClassroomsPage/>},
                    {path: "groupes", element: <ProfessorsGroupsPage/>},
                    {path: "groupe/membres", element: <GroupMembersPage/>},
                    {path: "test", element: <ExamSchedulingPage/>}
                ]
            },
        ]
    },
]);