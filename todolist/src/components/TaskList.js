import {
    VStack,
    StackDivider,
    HStack,
    Text,
    Image,
    Box,
  } from '@chakra-ui/react';
  import DeleteTask from './DeleteTask';
  import ClearTasks from './ClearTasks';
  import img from '../images/people-checking-giant-check-list-background_23-2148085776.avif';
import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
  
  export default function TaskList() {
    
    const [tasks,setTasks]=useState([false]);
  async function fetchData() {
    let { data: tasks, error } = await supabase
  .from('todos')
  .select('*')
setTasks(tasks)
  }
   
useEffect(() => {
    fetchData(); },[] );
  
    if (!tasks.length) {
      return (
        <Box align="center">
          <Image src={img} mt="30px" maxW="95%" />
        </Box>
      );
    }
  
    return (
      <>
        <VStack
          divider={<StackDivider />}
          borderColor="gray.100"
          borderWidth="2px"
          p="5"
          borderRadius="lg"
          w="100%"
          maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
          alignItems="stretch"
        >
          {tasks.map(task => (
            <HStack key={task.id}>
              <Text w="100%" p="8px" borderRadius="lg">
                {task.text}
              </Text>
              <DeleteTask id={task.id} />
            </HStack>
          ))}
        </VStack>
  
        <ClearTasks />
      </>
    );
  }