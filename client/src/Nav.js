import React, { Fragment } from 'react';
import {withRouter} from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      [theme.breakpoints.down("xs")]: {
        flexGrow: 1
      }
    },
    headerOptions: {
      display: "flex",
      flex: 1
    }
  }));
  
  
const Nav = props => {
    const { history } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme =useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClick = (pageUrl) => {
      history.push(pageUrl);
      setAnchorEl(null);
    };
    return (
        <div className={classes.root}>
            <AppBar position="static">
            <Toolbar>
            <div>
            {isMobile ? (
                <Fragment>
                <IconButton 
                edge="start"
                onClick={handleMenu} 
                className={classes.menuButton} 
                color="inherit" 
                aria-label="menu">
                
                <MenuIcon />
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
                    onClose={() => handleClick(null)}
                > 
                    <MenuItem onClick={() => handleClick('/')}>Home</MenuItem> 
                    <MenuItem onClick={() => handleClick('/inputperson')}>Add Person</MenuItem> 
                    <MenuItem onClick={() => handleClick('/list')}>People List</MenuItem>
                </Menu>
                </Fragment>
                ) : (
                    <div className={classes.headerOptions}>
                        <Button variant="contained" onClick={() => handleClick('/')}>Home</Button>
                        <Button variant="contained" onClick={() => handleClick('/inputperson')}>Add Person</Button>
                        <Button variant="contained" onClick={() => handleClick('/list')}>People List</Button>
                    </div>
                    )}
            </div>
         </Toolbar>
        </AppBar>
        </div>
    );
}

export default withRouter(Nav);  