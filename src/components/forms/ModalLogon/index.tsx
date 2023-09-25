import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

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
    name: Yup.string().required('Nome obrigatório'),
    username: Yup.string().required('Nome de usuário obrigatório'),
    password: Yup.string().required('Senha obrigatória'),
});

export function ModalLogon({ visible = false, onChangeVisibility }: ModalLogonProps) {

    const { control, handleSubmit, formState: { errors } } = useForm<ILogon>({
        resolver: yupResolver(schema)
    })

    async function handleLogon(dto: ILogon) {
        console.log(dto);
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
                            >
                                Entrar
                            </Button>
                        </Box>

                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}