import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Button,
  Switch,
  Stack,
  Link,
  capitalize,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";

function Profile() {
  const theme = "light";

  const { mode, toggleTheme } = useThemeContext();
  const isDarkMode = mode == "dark";
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    navigate("/");
    logout();
  }

  return (
    <Box maxWidth="600px" mx="auto" p={4}>
      {/* Perfil */}
      <Card
        elevation={5}
        sx={{
          p: 2,
          borderRadius: 4,
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ width: 48, height: 48, bgcolor: "green" }}>
              {user?.name.firstname.charAt(0).toUpperCase()}
              {user?.name.lastname.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={
            <Typography variant="h6" color="text.primary">
              {capitalize(user?.name.firstname || "")}{" "}
              {capitalize(user?.name.lastname || "")}
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          }
        />
        <CardContent>
          <Box mb={2}>
            <Typography variant="subtitle2">Nombre completo</Typography>
            <Typography variant="body1" color="text.secondary">
              {" "}
              {user?.name.firstname} {user?.name.lastname}{" "}
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle2">Email</Typography>
            <Typography variant="body1" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle2">Address</Typography>
            <Typography variant="body1" color="text.secondary">
              {user?.address.street}, {user?.address.zipcode},{" "}
              {user?.address.city}
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle2">Phone</Typography>
            <Typography variant="body1" color="text.secondary">
              {user?.phone}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">Miembro desde</Typography>
            <Typography variant="body1" color="text.secondary">
              Feb 2024
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Preferencias de Tema */}
      <Card
        elevation={5}
        sx={{
          p: 2,
          borderRadius: 4,
          mt: 4,
        }}
      >
        <CardHeader
          title={
            <Typography variant="h6" color="text.primary">
              Preferencias de Tema
            </Typography>
          }
        />
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Box>
                <Typography variant="body1" fontWeight="medium">
                  Tema Oscuro
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Activa el modo oscuro para una mejor experiencia nocturna
                </Typography>
              </Box>
            </Box>
            <Switch checked={isDarkMode} onChange={toggleTheme} color="secondary"/>
          </Box>
        </CardContent>
      </Card>

      {/* Acciones de Cuenta */}
      <Card
        elevation={5}
        sx={{
          p: 2,
          borderRadius: 4,
          mt: 4,
        }}
      >
        <CardHeader
          title={
            <Typography variant="h6" color="text.primary">
              Acciones de Cuenta
            </Typography>
          }
        />
        <CardContent>
          <Stack spacing={2}>
            <Button variant="outlined" fullWidth >
              Edit Profile
            </Button>
            <Button variant="outlined" fullWidth>
              Change Password
            </Button>
            <Button variant="outlined" fullWidth>
              Order History
            </Button>
            <Button
              onClick={handleLogout}
              variant="contained"
              fullWidth
              color="secondary"
             
            >
              Log out
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Profile;
