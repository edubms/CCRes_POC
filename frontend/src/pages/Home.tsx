import React from 'react';
import { useHistory } from 'react-router-dom';



import {
    Flex,
    Box,
    Center,
    ButtonGroup,
    Button,
  } from "@chakra-ui/react"


  function HomePage(){

    const history = useHistory();

    const handleResourcesClick = () => {
      history.push('/resources');
    };
  
    const handleCustomerClick = () => {
      history.push('/customer');
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
                CCRes
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
                            onClick={handleResourcesClick} 
                            w={120}
                            p="5"
                            type="submit"
                            bg="teal.400"
                            color="white"
                            fontWeight="bold"
                            fontSize="xl"
                            mt="1"
                            _hover={{ bg: "teal.800"}}
                        >
                    Sell
                    </Button>
                </ButtonGroup>
                </Center>
                </Flex>
            </Box>
    
      )
  }

  export default HomePage