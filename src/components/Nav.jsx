import {
  Burger,
  Button,
  Container,
  createStyles,
  Group,
  Header,
  MediaQuery,
  Stack,
  Text,
} from '@mantine/core';
import { NavLink, Link } from 'react-router-dom';
import { Logo } from './Logo';
import { BiBox, BiBorderAll, BiTime } from 'react-icons/bi';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '12px',
    color: theme.white,
    fontSize: '1rem',
    fontWeight: 'bold',
    textDecoration: 'none',

    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      marginBottom: '-4px',
      padding: '16px 12px',
    },

    '&.active': {
      color: theme.colors.blue[7],
      borderBottom: 'none',

      [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
        borderBottom: `2px solid ${theme.colors.blue[7]}`,
      },
    },
  },

  drawer: {
    position: 'fixed',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    padding: '2rem',
    background: theme.colors.dark[8],
  },
}));

export function Nav() {
  const [burgerOpened, setBurgerOpened] = useState(false);
  const { classes } = useStyles();

  const navLinks = (
    <>
      <NavLink className={classes.navLink} to="/">
        <BiBox />
        <Text>Market</Text>
      </NavLink>
      <NavLink className={classes.navLink} to="/hehe">
        <BiTime />
        <Text>Hehe</Text>
      </NavLink>
      <NavLink className={classes.navLink} to="/sample">
        <BiBorderAll />
        <Text>Sample</Text>
      </NavLink>
    </>
  );

  const actionButtons = (
    <>
      <Button variant="default" component={Link} to="/login">
        Log in
      </Button>
      <Button
        variant="gradient"
        gradient={{ from: 'indigo', to: 'cyan' }}
        component={Link}
        to="/signup"
      >
        Sign up
      </Button>
    </>
  );

  return (
    <Header>
      <Container>
        <Group sx={{ height: 60 }} position="apart" align="center">
          <Logo />

          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={burgerOpened}
              onClick={() => setBurgerOpened((current) => !current)}
              size="sm"
            />
          </MediaQuery>
          {burgerOpened && (
            <nav
              className={classes.drawer}
              onClick={() => setBurgerOpened((current) => !current)}
            >
              <Stack>
                {navLinks}
                {actionButtons}
              </Stack>
            </nav>
          )}

          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Group>{navLinks}</Group>
          </MediaQuery>
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Group>{actionButtons}</Group>
          </MediaQuery>
        </Group>
      </Container>
    </Header>
  );
}
