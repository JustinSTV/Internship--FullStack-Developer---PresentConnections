import { TextField } from '@mui/material';

interface Props {
  email: string;
  onChange: (email: string) => void;
}

const EmailStep = ({ email, onChange }: Props) => {
  return (
    <TextField
      fullWidth
      label="Email"
      value={email}
      onChange={(e) => onChange(e.target.value)}
      type="email"
      required
    />
  );
};

export default EmailStep;