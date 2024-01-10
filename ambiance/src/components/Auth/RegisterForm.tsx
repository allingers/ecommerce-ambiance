// RegisterForm.tsx
import {TextInput, PasswordInput, Checkbox, Anchor, Text, Container, Group, Button ,Divider, Drawer,} from '@mantine/core';
  import classes from './LoginForm.module.css';
import { useState } from 'react';
import { GoogleButton } from '../Auth/GoogleButton';

export interface RegistrationFormInput {
  name: string;
  email: string;
  password: string;
}
  
interface RegisterFormProps {
  onSubmit: (data: RegistrationFormInput) => void;
  isLoading: boolean;
  onOpenLoginDrawer: () => void;
}
  
const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading, onOpenLoginDrawer }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  type FormField = 'name' | 'email' | 'password';


  const handleInputChange = (field: FormField, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Lägg till validering här om det behövs
    if (data.password === confirmPassword) {
      onSubmit(data);
    } else {
      // Visa felmeddelande om lösenorden inte matchar
      // Du kan också hantera andra typer av validering här
      console.error('Lösenorden matchar inte.');
    }
  };

    const handleLoginClick = () => {
        onOpenLoginDrawer();
      };

  
    return (
      <Container size={420} my={10}>
        <Text className={classes.loginTitle}>Fortsätt med:</Text>
        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
        </Group>
        <Divider my="xs" label="eller skapa konto med:" labelPosition="center" />
        <TextInput
        label="Namn"
        placeholder="Ditt namn"
        required
        value={data.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
       
      />
         <TextInput
        label="E-post"
        placeholder="exempel@gmail.com"
        type="email"
        required
        value={data.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
       
      />
         <PasswordInput
        label="Lösenord"
        placeholder="Lösenord"
        required
        value={data.password}
        onChange={(e) => setData((prevData) => ({ ...prevData, password: e.target.value }))}
      />
      <PasswordInput
        label="Upprepa lösenord"
        placeholder="Upprepa lösenord"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Jag godkänner villkoren" required />
        </Group>
        <Button
          className={classes.formButton}
          variant="filled"
          color="rgba(43, 43, 43, 1)"
          fullWidth
          mt="xl"
          onClick={handleSubmit}
          loading={isLoading}
        >
          Skapa konto
        </Button>
        <Text c="dimmed" size="sm" ta="center" mt={7}>
          Har du redan ett konto?{' '}
          <Anchor size="sm" component="button" onClick={handleLoginClick}>
             Logga in
         </Anchor>
        </Text>
      </Container>
    );
  }
  
  export default RegisterForm;