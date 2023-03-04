import * as React from "react"
import { useState } from "react"
import {Configuration, OpenAIApi} from 'openai';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Image,
  Button,
  
  
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
const apiKey = process.env.REACT_APP_API_KEY;

const config = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(config);


export const App = () => {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const generateImage = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await openai.createImage({
        prompt: description,
        n: 1,
        size: "512x512",
      });
  
      setResult(res.data.data[0].url ?? "");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



  return(
    
  <Flex height="120vh" justifyContent="center" paddingTop={5}>
    <VStack >
        <Flex
          height="fit-content"
          direction={"column"}
          background={"teal.400"}
          p={12}
          rounded={20}
          overflow="scroll"
        >
          <Box 
          as="form"
          width="clamp(200px, 300px, 500px)"
          //maxWidth="500px"
         // onSubmit={props.data}>
          >
      <Heading mb={6}>Request</Heading>
      <FormControl isRequired>
        <FormLabel color="white">Title</FormLabel>
        <Input
          name="title"
          onChange={e => setTitle(e.target.value)}
          mb={3}
          placeholder="Give your future masterpiece a title."
        />
        <FormLabel color="white">Description</FormLabel>
        <Input
          name="description"
          //onChange={handleDescriptionChange}
          mb={3}
          placeholder="Describe your artwork request."
          onChange={e => setDescription(e.target.value)}
        />
        </FormControl>
        </Box>
        <Button 
        isLoading={loading}
        loadingText='Submitting'
        // colorScheme='teal'
        // variant='outline' 
        onClick={generateImage}>Submit</Button>
        </Flex>
        {result.length > 0 ? <Image mt={"20px"} width={"350px"} src={result}/> : <></>}
        </VStack>
      </Flex>
      
      
      
      
  )

  }
