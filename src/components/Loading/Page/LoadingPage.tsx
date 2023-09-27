import { Flex, Spinner } from "@chakra-ui/react";

export function LoadingPage() {
    return (
        <Flex
            width={'100vw'}
            height={'100vh'}
            flexDir={'column'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Spinner 
                color={'pink.500'}
            />
        </Flex>
    )
}