import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { render } from '@testing-library/react';
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import Dashboard_customer from './Dashboard_customer';
// import { withStyles } from '@material-ui/core/styles';  
const styles = (theme => ({
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
// const styles = (theme => ({
// root: {
//     flexGrow: 1,
// },
// menuButton: {
//     marginRight: theme.spacing(2),
// },
// title: {
//     flexGrow: 1,
// },
// }));

class Dashboard_vendor extends Component
{
    constructor()
    {
        super()
        this.add_product = this.add_product.bind(this)
        this.redirect_to_signin = this.redirect_to_signin.bind(this)
        this.show_product_listing = this.show_product_listing.bind(this)
        this.show_orders_vendor = this.show_orders_vendor.bind(this)
        this.show_dispatched_vendor = this.show_dispatched_vendor.bind(this);
        this.ready_to_dispatch = this.ready_to_dispatch.bind(this);
    }
    show_dispatched_vendor(event)
    {
        this.props.history.push("/dashboard_vendor/show_dispatched_vendor")
    }
    add_product(event)
    {
        this.props.history.push("/dashboard_vendor/add_a_product")
    }
    redirect_to_signin(event)
    {
        // vendor_email: localStorage.getItem('email_current_user'),

        localStorage.setItem('email_current_user','')
        localStorage.setItem('name_current_user','')
        this.props.history.push("/signin")
    }
    show_product_listing(event)
    {
        this.props.history.push("/dashboard_vendor/show_product_listing")
    }
    show_orders_vendor(event)
    {
        this.props.history.push("/dashboard_vendor/show_orders_vendor")
    }
    ready_to_dispatch(event)
    {
        console.log("qq")
        this.props.history.push("/dashboard_vendor/ready_to_dispatch")
    }
    render()
    {
        const { classes } = this.props;

        return(
            <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            <button onClick={this.add_product}>
                Add a product
            </button>
            </Typography>

            <Typography variant="h6" className={classes.title}>
            <button onClick={this.show_product_listing}>
            Product listing
            </button>
            </Typography>

            <Typography variant="h6" className={classes.title}>
            <button onClick ={this.ready_to_dispatch}>
                Ready to dispatch
            </button>
            </Typography>
            
            {/* <Typography variant="h6" className={classes.title}>
            <button onClick={this.show_orders_vendor}>
            All orders    
            </button>
            </Typography> */}
            
            <Typography variant="h6" className={classes.title}>
            <button onClick={this.show_dispatched_vendor}>
            Dispatched orders    
            </button>
            </Typography>
            
            <Button color="inherit" onClick={this.redirect_to_signin} >
                Logout
            </Button>
        </Toolbar>
        </AppBar>
        )
    }
}
export default withStyles(styles)(Dashboard_vendor );