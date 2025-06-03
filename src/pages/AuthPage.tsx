import { useState } from "react";
import AuthForm from "../forms/AuthForm";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";

function AuthPage() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <>

      <AuthForm />
    </>
  );
}
export default AuthPage;
