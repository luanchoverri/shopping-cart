import React, { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AuthForm() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const isLogin = mode !== "signup";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, register, isLoading } = useAuth();

  const navigate = useNavigate(); 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let success = false;

    if (!isLogin) {
      success = await register(username, email, password);
      if (success) {
        navigate("/login?mode=login"); // Redirige login
      }
    } else {
      success = await login(username, password);
      if (success) {
        navigate("/");
      }
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", px: 2 }}
    >
      <Card sx={{ width: "100%", maxWidth: 500, p: 4 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            {isLogin ? "Login" : "Create Account"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                fullWidth
                label="Username"
                variant="filled"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              {!isLogin && (
                <TextField
                  fullWidth
                  label="Email"
                  variant="filled"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              )}

              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="filled"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
