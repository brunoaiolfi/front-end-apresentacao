import { Button } from "@chakra-ui/react";
import { ImExit } from "react-icons/im";
import { useAuth } from "../../hooks/useAuth";

export function LogoutButton() {

    const { handleSaveUserLogged } = useAuth();

    async function handleLogOut() {
        handleSaveUserLogged();
    }

    return (
        <Button
            size={'sm'}
            colorScheme='red'
            aria-label='Search database'
            leftIcon={<ImExit />}
            onClick={handleLogOut}
        >
            Desconectar
        </Button>
    )
}