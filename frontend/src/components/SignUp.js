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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            User_type : '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.redirect_to_login = this.redirect_to_login.bind(this)
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
    onSubmit(event) {
        event.preventDefault();
        console.log(this.state.firstName)
        const newUser = {
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            email : this.state.email,
            password : this.state.password,
            User_type : this.state.User_type
        }
        console.log(newUser)
        Axios.post('http://localhost:4000/add',newUser)
            .then(res => console.log(res.data,"done!!",newUser));

        this.setState({
            firstName : '',
            lastName : '',
            email : '',
            password: '',
            User_type: '',
        });
        // const name = event.target.name
        // const value = event.target.value
        // this.setState({
        //     [name]: value
        // }, () => {
        //     console.log(this.state)
        // })
        console.log("wow1")
    }
    redirect_to_login(event)
    {
        this.props.history.push("/signin")
    }
    render() {
        const { classes } = this.props;

        return (
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign up
                </Typography>
                <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        onChange = {this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        onChange = {this.handleChange}

                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange = {this.handleChange}

                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange = {this.handleChange}

                    />
                    </Grid>
                    <b>user type</b>
                    <Grid container spacing = {2}>
                    <Grid item xs = {12} sm = {12}>
                        <input
                            type= 'radio'
                            name='User_type'
                            value='Customer'
                            checked = {this.state.User_type === 'Customer'}
                            onChange = {this.handleChange}
                        />
                        <b>Customer</b>
                    </Grid>
                    <Grid item xs = {12} sm = {12}>
                        <input
                            type= 'radio'
                            name='User_type'
                            value='Vendor'
                            checked = {this.state.User_type === 'Vendor'}
                            onChange = {this.handleChange}
                        />
                        <b>Vendor</b>
                    </Grid>
                    </Grid>

                    </Grid>

                {/* </Grid> */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick = {this.onSubmit}
                >
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    {/* <Link href="#" variant="body2"> */}
                    
                    <button onClick = {this.redirect_to_login}>
                        Already have an account? Sign in
                    </button>
                    {/* </Link> */}
                    </Grid>
                </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
            </Container>
        );
    }
}
export default withStyles(styles)(SignUp);