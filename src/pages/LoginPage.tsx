import { Box, Typography } from "@mui/material";
import { useState } from "react";
import type { User } from "../types/user";

function LoginPage(){


  
  const [user, setUser] = useState<User | null>(null);


    return (
      <Box mt={8} textAlign="center">
        <Typography variant="h5">¡Welcome, dsf!</Typography>
      </Box>
    );
  


};


export default LoginPage;