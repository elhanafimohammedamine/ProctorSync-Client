import {createBrowserRouter} from "react-router-dom";
import App from "@/App";
import DefaultLayoutAdmin from "@/layout/DefaultLayoutAdmin.tsx";
import StaffPage from "@/pages/StaffPage.tsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/home",
                element: <DefaultLayoutAdmin/>,
                children: [
                    {path: "staff", element: <StaffPage/>}
                ]
            },
        ]
    },
]);