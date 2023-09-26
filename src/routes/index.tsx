import {
    BrowserRouter,
    Routes as RouterRoutes,
    Route,
    Navigate
} from "react-router-dom";
import { Auth } from "../screens/auth";
import { Dashboard } from "../screens/dashboard";
import { useAuth } from "../hooks/useAuth";

export function Routes() {
    const { userLogged } = useAuth();

    return (
        <BrowserRouter>
            <RouterRoutes>
                {
                    !userLogged?.token &&
                    <Route path="/*" element={<Auth />} />
                }
                <Route path="/*" element={<Dashboard />} />

            </RouterRoutes>

        </BrowserRouter>
    )
}