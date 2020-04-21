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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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
class Dashboard_customer extends Component
{
    constructor()
    {
        super()
        this.redirect_to_signin = this.redirect_to_signin.bind(this)
        this.show_all_products = this.show_all_products.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.show_dispatched_customer = this.show_dispatched_customer.bind(this)
        this.show_placed_customer = this.show_placed_customer.bind(this)
        this.show_waiting_customer = this.show_waiting_customer.bind(this)

        this.state = {
          search_text: ""
        }
    }
    redirect_to_signin(event)
    {

        localStorage.setItem('email_current_user','')
        localStorage.setItem('name_current_user','')
        this.props.history.push("/signin")
    }
    show_all_products(event)
    {
        this.props.history.push("/dashboard_customer/show_all_products")
    }
    handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            [name]: value
        }, () => {
            console.log(this.state)
        })
    }
    onSubmit(text)
    {
      console.log("S",document.getElementById('search_text',"e"))
        localStorage.setItem("search_query",this.state.search_text)
        console.log("31",localStorage.getItem("search_query"),"12")
        this.props.history.push("/dashboard_customer/show_products_search")
        this.setState({
          search_query :""
        })
        window.location.reload()
    }
    show_dispatched_customer()
    {
      this.props.history.push("/dashboard_customer/show_dispatched_customer")
    }
    
    show_placed_customer()
    {
      this.props.history.push("/dashboard_customer/show_placed_customer")
    }
    
    show_waiting_customer()
    {
      this.props.history.push("/dashboard_customer/show_waiting_customer")
    }
    render()
    {
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;

        return(
            <div>
            <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            <button onClick={this.show_all_products}>
                Show all products
            </button>
            </Typography>

            <Typography variant="h6" className={classes.title}>
            <button onClick= {this.show_waiting_customer} >
            Waiting State
            </button>
            </Typography>

            <Typography variant="h6" className={classes.title}>
            <button onClick = {this.show_placed_customer} >
            Placed
            </button>
            </Typography>
           
           
            <Typography variant="h6" className={classes.title}>
            <button onClick ={this.show_dispatched_customer} >
            Dispatched
            </button>
            </Typography>


            <Button color="inherit" onClick={this.redirect_to_signin} >
                Logout
            </Button>
        </Toolbar>
        </AppBar>
        <Typography variant="h6" className={classes.title}>
            <TextField
                variant="outlined"
                margin="normal"
                id="search_text"
                label="Search"
                name="search_text"
                autoComplete="search"
                autoFocus
                // backgroundcolor="red"
                // color = "red"
                // bgcolor="red"
                onChange = {this.handleChange}
                // onChange = {(event) => this.handleChange(event, currentProduct._id)}
                value={this.state.search_text}
            />
            <br></br>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                // onClick = {this.onSubmit}
                onClick = {() => this.onSubmit()}
            >
                Search
            </Button>
            </Typography>
        {/* <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card> */}
        </div>
        )
    }
}
export default withStyles(styles)(Dashboard_customer );