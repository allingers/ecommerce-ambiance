import { useSession} from 'next-auth/react';
import { Drawer, Container, Group, Text, Divider, TextInput, PasswordInput, Checkbox, Anchor, Button, useMantineTheme, Paper } from '@mantine/core';
import classes from './LoginForm.module.css'
import { GoogleButton } from '../Auth/GoogleButton';
import router from 'next/router';


interface LoginFormProps {
    onCloseDrawer: () => void; //Callback för att stänga drawern
  }

  const LoginForm: React.FC<LoginFormProps> = ({ onCloseDrawer }) => {
  const { data: session } = useSession();

  const handleRegisterClick = () => {
    // Navigera till registreringssidan när "Registrera dig här" klickas
    router.push('/register');
    onCloseDrawer();
  };

  const theme = useMantineTheme();

  return (
    <Drawer opened={!session} onClose={onCloseDrawer} position="right" size="md">
      <Container size={420} my={10}>
        <Text className={classes.loginTitle}>Logga in med:</Text>
        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
        </Group>
        <Divider my="xs" label="eller fortsätt med:" labelPosition="center" />

        <Paper>
          <TextInput
            type="email"
            label="E-post"
            placeholder="exempel@gmail.com"
            required
          />
          <PasswordInput
            label="Lösenord"
            placeholder="Lösenord"
            required
          />

          <Group justify="space-between" mt="lg">
            <Checkbox label="Kom ihåg mig" />
            <Anchor component="button" size="sm">
              Glömt lösenord?
            </Anchor>
          </Group>

          <Button
            className={classes.formButton}
            variant="filled"
            color="rgba(43, 43, 43, 1)"
            type="submit"
            fullWidth
            mt="xl"
          >
            Logga in
          </Button>
        </Paper>
      </Container>

      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Har du inget konto?{' '}
        <Anchor size="sm" component="button" onClick={handleRegisterClick}>
          registrera dig här
        </Anchor>
      </Text>
    </Drawer>
  );
};

export default LoginForm;