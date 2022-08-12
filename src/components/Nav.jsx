import {
  Avatar,
  Burger,
  Button,
  Container,
  createStyles,
  Group,
  Header,
  Menu,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { NavLink, Link } from 'react-router-dom';
import { Logo } from './Logo';
import { BiBox, BiBorderAll, BiArchiveOut, BiLogOut } from 'react-icons/bi';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useAuth } from '../contexts/AuthContext';
import { useMediaQuery } from '@mantine/hooks';

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
    zIndex: 9999,
  },
}));

export function Nav() {
  const [burgerOpened, setBurgerOpened] = useState(false);
  const { classes } = useStyles();
  const { currentUser, handleSignOut } = useAuth();
  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px`);

  const navLinks = (
    <>
      <NavLink className={classes.navLink} to="/">
        <BiBox />
        <Text>Market</Text>
      </NavLink>
      <NavLink className={classes.navLink} to="/hehe">
        <BiArchiveOut />
        <Text>Sell</Text>
      </NavLink>
      <NavLink className={classes.navLink} to="/sample">
        <BiBorderAll />
        <Text>Inventory</Text>
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
    <Header fixed>
      <Container>
        <Group sx={{ height: 60 }} position="apart" align="center">
          <Burger
            opened={burgerOpened}
            onClick={() => setBurgerOpened((current) => !current)}
            size="sm"
            sx={{ display: smallScreen ? 'block' : 'none' }}
          />
          <Logo />
          {burgerOpened && (
            <nav
              className={classes.drawer}
              onClick={() => setBurgerOpened((current) => !current)}
            >
              <Stack>
                <TextInput
                  aria-label="Search"
                  placeholder="Search..."
                  icon={<BiSearch />}
                  size="md"
                />
                {navLinks}
                {actionButtons}
              </Stack>
            </nav>
          )}

          <Group sx={{ display: smallScreen ? 'none' : 'flex' }}>
            {navLinks}
          </Group>
          <TextInput
            aria-label="Search"
            placeholder="Search..."
            icon={<BiSearch />}
            size="md"
            sx={{ display: smallScreen ? 'none' : 'block' }}
          />
          {currentUser ? (
            <Menu width={200} position="bottom-end">
              <Menu.Target>
                <Avatar src={currentUser.photoURL} radius="xl" size="sm" />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Account</Menu.Label>
                <Menu.Item
                  icon={<BiLogOut />}
                  component="button"
                  onClick={handleSignOut}
                >
                  Log out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Group>{actionButtons}</Group>
          )}
        </Group>
      </Container>
    </Header>
  );
}
