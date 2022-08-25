import { Center, Stack, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <Stack mt="7rem">
      <Center>
        <Title sx={{ fontSize: '7rem' }}>404</Title>
      </Center>
      <Center>
        <Text>
          Page does not exist. Go to <Link to="/">homepage</Link> instead.
        </Text>
      </Center>
    </Stack>
  );
}
