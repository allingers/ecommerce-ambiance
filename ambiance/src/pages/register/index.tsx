// pages/register/index.ts
import React, { useState } from 'react';
import RegisterForm, { RegistrationFormInput } from '../../components/Auth/RegisterForm'; 
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

    const RegisterPage: React.FC = () => {
      const router = useRouter();
      const [isLoading, setIsLoading] = useState(false);

        const handleRegisterSubmit = async (data: RegistrationFormInput) => {
            try {
              // Validering av formulärdata innan du skickar till servern
              if (!data.name || !data.email || !data.password) {
                console.error('Alla fält måste fyllas i.');
                return;
              }
          
              const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });
          
              if (response.ok) {
                // Registreringen lyckades
                const responseData = await response.json();
                console.log('Registration successful:', responseData);
          
                // Logga in användaren efter registreringen
                const signInResponse = await signIn("credentials", {
                  redirect: false,
                  email: data.email, // Använd registrerade e-postadressen
                  password: data.password, // Använd registrerat lösenord
                });
          
                if (signInResponse?.error) {
                  // Inloggningen efter registreringen misslyckades, hantera fel här
                  console.error('Inloggning efter registrering misslyckades:', signInResponse.error);
                } else {
                  // Användaren är nu inloggad
                  console.log('Användaren är inloggad efter registrering:', signInResponse);
                  router.push('/');
                }
              } else {
                // Hantera fel vid registreringen
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
              }
            } catch (error) {
              console.error('An error occurred during registration:', error);
            } finally {
              setIsLoading(false);
            }
          };

  return (
    <RegisterForm 
    onSubmit={handleRegisterSubmit} 
    isLoading={isLoading} 
    onOpenLoginDrawer={() => {/* Öppna inloggningsdrawern */}} 
    />
  );
};

export default RegisterPage;
