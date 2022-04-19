import React from 'react';
import { Button as MuiButton } from '@mui/material';

function Button({ label }) {
  return <MuiButton variant="contained">{label}</MuiButton>;
}

export default Button;
