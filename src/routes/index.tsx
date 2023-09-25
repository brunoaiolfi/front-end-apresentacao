import {
    BrowserRouter,
    Routes as RouterRoutes,
    Route
} from "react-router-dom";
import { Home } from "../screens/home";

export function Routes() {
    return (
        <BrowserRouter>
            <RouterRoutes>
                <Route path="/" element={<Home />} />
            </RouterRoutes>
        </BrowserRouter>
    )
}