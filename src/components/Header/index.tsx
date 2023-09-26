import { Flex } from "@chakra-ui/react";
import { HeaderTitle } from "./Title";
import { LogoutButton } from "../LogoutButton";

export function Header() {
    return (
        <Flex
            justifyContent={'space-between'}
            alignItems={'center'}
            direction={'row'}
            width={'100%'}
            p={4}
        >
            <HeaderTitle title={'DashBoard'} />
            <LogoutButton />
        </Flex>
    )
}