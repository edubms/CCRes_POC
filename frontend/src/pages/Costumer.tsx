import React, { useEffect, useState } from 'react';
import listResourcesUseCase from '../useCases/listResourcesUseCase';
import { useHistory } from 'react-router-dom';



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
      Select,
    } from "@chakra-ui/react"
  
    function CostumerPage(){
    
        const history = useHistory();
        const [availableResources, setAvailableResources] = useState([]);

        const handleHomeClick = () => {
          history.push('/');
        };
      
        const handleResourcesClick = () => {
          history.push('/resources');
        };

        const loadResources = () => {
          listResourcesUseCase().then(data => {
            setAvailableResources(data);
          });
        };

        useEffect(() => {loadResources()}, [])

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
              Buy Resources
              <Spacer />
              <ButtonGroup gap='2'>
                  <Button
                  onClick={handleHomeClick}                
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
                          Home
                  </Button>
                  <Button 
                  w={120}
                  p="5"
                  onClick={handleResourcesClick} 
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
                      <Input id="wallet"/>
                      </Box>
                      <Box w="50%">
                      <FormLabel htmlFor="publicKey">Your Public Key</FormLabel>
                      <Input id="publicKey"/>
                      </Box>
                  </HStack>
                  <HStack spacing="4">
                    <Select placeholder='Select option'>
                      {
                        availableResources.map((resource) => <option value={resource._id}>{`ETH ${resource.resourceValue} - GB ${resource.resourceSpace}`}</option>)
                      }
                    </Select>
                  </HStack>
                  <HStack justify="center">
                      <Button
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
                      Buy
                      </Button>
  
                  </HStack>
                  </FormControl>
              </Center>
              </Flex>
          </Box>
  
    )
  
  }
  export default CostumerPage
  