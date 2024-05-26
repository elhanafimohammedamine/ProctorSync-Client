import {createBrowserRouter} from "react-router-dom";
import App from "@/App";
import DefaultLayoutAdmin from "@/layout/DefaultLayoutAdmin.tsx";
import ProfessorsPage from "@/pages/ProfessorsPage.tsx";
import PedagogicalElements from "@/pages/PedagogicalElements.tsx";




export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <DefaultLayoutAdmin/>,
                children: [
                    {path: "enseignants", element: <ProfessorsPage/>},
                    {path: "modules", element: <PedagogicalElements/>},

                ]
            },
        ]
    },
]);