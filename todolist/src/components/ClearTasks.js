import { Flex, Button, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import supabase from '../supabaseClient';

export default function ClearTasks() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!window.confirm('Are you sure you want to clear all tasks?')) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('todos')
      .delete()
      .not('text', 'eq', 'Do not delete me');
    setLoading(false);

    toast({
      title: error || 'Tasks cleared!',
      position: 'top',
      status: error ? 'error' : 'success',
      duration: 2000,
      isClosable: true,
    });
  }

  return (
    <Flex>
      <Button
        colorScheme="gray"
        px="8"
        h="45"
        color="gray.500"
        mt="10"
        onClick={handleDelete}
        isLoading={loading}
        loadingText="Clearing tasks"
      >
        Clear Tasks
      </Button>
    </Flex>
  );
}