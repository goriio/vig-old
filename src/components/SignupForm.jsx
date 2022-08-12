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
import { isEmail } from '../utils/validate';
import { useAuth } from '../contexts/AuthContext';

export function SignupForm() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },

    validate: {
      email: (value) =>
        value === ''
          ? 'Email is required'
          : !isEmail(value)
          ? 'Invalid email'
          : null,
      password: (value, values) =>
        value === ''
          ? 'Password is required'
          : value !== values.passwordConfirm
          ? 'Password did not match'
          : null,
    },
  });

  const { handleSignUpWithEmailAndPassword, handleSignInWithGoogle } =
    useAuth();

  return (
    <Card p="lg" sx={{ width: '100%' }}>
      <Stack>
        <Center mb="md">
          <Logo />
        </Center>
        <form onSubmit={form.onSubmit(handleSignUpWithEmailAndPassword)}>
          <Stack>
            <Title order={4}>Sign Up</Title>
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
            <PasswordInput
              placeholder="Your secret here"
              label="Confirm Password"
              icon={<BiLock />}
              {...form.getInputProps('passwordConfirm')}
            />
            <Button type="submit" variant="default">
              Sign up
            </Button>
          </Stack>
        </form>
        <Divider labelPosition="center" label="or" />
        <Button onClick={handleSignInWithGoogle}>Sign up with Google</Button>
        <Center>
          <Text size="sm" mt="sm">
            Already have an account? <Link to="/login">Log in</Link>
          </Text>
        </Center>
      </Stack>
    </Card>
  );
}
