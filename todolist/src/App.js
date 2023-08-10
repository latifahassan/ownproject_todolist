import { Heading, VStack } from '@chakra-ui/react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import ImageUpload from './components/ImageUpload';

export default function App() {
  return (
    <>
    <VStack p={4} minH="100vh">
      <Heading
        mt="20"
        p="5"
        fontWeight="extrabold"
        size="xl"
        bgGradient="linear(to-l, purple.300, purple.500)"
        bgClip="text"
      >
        Todo List
      </Heading>
      <AddTask />
      <TaskList />
    </VStack>
    <ImageUpload/>
    </>
  );
  }
// Path: todolist/src/components/AddTask.js