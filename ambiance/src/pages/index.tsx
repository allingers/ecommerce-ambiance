import classes from '../styles/Home.module.css';
import cx from 'clsx';
import { Title, Text, Container, Button, Overlay, AppShell } from '@mantine/core';



const Home: React.FC = () => {
 
  return (
    <>
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Winter{' '}
          <Text component="span" inherit className={classes.highlight}>
           Wishes
          </Text>
        </Title>

        <Container size={640}>
          <Text size="" className={classes.description}>
           Våra bästa priser på tidlös design
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button className={cx(classes.control, classes.secondaryControl)} size="md">
            Live demo
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;
