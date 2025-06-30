import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { useAuth } from "react-oidc-context";

export default function NavBarComp(props) {
  const { userInfo } = props;
  const auth = useAuth();

  const userId = userInfo ? userInfo.username : "";
  const history = useHistory();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleLogout = () => {
    auth.signoutRedirect();
  };

  const handleLogin = () => {
    history.push("/");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignIn = () => {
    history.push("/register");
  };

  const displayUserAvatar = () => {
    return (
      <>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <AccountCircle sx={{ color: "white" }} fontSize="large" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </Menu>
        </div>
      </>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ButtonBase
              disableRipple
              onClick={() => history.push("/dashboard")}
              sx={{
                color: "inherit",
                textTransform: "none",
                padding: 0,
                minWidth: 0,
              }}
            >
              <Typography variant="h5" component="div" color="white">
                SmallPay
              </Typography>
            </ButtonBase>
          </Box>

          <Box>
            {userId ? (
              displayUserAvatar()
            ) : (
              <Button onClick={handleLogin}>
                <Typography color="white">Log In</Typography>
              </Button>
            )}
          </Box>
        </Toolbar>

      </AppBar>
    </Box>
  );
}
