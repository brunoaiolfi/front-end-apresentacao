import { Flex, Text } from "@chakra-ui/react";
import { Header } from "../../components/Header";

export function Dashboard() {
    return (
        <Flex
            width={'100vw'}
            height={'100vh'}
            flexDir={'column'}

        >
            <Header />
            <Text>DashBoard</Text>
        </Flex>
    )
}