import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../../infra/api";
import { User } from "../../../@types/user";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";

interface ModalUsuarioProps {
    visible: boolean;
    onChangeVisibility: () => void;
    user?: User;
    callback?: (user: User) => void;
}

interface ICadastroUsuario {
    name?: string;
    username?: string;
    password?: string;
}

export function ModalCadastroUsuario({ visible = false, onChangeVisibility, callback, user }: ModalUsuarioProps) {

    const schema = Yup.object().shape({
        name: Yup.string().min(5, 'Nome precisa ter no mínimo 5 caracteres!'),
        username: Yup.string().min(5, 'Nome de usuário precisa ter no mínimo 5 caracteres!'),
        password: Yup.string().min(!!!user?.id ? 5 : 0, 'Senha precisa ter no mínimo 5 caracteres!'),
    });

    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, formState: { errors }, setValue } = useForm<ICadastroUsuario>({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        if (user) {
            setValue('name', user?.name)
            setValue('username', user?.username)
            setValue('password', user?.password)
        }
    }, [user])

    async function handleCadastro(dto: ICadastroUsuario) {
        try {
            setIsLoading(true);

            const data = user ? await editar(dto) : await cadastro(dto);

            if (callback) {
                callback(data);
            }
        } catch (error: any) {
            toast.error(error?.response?.data)
        } finally {
            setIsLoading(false);
        }
    }

    async function cadastro(dto: ICadastroUsuario) {
        try {
            const { data } = await api.post<User>('/users/create', dto);

            if (data.id) {
                toast.success('Usuário cadastrado com sucesso!')
                onChangeVisibility();
            }

            return data
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async function editar(dto: ICadastroUsuario) {
        try {
            const { data } = await api.put<User>(`/users/update/${user?.id}`, dto);

            if (data.id) {
                toast.success('Usuário editado com sucesso!')
                onChangeVisibility();
            }

            return data
        } catch (error: any) {
            throw new Error(error)
        }
    }

    return (
        <Modal isOpen={visible} onClose={onChangeVisibility} isCentered>
            <ModalOverlay />
            <ModalContent
                bg={'gray.800'}
                width="100%"
                maxWidth="380px"
            >
                <ModalHeader>{user?.id ? 'Editar' : 'Cadastrar'} usuário</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex
                        as="form"
                        onSubmit={handleSubmit(handleCadastro)}
                        background="gray.800"
                        flexDirection="column"
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Box
                            width={'100%'}
                        >
                            <Text
                                fontSize={'sm'}
                                color={'red.400'}
                                marginBottom={2}
                            >
                                {errors.name?.message}
                            </Text>
                            <Controller
                                control={control}
                                name="name"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        id="name"
                                        placeholder="Nome"
                                        isInvalid={Boolean(errors.name?.message)}
                                        errorBorderColor='red.300'
                                        required={true}
                                        defaultValue={user?.name}
                                    />
                                )}
                            />
                        </Box>
                        <Box
                            marginTop={4}
                            width={'100%'}
                        >
                            <Text
                                fontSize={'sm'}
                                color={'red.400'}
                                marginBottom={2}
                            >
                                {errors.name?.message}
                            </Text>
                            <Controller
                                control={control}
                                name="username"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        id="username"
                                        placeholder="Nome de usuário"
                                        isInvalid={Boolean(errors.username?.message)}
                                        errorBorderColor='red.300'
                                        required={true}
                                        defaultValue={user?.username}
                                    />
                                )}
                            />
                        </Box>
                        <Box
                            marginTop={4}
                            width={'100%'}
                        >
                            <Text
                                fontSize={'sm'}
                                color={'red.400'}
                                marginBottom={2}
                            >
                                {errors.name?.message}
                            </Text>
                            <Controller
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="password"
                                        id="password"
                                        placeholder="Senha"
                                        isInvalid={Boolean(errors.password?.message)}
                                        errorBorderColor='red.300'
                                        required={!!!user?.id}
                                        defaultValue={user?.password}
                                    />
                                )}
                            />
                        </Box>
                        <Box
                            marginBottom={8}
                            marginTop={8}
                            width={'100%'}
                        >
                            <Button
                                type="submit"
                                width={'100%'}
                                colorScheme={'pink'}
                                size={'lg'}
                                isLoading={isLoading}
                            >
                                Salvar
                            </Button>
                        </Box>

                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}