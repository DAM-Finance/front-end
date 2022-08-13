import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import { Stack } from "@mui/system";
import React, { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

interface NavbarProps { }

const Navbar: FunctionComponent<NavbarProps> = () => {

  const logoUrl = process.env.PUBLIC_URL + '/damlogo.png';
  return (
    <AppBar sx={{
      boxShadow: "none"
    }}>
      <Toolbar sx={{
        margin: "40px",
        display: "flex",
        justifyContent: "space-between"
      }}>
        <Stack
          direction="row"
          spacing={10}
          alignItems="center" >
          <Box>
            <NavLink to="/">
              <img
                src={logoUrl}
                alt="Dam Finance logo"
              />
            </NavLink>
          </Box>
          <NavLink to="/mint"><Typography color="text.primary">Mint</Typography></NavLink>
          <NavLink to="/stake"><Typography color="text.primary">Stake</Typography></NavLink>
          <NavLink to="/liquidate"><Typography color="text.primary">Liquidate</Typography></NavLink>
          <NavLink to="/ecosystem"><Typography color="text.primary">Ecosystem</Typography></NavLink>
        </Stack>
        <Stack>
          <Button variant="outlined" sx={
            {
              background: "#3182CE",
              borderRadius: "6px",
              paddingX: "24px",
              width: "122px",
              height: "48px",
              flexGrow: 0
            }
          }>
            <Typography color="#FFFFFF">Connect</Typography>
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
