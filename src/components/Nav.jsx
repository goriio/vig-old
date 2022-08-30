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
    gap: '8px',
    color: theme.white,
    fontSize: '1rem',
    fontWeight: 'bold',
    textDecoration: 'none',

    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
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
    left: '-100%',
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    gap: '1rem',
    padding: '2rem',
    transition: '200ms',

    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      position: 'static',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 60,
    },
  },

  active: {
    left: 0,
    background: theme.colors.dark[8],
  },
}));

export function Nav() {
  const [burgerOpened, setBurgerOpened] = useState(false);
  const { classes, cx } = useStyles();
  const { currentUser, handleSignOut } = useAuth();
  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px`);

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
          <nav
            className={cx(classes.drawer, { [classes.active]: burgerOpened })}
            onClick={() => setBurgerOpened(false)}
          >
            <NavLink className={classes.navLink} to="/">
              <BiBox />
              <Text>Market</Text>
            </NavLink>
            <NavLink className={classes.navLink} to="/sell">
              <BiArchiveOut />
              <Text>Sell</Text>
            </NavLink>
            <NavLink className={classes.navLink} to="/inventory">
              <BiBorderAll />
              <Text>Inventory</Text>
            </NavLink>
          </nav>
          <TextInput
            aria-label="Search"
            placeholder="Search for virtual items"
            icon={<BiSearch />}
            size="md"
            sx={{ display: smallScreen ? 'none' : 'block' }}
          />
          {currentUser ? (
            <Menu width={200} position="bottom-end">
              <Menu.Target>
                <Avatar
                  src={currentUser.photoURL}
                  radius="xl"
                  sx={{ cursor: 'pointer' }}
                />
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
            <Group>
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
            </Group>
          )}
        </Group>
      </Container>
    </Header>
  );
}
