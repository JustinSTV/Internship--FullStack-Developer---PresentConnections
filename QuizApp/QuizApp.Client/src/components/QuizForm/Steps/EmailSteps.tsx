import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';

interface Props {
  email: string;
  onChange: (email: string) => void;
}

const EmailStep = ({ email, onChange }: Props) => {

  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  useEffect(() => {
    if (email && !validateEmail(email)) {
      setError('Please enter a valid email address');
    } else {
      setError('');
    }
  }, [email]);

  return (
    <TextField
      fullWidth
      label="Email"
      value={email}
      onChange={(e) => onChange(e.target.value)}
      type="email"
      required
      error={!!error}
      helperText={error}
    />
  );
};

export default EmailStep;