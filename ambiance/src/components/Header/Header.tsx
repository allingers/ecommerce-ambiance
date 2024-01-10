import { Menu, Group, Center, Burger, Container, Text, rem, UnstyledButton, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBuildingStore, IconChevronDown, IconHeart, IconLogout, IconSettings, IconStar, IconUser } from '@tabler/icons-react';
import classes from './Header.module.css';
import { useState } from 'react';
import LoginForm from '../Auth/LoginForm';

const links = [
  { link: '#1', 
  label: 'Dekoration',
  links: [
    { link: '/dekoration/posters', label: 'Posters' },
    { link: '/dekoration/tavlor', label: 'Tavlor' },
    { link: '/dekoration/skulpturer', label: 'Skulpturer' }, 
    { link: '/dekoration/vaser', label: 'Vaser' }, 
    { link: '/dekoration/krukor', label: 'Krukor' }, 
    { link: '/dekoration/dekorativaaccessoarer', label: 'Dekorativa Accessoarer' }, 
  ],
},
{
    link: '#2',
    label: 'Ljus & Ljuslyktor',
    links: [
        { link: '/ljus&ljuslyktor/ljusstakar', label: 'Ljusstakar' },
        { link: '/ljus&ljuslyktor/ljuslyktor', label: 'Ljuslyktor' },
        { link: '/ljus&ljuslyktor/ljus', label: 'Ljus' },
        { link: '/ljus&ljuslyktor/doftljus', label: 'Doftljus' },
    ],
  },
  { link: '#3', 
  label: 'Belysning',
  links: [
    { link: '/belysning/taklampor', label: 'Taklampor' },
    { link: '/belysning/bordslampor', label: 'Bordslampor' },
    { link: '/belysning/vagglampor', label: 'Vägglampor' },
    { link: '/belysning/golvlampor', label: 'Golvlampor' },
    { link: '/belysning/dekorativbelysning', label: 'Dekorativ Belysning' },
  ],
},
{
    link: '#4',
    label: 'Textil',
    links: [
        { link: '/textil/pladar&prydnadskuddar', label: 'Plädar & Prydnaskuddar' },
        { link: '/textil/mattor', label: 'Mattor' },
        { link: '/textil/gardiner', label: 'Gardiner' },
        { link: '/textil/kökstextil', label: 'Kökstextil' },
    ],
  },
];
export default function Header() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(false);

  const handleLoginClick = () => {
    setDrawerOpened(true);
  };

  const handleLogout = async () => {
    setUserMenuOpened(false); // Stäng användarmenyn efter utloggning
  };


  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                {isLoggedIn && <IconChevronDown size="0.9rem" stroke={1.5} />}
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <div className={classes.inner}>
          <Text className={classes.logo}> <a href='/'>Ambiance</a></Text>
          <Group gap={5} visibleFrom="sm" justify="space-between">
            {items}
          </Group>
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={[classes.user, userMenuOpened && classes.userActive].filter(Boolean).join(' ')}
              >
           <Group gap={7}>
                <span onClick={isLoggedIn ? handleLogout : handleLoginClick}>
                {isLoggedIn ? "Namn" : "Logga in"}
                </span>
                {isLoggedIn && <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
             </Group>
              </UnstyledButton>
            </Menu.Target>
            {isLoggedIn && (
              <Menu.Dropdown>
                <>
                  <Menu.Item
                    leftSection={
                      <IconUser
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors.blue[6]}
                        stroke={1.5}
                      />
                    }
                  >
                    Mina sidor
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconHeart
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors.red[6]}
                        stroke={1.5}
                      />
                    }
                  >
                    Favoriter
                  </Menu.Item>
                  <Menu.Label>Settings</Menu.Label>
                  <Menu.Item
                    leftSection={
                      <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                  >
                    Hantera kontoinställningar
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                  >
                    Logout
                  </Menu.Item>
                </>
              </Menu.Dropdown>
            )}
          </Menu>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          {drawerOpened && <LoginForm onCloseDrawer={() => setDrawerOpened(false)} />}
        </div>
      </Container>
    </header>
  );
}