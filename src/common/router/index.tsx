import { RouteObject, useRoutes } from "react-router-dom";


//routes
import AuthenticationRoutes from "./LoginRoutes";
import MainRoutes from "./MainRoutes";
import RootPage from "../../pages/RootPage";

const rootPages: RouteObject = {
    path: '/',
    element: <RootPage />
}


// ================ || combine and render routes || ================
export default function ThemeRoutes() {
    return useRoutes([rootPages, AuthenticationRoutes, MainRoutes])
}