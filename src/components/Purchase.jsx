import {
  Button,
  Card,
  Group,
  Image,
  Modal,
  NumberInput,
  Stack,
  Stepper,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import GCashLogo from '../assets/gcash-logo.png';

export function Purchase({ opened, setOpened, item }) {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const form = useForm({
    initialValues: {
      number: null,
    },
    validate: {
      number: (value) =>
        !value
          ? 'Phone number is required'
          : !/^9\d{9}/.test(value)
          ? 'Invalid number'
          : null,
    },
  });

  const navigate = useNavigate();

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Buy"
      sx={{ margin: '0 1rem', right: 0 }}
    >
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="Step 1" description="Check">
          <Stack>
            <Card
              sx={(theme) => ({
                backgroundImage: theme.fn.gradient(),
              })}
            >
              <Image
                src={item.image}
                alt={item.title}
                mb="md"
                height={100}
                fit="contain"
              />
            </Card>
            <Text align="center" weight="bold">
              {item.title}
            </Text>
            <Text align="center" size="sm" color="dimmed">
              The item's price is{' '}
              <Text color="blue" span>
                PHP {item.price}
              </Text>
              . Would you like to buy it?
            </Text>
          </Stack>
          <Group grow position="right" mt="xl">
            <Button variant="default" onClick={() => setOpened(false)}>
              Cancel
            </Button>
            <Button onClick={nextStep}>Confirm</Button>
          </Group>
        </Stepper.Step>
        <Stepper.Step label="Step 2" description="Purchase">
          <form
            onSubmit={form.onSubmit(() => {
              showNotification({
                title: '🎉 Successful transaction',
                message: 'You successfully purchased the item.',
                icon: <BiCheck />,
                color: 'teal',
              });
              nextStep();
            })}
          >
            <Stack>
              <Text align="center" weight="bold">
                Pay with
                <Image
                  src={GCashLogo}
                  alt={item.title}
                  height={50}
                  fit="contain"
                />
              </Text>
              <NumberInput
                placeholder="9123456789"
                label="Your phone number"
                hideControls
                icon="+63"
                size="md"
                maxLength={10}
                {...form.getInputProps('number')}
              />
            </Stack>
            <Group grow position="right" mt="xl">
              <Button type="button" variant="default" onClick={prevStep}>
                Back
              </Button>
              <Button type="submit">Buy</Button>
            </Group>
          </form>
        </Stepper.Step>
        <Stepper.Completed>
          <Stack>
            <Text align="center" weight="bold">
              Item successfully purchased
            </Text>
            <Text align="center" size="sm" color="dimmed">
              You can view your purchased virtual items
              <br />
              on your inventory.
            </Text>
          </Stack>
          <Group grow position="right" mt="xl">
            <Button variant="default" onClick={() => setOpened(false)}>
              Close
            </Button>
            <Button onClick={() => navigate('/inventory')}>
              Go to my inventory
            </Button>
          </Group>
        </Stepper.Completed>
      </Stepper>
    </Modal>
  );
}
