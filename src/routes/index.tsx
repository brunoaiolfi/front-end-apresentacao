import {
    BrowserRouter,
    Routes as RouterRoutes,
    Route
} from "react-router-dom";
import { Auth } from "../screens/auth";
import { Dashboard } from "../screens/dashboard";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { LoadingPage } from "../components/Loading/Page/LoadingPage";

export function Routes() {
    const { userLogged, handleGetUserLoggedFromStorageData } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        handleLoadStorageData()
    }, [])

    async function handleLoadStorageData() {
        setIsLoading(true);
        setTimeout(() => {
            handleGetUserLoggedFromStorageData().finally(() => setIsLoading(false))
        }, 300)

    }

    return (
        isLoading ? <LoadingPage /> :
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