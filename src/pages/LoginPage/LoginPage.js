import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { isAuth } from '../../utils/auth';

const LOGIN_STATUS = {
  UNSET: 'unset',
  SUCCESS: 'success',
  FAILURE: 'failure',
};

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.UNSET);

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
    setLoginStatus(LOGIN_STATUS.UNSET);
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
        setLoginStatus(LOGIN_STATUS.SUCCESS);
        setTimeout(() => {
          navigate('/products');
        }, 1500);
      })
      .catch(error => {
        setLoginStatus(LOGIN_STATUS.FAILURE);
      });
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

          {loginStatus === LOGIN_STATUS.SUCCESS && (
            <Alert hidden={true} id="lofin-success" severity="success">
              Success!
            </Alert>
          )}
          {loginStatus === LOGIN_STATUS.FAILURE && (
            <Alert hidden={true} id="login-fail" severity="error">
              Failure!
            </Alert>
          )}
        </Paper>
      </Container>
    </div>
  );
}

export default LoginPage;
