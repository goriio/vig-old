import {
  Button,
  Card,
  Center,
  Divider,
  Text,
  TextInput,
  Title,
  PasswordInput,
  Stack,
} from '@mantine/core';
import { Logo } from './Logo';
import { BiAt, BiLock } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export function SignupForm() {
  return (
    <Card p="lg" sx={{ width: '100%' }}>
      <Stack>
        <Center mb="md">
          <Logo />
        </Center>
        <Title order={4}>Sign Up</Title>
        <TextInput
          label="Email"
          placeholder="mail@example.com"
          icon={<BiAt />}
        />
        <PasswordInput
          placeholder="Your secret here"
          label="Password"
          icon={<BiLock />}
        />
        <Divider labelPosition="center" label="or" my="sm" />
        <Button>Signup with Steam</Button>
        <Center>
          <Text size="sm" mt="sm">
            Already have an account? <Link to="/login">Log in</Link>
          </Text>
        </Center>
      </Stack>
    </Card>
  );
}
