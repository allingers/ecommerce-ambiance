// pages/register/index.ts

import React, { useState } from 'react';
import RegisterForm, { RegistrationFormInput } from '../../components/Auth/RegisterForm'; 

    const RegisterPage: React.FC = () => {
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
