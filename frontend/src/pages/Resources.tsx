import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import {
  Flex,
  Box,
  Center,
  Spacer,
  ButtonGroup,
  FormControl,
  Input,
  FormLabel,
  HStack,
  Button,
  useToast
} from "@chakra-ui/react"
import registerResourceUseCase from '../useCases/registerResourceUseCase';

function ResourcesPage()  {
  const history = useHistory();
  const toast = useToast()

  const handleHomeClick = () => {
    history.push('/');
  };

  const handleCustomerClick = () => {
    history.push('/customer');
  };

  const successToast = () => {
    toast({
      position: 'top-right',
      title: 'Resource registered.',
      description: "Resource registered successfully.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }
  const failToast = () => {
    toast({
      position: 'top-right',
      title: 'Resource not registered.',
      description: "Resource failed on registration.",
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
  }
  const [formValues, setFormValues] = useState({
    wallet: '',
    resourceIP: '',
    resourceUser: '',
    resourcePassword: '',
    resourcePrice: '',
    resourceSize: '',
  });

  const handleFormInputChange = (event) => {
    const { id, value } = event.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleRegisterResourceClick = async () => {
    try {
      const response = await registerResourceUseCase(formValues)
      
      if (response.statusText == 'Created') {
        successToast();
      }
      else{
        failToast();
      }
    } catch (error) {
      console.error(error);
      failToast();
    }
  };
    return (
    <Box h="100vh">
        <Center
            as="header"
            h={150}
            bg="teal.500"
            color="white"
            fontWeight="bold"
            fontSize="xxx-large"
            pb="8"
            >
            Resources
            <Spacer />
            <ButtonGroup gap='2'>
                <Button 
                onClick={handleCustomerClick}            
                w={120}
                p="5"
                bg="teal.400"
                color="white"
                fontWeight="bold"
                fontSize="xl"
                mt="1"
                _hover={{ bg: "teal.800"}}
                >
                        Buy
                </Button>
                <Button
                onClick={handleHomeClick}
                w={120}
                p="5"
                bg="teal.400"
                color="white"
                fontWeight="bold"
                fontSize="xl"
                mt="1"
                _hover={{ bg: "teal.800"}}
                >
                Home
                </Button>
            </ButtonGroup>
            </Center>
            <Flex
            align="center"
            justify="center"
            bg="blackAlpha.200"
            h="calc(110vh - 150px)"
            >
            <Center
                w="100%"
                maxW={840}
                bg="white"
                top={100}
                position="absolute"
                borderRadius={5}
                p="6"
                boxShadow="0 1px 2px #ccc"
            >
                <FormControl display="flex" flexDir="column" gap="4">
                <HStack spacing="4">
                    <Box w="50%">
                    <FormLabel htmlFor="wallet">Your Wallet</FormLabel>
                    <Input id="wallet"onChange={handleFormInputChange}/>
                    </Box>
                    <Box w="50%">
                    <FormLabel htmlFor="resourceIP">Resource IP Address</FormLabel>
                    <Input id="resourceIP" onChange={handleFormInputChange}/>
                    </Box>
                </HStack>
                <HStack spacing="4">
                    <Box w="50%">
                    <FormLabel htmlFor="resourceUser">Resource User ID</FormLabel>
                    <Input id="resourceUser" onChange={handleFormInputChange}/>
                    </Box>
                    <Box w="50%">
                    <FormLabel htmlFor="resourcePassword">Resource Password</FormLabel>
                    <Input id="resourcePassword" onChange={handleFormInputChange}/>
                    </Box>
                </HStack>
                <HStack>
                    <Box w="50%">
                    <FormLabel htmlFor="resourcePrice">Price of the resource in Wei</FormLabel>
                    <Input id="resourcePrice" type="number" onChange={handleFormInputChange}/>
                    </Box>
                    <Box w="50%">
                    <FormLabel htmlFor="resourceSize">Size of the resource in GB</FormLabel>
                    <Input id="resourceSize" type="number" onChange={handleFormInputChange}/>
                    </Box>
                </HStack>
                <HStack justify="center">
                    <Button
                    onClick={handleRegisterResourceClick}
                    w={240}
                    p="6"
                    type="submit"
                    bg="teal.600"
                    color="white"
                    fontWeight="bold"
                    fontSize="xl"
                    mt="2"
                    _hover={{ bg: "teal.800"}}
                    >
                    Register Resource
                    </Button>

                </HStack>
                </FormControl>
            </Center>
            </Flex>
        </Box>

  )

}
export default ResourcesPage
