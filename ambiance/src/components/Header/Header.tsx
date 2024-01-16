import { Menu, Group, Center, Burger, Container, Text, rem, UnstyledButton, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconHeart, IconLogout, IconSettings, IconUser } from '@tabler/icons-react';
import classes from './Header.module.css';
import { useState } from 'react';
import LoginForm from '../Auth/LoginForm';
import { signOut, useSession } from 'next-auth/react';
import { TbShoppingBag, TbUserCircle } from 'react-icons/tb';
import CartDrawer from '../CartDrawer/CartDrawer';
import { CiUser } from 'react-icons/ci';
import { SlBag } from 'react-icons/sl';
import { BsHandbag } from 'react-icons/bs';

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
    { link: '/dekoration', label: 'Visa alla' }, 
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
        { link: '/', label: 'Visa alla' }, 
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
    { link: '/', label: 'Visa alla' }, 
    
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
        { link: '/', label: ' Visa alla' }, 
    
        
    ],
  },
];
export default function Header() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const { data: session } = useSession();

  

  const handleLoginClick = () => {
    setDrawerOpened(true);
  };

  const handleLogout = async () => {
    await signOut(); // Anropa signOut för att logga ut användaren
    setUserMenuOpened(false); // Stäng användarmenyn efter utloggning
  };

  const handleCartIconClick = () => {
    setIsCartDrawerOpen(!isCartDrawerOpen);
  };

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu 
        position='bottom-start' 
        key={link.label} 
        trigger="hover" 
        transitionProps={{ exitDuration: 0 }} 
        withinPortal
        >
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                 <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown w={500}>{menuItems}</Menu.Dropdown>
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
            <Group className={classes.rightSection}>
              {session ? (
              // Om session finns, visa användarens namn och dropdown-menyn
              <Menu.Target>
                <UnstyledButton
                  className={[classes.user, userMenuOpened && classes.userActive].filter(Boolean).join(' ')}
                  >
                  <Group gap={3}>
                    <span className={classes.LoginLink}>{session.user.name}</span>
                    {session && <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              ) : (
                // Om ingen session finns, visa "Logga in"-knappen
                <UnstyledButton onClick={handleLoginClick} className={classes.LoginButton}>
                  <span className={classes.LoginIconSpan}><CiUser /></span>
                </UnstyledButton>
                )}
                <UnstyledButton onClick={handleCartIconClick} className={classes.CartButton}>
                  <span className={classes.CartIconSpan}><BsHandbag /></span>
                </UnstyledButton>
            </Group>
           {/* User-meny OM session finns */}
            {session && (
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
                 <span onClick={handleLogout}>  Logga ut </span>
                  </Menu.Item>
                </>
              </Menu.Dropdown>
              )}
          </Menu>
          {/* CartDrawer */}
          <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} products={[]} />
           {/* Burger - meny för mindre skärmar */}
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
           {/* LoginDrawer */}
          {drawerOpened && <LoginForm onCloseDrawer={() => setDrawerOpened(false)} />}
        </div>
      </Container>
    </header>
  );
}