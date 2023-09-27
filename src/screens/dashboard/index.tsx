import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Flex,
    Button,
    Input,
} from '@chakra-ui/react'
import { Header } from "../../components/Header";
import { ImPlus, ImPencil, ImBin, ImSearch } from "react-icons/im";
import { User } from '../../@types/user';
import { useEffect, useState } from 'react';
import { api } from '../../infra/api';
import { toast } from 'react-toastify';
import { ModalCadastroUsuario } from '../../components/forms/ModalUsuario';
import { ModalDeleteUsuario } from '../../components/forms/ModalDeleteUsuario';

export function Dashboard() {

    const [users, setUsers] = useState<User[]>([])
    const [userSelected, setUserSelected] = useState<User | undefined>(undefined)
    const [name, setName] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [isModalCadastroVisible, setIsModalCadastroVisible] = useState(false)
    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false)

    useEffect(() => {
        handleGetUsers()
    }, [])

    async function handleGetUsers(name?: string) {
        setIsLoading(true)
        try {

            if (name) {
                const { data } = await api.get<User[]>(`/users/list/byName/${name}`);
                setUsers(data);
            } else {
                const { data } = await api.get<User[]>('/users/list/all');
                setUsers(data);
            }
        } catch (error: any) {
            toast.error(error?.response?.data ?? 'Falha na conexão')
        } finally {
            setIsLoading(false)
        }
    }

    function handleChangeModalCadastro() {
        setIsModalCadastroVisible(prev => !prev)
    }
   
    function handleChangeModalDelete() {
        setIsModalDeleteVisible(prev => !prev)
    }

    function cadastroCallback(user: User) {
        if (userSelected?.id) {
            setUsers(prev => prev.map(u => u.id === user.id ? user : u))
        } else {
            setUsers(prev => [...prev, user])
        }
        setUserSelected(undefined)
    }

    function deleteCallback(user: User) {
        setUsers(prev => prev.filter(u => u.id !== user.id))
        setUserSelected(undefined)
    }

    function handleEditUser(user: User) {
        setUserSelected(user)
        handleChangeModalCadastro()
    }

    function handleCadastrarUser() {
        setUserSelected(undefined)
        handleChangeModalCadastro()
    }

    function handleDeleteUser(user: User) {
        setUserSelected(user)
        handleChangeModalDelete()
    }

    return (
        <Flex
            width={'100vw'}
            height={'100vh'}
            flexDir={'column'}
        >
            <Header />

            <ModalCadastroUsuario 
                onChangeVisibility={handleChangeModalCadastro}
                visible={isModalCadastroVisible}
                callback={cadastroCallback}
                user={userSelected}
            />
            <ModalDeleteUsuario
                onChangeVisibility={handleChangeModalDelete}
                visible={isModalDeleteVisible}
                callback={deleteCallback}
                user={userSelected!}
            />
            <Flex
                width={'100%'}
                height={'100%'}
                p={4}
                flexDir={'column'}
                alignItems={'center'}
                justifyContent={'flex-start'}
            >
                <TableContainer
                    marginTop={12}
                >
                    <Flex
                        width={'100%'}
                        flexDir={'row'}
                        alignItems={'flex-end'}
                        justifyContent={'space-between'}
                        marginBottom={4}
                    >
                        <Flex
                            flexDir={'row'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            gap={2}
                        >
                            <Input
                                placeholder={'Pesquisar por nome de usuário'}
                                w={280}
                                size={'sm'}
                                marginRight={2}
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                            <Button
                                onClick={() => handleGetUsers(name.trim())}
                                colorScheme={'pink'}
                                size={'sm'}
                                isLoading={isLoading}
                            >
                                <ImSearch />
                            </Button>
                        </Flex>
                        <Button
                            onClick={handleCadastrarUser}
                            colorScheme={'pink'}
                            size={'sm'}
                            rightIcon={<ImPlus />}
                        >
                            Cadastrar
                        </Button>
                    </Flex>

                    <Table variant='simple'>
                        <TableCaption>Tabela de usuários cadastrados</TableCaption>
                        <Thead>
                            <Tr>
                                <Th isNumeric>id</Th>
                                <Th>Nome</Th>
                                <Th>Nome de usuário</Th>
                                <Th>Senha</Th>
                                <Th>Ações</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                users?.map((user) => (
                                    <Tr>
                                        <Td isNumeric>{user.id}</Td>
                                        <Td>{user.name}</Td>
                                        <Td>{user.username}</Td>
                                        <Td>{user?.password || '*******'}</Td>
                                        <Td>
                                            <Flex
                                                gap={2}
                                            >
                                                <Button
                                                    onClick={() => handleEditUser(user)}
                                                    colorScheme='yellow'
                                                    size='sm'
                                                    >
                                                    <ImPencil />
                                                </Button>
                                                <Button
                                                    onClick={() => handleDeleteUser(user)}
                                                    colorScheme='red'
                                                    size='sm'
                                                >
                                                    <ImBin />
                                                </Button>
                                            </Flex>
                                        </Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
        </Flex>
    )
}