import { faker } from '@faker-js/faker';
import {
  Button,
  Card,
  Grid,
  Group,
  Stack,
  Table,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { Line } from 'react-chartjs-2';
import { BiCoinStack, BiLineChart } from 'react-icons/bi';
import { BsBoxSeam, BsFileEarmarkSlides } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const elements = [
  { id: 19, title: 'Glock-18 | Death Rattle', date: '18/9/2022', price: 128 },
  { id: 29, title: 'Glock-18 | Death Rattle', date: '18/9/2022', price: 128 },
  { id: 39, title: 'Glock-18 | Death Rattle', date: '18/9/2022', price: 128 },
  { id: 56, title: 'Glock-18 | Death Rattle', date: '18/9/2022', price: 128 },
  { id: 58, title: 'Glock-18 | Death Rattle', date: '18/9/2022', price: 128 },
];

const cards = [
  {
    color: 'blue',
    icon: <BiLineChart />,
    text: 'Total Sales',
    data: 'PHP 192,392.00',
  },
  {
    color: 'yellow',
    icon: <BiCoinStack />,
    text: 'Average Sale',
    data: 'PHP 122.00',
  },
  {
    color: 'green',
    icon: <BsBoxSeam />,
    text: 'Count of Sales',
    data: '77',
  },
];

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
  },
};

const labels = [
  'May 31',
  'June 7',
  'June 14',
  'June 21',
  'June 28',
  'August 5',
  'August 12',
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Sales',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function SalesReport() {
  const navigate = useNavigate();

  return (
    <>
      <Group position="apart" mb="md">
        <Title order={4}>Sales Report</Title>
        <Button variant="subtle" onClick={() => navigate('/')}>
          Go home
        </Button>
      </Group>
      <Grid columns={4} align="stretch">
        <Grid.Col sm={3} span={4}>
          <Card sx={{ height: '100%' }}>
            <Title order={6} mb="md">
              Weekly Recap Statistics
            </Title>
            <Line options={options} data={data} />
          </Card>
        </Grid.Col>

        <Grid.Col sm={1} span={4}>
          <Stack>
            {cards.map((card, index) => (
              <Card key={index}>
                <ThemeIcon
                  variant="light"
                  size="lg"
                  radius="xl"
                  mb="md"
                  color={card.color}
                >
                  {card.icon}
                </ThemeIcon>
                <Text size="sm">{card.text}</Text>
                <Title order={4}>{card.data}</Title>
              </Card>
            ))}
          </Stack>
        </Grid.Col>

        <Grid.Col>
          <Card>
            <Title order={6} mb="sm">
              Recently Sold Virtual Items
            </Title>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Virtual Item</th>
                  <th>Date</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {elements.map((element) => (
                  <tr key={element.id}>
                    <td>{element.id}</td>
                    <td>{element.title}</td>
                    <td>{element.date}</td>
                    <td>PHP {element.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}
