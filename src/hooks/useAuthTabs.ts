
import { useState } from 'react';

export type AuthTab = 'login' | 'register';

export const useAuthTabs = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  
  const handleTabChange = (value: AuthTab) => {
    setIsRegistering(value === 'register');
    return value;
  };

  return {
    isRegistering,
    handleTabChange
  };
};
