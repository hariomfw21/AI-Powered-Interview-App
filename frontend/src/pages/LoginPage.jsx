import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';

import { Link } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handlingCredentials = async ()=>{
        const body = {email, password}
        let result = await fetch('http://localhost:8998/user/login',{
            method: 'POST',
            body: JSON.stringify(body),
            headers:{
                'Content-type': 'application/json'
            }
        });
        if(result.ok){
            result = await result.json();
            console.log('login Successfull');
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + 4 * 60 * 60 * 1000);
            document.cookie = `token=${result.access_token}; ${expirationDate.toUTCString()}`
            onOpen();
            setTimeout(()=>{
                window.location.href='/';
            }, 3000);
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
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                <Stack align={'center'} mb={6}>
                    <Text fontSize={'2xl'}>
                        Login into your HackSquad account
                    </Text>
                </Stack>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" onChange={(e)=>setEmail(e.target.value)}/>
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" onChange={(e)=>setPassword(e.target.value)}/>
                        </FormControl>
                        <Stack spacing={5}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'end'}>
                                <Link style={{ color: 'blue' }}>Forgot password?</Link>
                            </Stack>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={handlingCredentials}
                            >
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack pt={4}>
                        <Text align={'center'}>
                            Need an account? <Link to='/register' style={{ color: "blue" }}>Register</Link>
                        </Text>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Login Successful</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                Welcome Back to HackSquad!!!
                Redirecting you to Home page in 3 seconds
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