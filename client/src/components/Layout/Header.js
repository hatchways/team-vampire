import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withRouter } from 'react-router-dom';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            calendapp
          </Typography>
            <div>
              {isMobile ? (
                <>
                  <IconButton 
                    edge="start" 
                    className={classes.menuButton} 
                    color="inherit" 
                    aria-label="dashboard-mobile"
                    onClick={() => handleButtonClick("/event_types/user/me")}>
                    <Typography>Home</Typography>
                  </IconButton>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar-mobile"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                <Menu
                  id="menu-appbar-mobile"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={() => handleMenuClick("/profile")}>Account Settings</MenuItem>
                  <MenuItem onClick={() => handleMenuClick("/profile")}>Availablity</MenuItem>
                  <MenuItem onClick={() => handleMenuClick("/profile")}>Integration</MenuItem>
                  <MenuItem onClick={() => handleMenuClick("/")}>Logout</MenuItem>
                </Menu>
                </>
              ) : (
                <>
                  <IconButton
                      aria-label="dashboard of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={() => handleButtonClick("/event_types/user/me")}
                      color="inherit"
                    >
                      <Typography> Home </Typography>
                  </IconButton>
                  <IconButton
                      aria-label="availability of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={() => handleMenuClick("/profile")}
                      color="inherit"
                    >
                      <Typography> Availablity </Typography>
                  </IconButton>
                  <IconButton
                      aria-label="integrations of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={() => handleMenuClick("/profile")}
                      color="inherit"
                    >
                      <Typography> Integrations </Typography>
                  </IconButton>
                  <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem onClick={() => handleMenuClick("/profile")}>Account Settings</MenuItem>
                    <MenuItem onClick={() => handleMenuClick("/")}>Logout</MenuItem>
                  </Menu>
                </>
              )
            }
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header);