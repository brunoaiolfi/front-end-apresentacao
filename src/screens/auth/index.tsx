import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { HeaderTitle } from "../../components/Header/Title";
import { useState } from "react";
import { ModalLogon } from "../../components/forms/ModalLogon";
import { useForm, Controller } from "react-hook-form";
import { User } from "../../@types/user";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { api } from "../../infra/api";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

interface LoginResponse extends User {
    token: string;
}

const schema = yup.object().shape({
    username: yup.string().required('Nome de usuário obrigatório'),
    password: yup.string().required('Senha obrigatória')
})

export function Auth() {

    const [isLoading, setIsLoading] = useState(false);
    const [isModalLogonVisible, setIsModalLogonVisible] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<Omit<User, 'id' | 'createdAt' | 'name'>>({
        resolver: yupResolver(schema)
    })

    const { handleSaveUserLogged } = useAuth()

    function handleChangeModalVisibility() {
        setIsModalLogonVisible(prevState => !prevState);
    }

    async function handleLogin(dto: Omit<User, 'id' | 'createdAt' | 'name'>) {
        setIsLoading(true);
        try {
            const { data } = await api.post<LoginResponse>('/users/auth', dto);

            handleSaveUserLogged(data)
            
            api.defaults.headers['Authorization'] = `Bearer ${data.token}`
            
            toast.success('Usuário logado com sucesso!')
        } catch (error: any) {
            toast.error(error?.response?.data ?? 'Falha na conexão')
        } finally {
            setIsLoading(false);
        }
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
                onSubmit={handleSubmit(handleLogin)}
            >
                <HeaderTitle title={'Login'} />
                <Box
                    marginTop={4}
                    width={'100%'}
                >
                    {
                        errors.username?.message && (
                            <Text
                                fontSize={'sm'}
                                color={'red.400'}
                                marginBottom={2}
                            >
                                {errors.username?.message}
                            </Text>
                        )
                    }
                    <Controller
                        control={control}
                        name="username"
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="text"
                                placeholder="Nome de usuário"
                                isInvalid={!!errors.username?.message}
                            />
                        )}
                    />
                </Box>
                <Box
                    marginTop={4}
                    width={'100%'}
                >
                    {
                        errors.password?.message && (
                            <Text
                                fontSize={'sm'}
                                color={'red.400'}
                                marginBottom={2}
                            >
                                {errors.password?.message}
                            </Text>
                        )
                    }
                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="password"
                                placeholder="Senha"
                                isInvalid={!!errors.password?.message}
                            />
                        )}
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
                        isLoading={isLoading}
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