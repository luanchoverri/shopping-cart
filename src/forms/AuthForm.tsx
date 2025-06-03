import React, { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { VisibilityOff } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";

export default function AuthForm() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const isLogin = mode !== "signup";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, register, isLoading } = useAuth();

  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validateEmail = (email: string) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError("Enter a valid email");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (!isLogin) {
      if (!validatePassword(value)) {
        setPasswordError("Must include uppercase, lowercase and number");
      } else {
        setPasswordError("");
      }
    } else {
      setPasswordError(""); // No mostrar error en login
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    if (hasError) return;

    let success = false;

    if (!isLogin) {
      success = await register(username, email, password);
      if (success) navigate("/login?mode=login");
    } else {
      success = await login(username, password);
      if (success) {
        navigate("/");
      } else {
        setPasswordError("Invalid username or password");
      }
    }
  };
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      justifyContent="center"
      sx={{
        mt: 1,
        pt: 6,
        pb: { xs: 4, sm: 8 },
        px: { xs: 0, sm: 5, md: 10 }, // padding horizontal: 0 en mobile, 5 (40px) desde sm en adelante
      }}
    >
      <Typography variant="body2" color="textDisabled" gutterBottom>
        {" "}
        Usuario FakeAPI: <strong>johnd</strong> — Contraseña:{" "}
        <strong>m38rmF$</strong>{" "}
      </Typography>
      <Card
        sx={{
          width: "100%",
          maxWidth: 500,
          px: { xs: 1, sm: 2, md: 4 },
          py: 3,
        }}
      >
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            {isLogin ? "Login" : "Create Account"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2} mt={2}>
              <TextField
                fullWidth
                label="Username"
                variant="filled"
                value={username}
                error={!!passwordError}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              {!isLogin && (
                <TextField
                  fullWidth
                  label="Email"
                  variant="filled"
                  value={email}
                  onChange={handleEmailChange}
                  error={!!emailError}
                  helperText={emailError}
                  required
                />
              )}

              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="filled"
                value={password}
                onChange={handlePasswordChange}
                error={!!passwordError}
                helperText={passwordError}
                required
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : isLogin ? (
                  "Login"
                ) : (
                  "Sign up"
                )}
              </Button>

              <Box textAlign="center">
                <Typography variant="body2">
                  <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
                    {isLogin
                      ? "Don't have an account? Sign Up"
                      : "Already have an account? Login"}
                  </Link>
                </Typography>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
