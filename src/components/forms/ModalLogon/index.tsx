import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../../infra/api";
import { User } from "../../../@types/user";
import { toast } from 'react-toastify';
import { useState } from "react";

interface ModalLogonProps {
    visible: boolean;
    onChangeVisibility: () => void;
}

interface ILogon {
    name: string;
    username: string;
    password: string;
}

const schema = Yup.object().shape({
    name: Yup.string().min(5, 'Nome precisa ter no mínimo 5 caracteres!').required('Nome obrigatório'),
    username: Yup.string().min(5, 'Nome de usuário precisa ter no mínimo 5 caracteres!').required('Nome de usuário obrigatório'),
    password: Yup.string().min(5, 'Senha precisa ter no mínimo 5 caracteres!').required('Senha obrigatória'),
});

export function ModalLogon({ visible = false, onChangeVisibility }: ModalLogonProps) {

    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<ILogon>({
        resolver: yupResolver(schema)
    })

    async function handleLogon(dto: ILogon) {
        try {
            setIsLoading(true);
            const { data } = await api.post<User>('/users/create', dto);

            if (data.id) {
                toast.success('Usuário cadastrado com sucesso!')
                onChangeVisibility();
            }
        } catch (error: any) {
            toast.error(error.response.data)
        } finally {
            setIsLoading(false);
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
                <ModalHeader>Cadastrar usuário</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex
                        as="form"
                        onSubmit={handleSubmit(handleLogon)}
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
                                        required={true}
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