import {createBrowserRouter} from "react-router-dom";
import App from "@/App";
import DefaultLayoutAdmin from "@/layout/DefaultLayoutAdmin.tsx";
import PedagogicalElements from "@/pages/PedagogicalElements.tsx";
import ClassRoomsPage from "@/pages/ClassRoomsPage.tsx";
import ProfessorsPage from "@/pages/ProfessorsPage.tsx";
import ProfessorsGroupsPage from "@/pages/ProfessorsGroupsPage.tsx";
import GroupMembersPage from "@/pages/GroupMembersPage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
<<<<<<< Updated upstream
import AdministratorsPage from "@/pages/administratorsPage.tsx";
=======
import ExamSchedulingPage from "@/pages/ExamSchedulingPage.tsx";
>>>>>>> Stashed changes


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
                    {path: "enseignants", element: <ProfessorsPage/>},
                    {path: "administrateurs", element: <AdministratorsPage/>},
                    {path: "modules", element: <PedagogicalElements/>},
                    {path: "salles", element: <ClassRoomsPage/>},
                    {path: "groupes", element: <ProfessorsGroupsPage/>},
                    {path: "groupe/membres", element: <GroupMembersPage/>},
                    {path: "test", element: <ExamSchedulingPage/>}
                ]
            },
        ]
    },
]);