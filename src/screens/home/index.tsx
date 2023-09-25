import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { HeaderTitle } from "../../components/Header/Title";
import { useState } from "react";
import { ModalLogon } from "../../components/forms/ModalLogon";

export function Home() {
    const [isModalLogonVisible, setIsModalLogonVisible] = useState(false);

    function handleChangeModalVisibility() {
        setIsModalLogonVisible(prevState => !prevState);
    }

    return (
        <Flex
            width={'100vw'}
            height={'100vh'}
            flexDir={'column'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <ModalLogon 
                onChangeVisibility={handleChangeModalVisibility}
                visible={isModalLogonVisible}
            />
            <Flex
                as="form"
                width="100%"
                maxWidth="360px"
                background="gray.800"
                padding="8"
                borderRadius={8}
                flexDirection="column"
                justifyContent={'center'}
                alignItems={'center'}
            >
                <HeaderTitle title={'Login'} />

                <Box
                    marginTop={4}
                    width={'100%'}
                >
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Nome de usuário"
                    />
                </Box>
                <Box
                    marginTop={4}
                    width={'100%'}
                >
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Senha"
                    />
                </Box>
                <Box
                    marginTop={12}
                    width={'100%'}
                >
                    <Button
                        type="submit"
                        width={'100%'}
                        colorScheme={'pink'}
                        size={'lg'}
                    >
                        Entrar
                    </Button>
                    <Text
                        as="button"
                        type="button"
                        textAlign="center"
                        width={'100%'}
                        onClick={() => handleChangeModalVisibility()}
                        fontSize={14}
                        marginTop={4}
                    >
                        Não possui conta? <Text as="span" color="pink.500"> Cadastre-se aqui.</Text>
                    </Text>
                </Box>

            </Flex>
        </Flex>
    )
}