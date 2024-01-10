import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import classes from './Footer.module.css';

const data = [
  {
    title: 'Information',
    links: [
      { label: 'Kundtjänst / FAQ', link: '#' },
      { label: 'Nyhetsbrev', link: '#' },
      { label: 'Köpvillkor', link: '#' },
      { label: 'Leveranser', link: '#' },
      { label: 'Retur', link: '#' },
      { label: 'Reklamationer', link: '#' },
      { label: 'Om oss', link: '#' },
      { label: 'Cookie Policy', link: '#' },
      { label: 'Integritetspolicy', link: '#' },
    ],
  },
  {
    title: 'Soriment',
    links: [
      { label: 'Dekoration', link: '#' },
      { label: 'Ljus & Ljusstakar', link: '#' },
      { label: 'Belysning', link: '#' },
      { label: 'Textil', link: '#' },
    ],
  },
  {
    title: 'Följ oss',
    links: [
      { label: 'Instagram', link: '#' },
      { label: 'Tiktok', link: '#' },
      { label: 'Facebook', link: '#' },
      { label: 'Nyhetsbrev', link: '#' },
    ],
  },
];

export default function FooterLinks() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
        <Text className={classes.logoText}>Ambiance</Text>
          <Text size="xs" c="dimmed" className={classes.description}>
            Build fully functional accessible web applications faster than ever
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2024 ambiance.dev. All rights reserved.
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}