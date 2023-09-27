import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { api } from "../../../infra/api";
import { User } from "../../../@types/user";
import { toast } from 'react-toastify';
import { ImBin } from "react-icons/im";

interface ModalUsuarioProps {
    visible: boolean;
    onChangeVisibility: () => void;
    user: User;
    callback: (user: User) => void;
}

export function ModalDeleteUsuario({ visible = false, onChangeVisibility, callback, user }: ModalUsuarioProps) {

    async function handleDelete() {
        try {
            await api.delete(`/users/delete/byId/${user.id}`);
            toast.success('Usuário deletado com sucesso!');
            callback(user);
        } catch (error: any) {
            toast.error(error?.response?.data ?? 'Falha na conexão')
        } finally {
            onChangeVisibility();
        }
    }
    return (
        <Modal isOpen={visible} onClose={onChangeVisibility} isCentered>
            <ModalOverlay />
            <ModalContent
                bg={'red.500'}
                width="100%"
                height={320}
                maxWidth="380px"
            >
                <ModalBody
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <ImBin size={120} color="white" />
                    <ModalHeader color="white" textAlign={'center'}>
                        Tem certeza que deseja deletar o usuário {user?.name}?
                    </ModalHeader>
                    <ModalCloseButton />

                    <Flex
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        mt={4}
                    >
                        <Button
                            onClick={onChangeVisibility}
                            bg="red.500"
                            color="white"
                        >
                            Cancelar
                        </Button>
                        <Button
                            ml={4}
                            bg="white"
                            color="red.500"
                            _hover={{
                                bg: 'red.500',
                                color: 'white'
                            }}
                        >
                            <Text
                                onClick={handleDelete}
                                fontWeight="bold"
                                fontSize={18}
                            >
                                Deletar
                            </Text>
                        </Button>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}