import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    useColorModeValue,
    useDisclosure
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handlingCredentials = async () => {
        const body = { name, email, password };
        let result = await fetch('http://localhost:8998/user/register', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json'
            }
        })
        if (result.ok) {
            onOpen();
            setTimeout(()=>{
                window.location.href='/login'
            }, 3000)
        }
    }

    return (
        <>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Box
                        rounded={'lg'}
                        w={"450px"}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack align={'center'}>
                            <Text fontSize={'2xl'} mb={6}>
                                Register to HackSquad
                            </Text>
                        </Stack>
                        <Stack spacing={4}>
                            <FormControl id='name' isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input type='text' onChange={(e) => setName(e.target.value)} />
                            </FormControl>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" onChange={(e) => setEmail(e.target.value)} />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    onClick={handlingCredentials}
                                >
                                    Register
                                </Button>
                            </Stack>
                            <Stack pt={3}>
                                <Text align={'center'}>
                                    Already a user? <Link to='/login' style={{ color: "blue" }}>Login</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Registration Complete</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Welcome to HackSquad!!!
                        Redirecting you to Login page in 3 seconds
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}