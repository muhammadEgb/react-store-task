import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { isAuth } from '../../utils/auth';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // --- CORS --- //
  const headers = new Headers();
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Content-Type', 'application/json');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth()) {
      navigate('/products');
    }
  }, []);

  const login = () => {
    fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        navigate('/products');
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="LoginPage">
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10 }}
        >
          <h1>Login Page</h1>
          <TextField
            id="username"
            label="Username"
            variant="standard"
            fullWidth
            required
            sx={{ marginY: 2 }}
            value={username}
            onChange={event => {
              setUsername(event.target.value);
            }}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="standard"
            fullWidth
            required
            sx={{ marginY: 2 }}
            value={password}
            onChange={event => {
              setPassword(event.target.value);
            }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ marginY: 5 }} onClick={login}>
            Login
          </Button>
        </Paper>
      </Container>
    </div>
  );
}

export default LoginPage;
