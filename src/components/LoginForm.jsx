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
import { useForm } from '@mantine/form';
import { useAuth } from '../contexts/AuthContext';
import { isEmail } from '../utils/validate';

export function LoginForm() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) =>
        value === ''
          ? 'Email is required'
          : !isEmail(value)
          ? 'Invalid email'
          : null,
      password: (value) => (value === '' ? 'Password is required' : null),
    },
  });

  const { handleSignInWithEmailAndPassword, handleSignInWithGoogle } =
    useAuth();

  return (
    <Card p="lg" sx={{ width: '100%' }}>
      <Stack>
        <Center mb="md">
          <Logo />
        </Center>
        <Title order={4}>Login</Title>
        <form onSubmit={form.onSubmit(handleSignInWithEmailAndPassword)}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="mail@example.com"
              icon={<BiAt />}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              placeholder="Your secret here"
              label="Password"
              icon={<BiLock />}
              {...form.getInputProps('password')}
            />
            <Button type="submit" variant="default">
              Log in
            </Button>
          </Stack>
        </form>
        <Divider labelPosition="center" label="or" my="sm" />
        <Button onClick={handleSignInWithGoogle}>Login with Google</Button>
        <Center>
          <Text size="sm" mt="sm">
            Don't have an account yet?{' '}
            <Link to="/signup">Create an account</Link>
          </Text>
        </Center>
      </Stack>
    </Card>
  );
}
