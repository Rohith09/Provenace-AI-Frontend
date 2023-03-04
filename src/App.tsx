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
  Image
  
  
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"

const config = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(config);

async function generateImage(prompt: string): Promise<string | null> {
  const result = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
  });
  const url = result.data.data[0].url;
// Save Image to disk
  if (!url) {
    console.error("No URL returned from API");
    return null;
  }
  const image = await fetch(url);
  const blob = await image.blob();
  const dataUrl = URL.createObjectURL(blob);
  return dataUrl;

  // const blob = await image.blob();
  // const buffer =  Buffer.from(await blob.arrayBuffer());
  // writeFileSync(`./img/${Date.now()}.png`, buffer);
  // return `./img/${Date.now()}.png`;
}


export const App = () => {
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleClick = async () => {
    const url = await generateImage("some prompt");
    setImageUrl(url);
};



  return(
  <Flex height="120vh" justifyContent="center" paddingTop={5}>
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
        </Flex>
        <Image/>
      </Flex>
      
      
      
  )

  }
