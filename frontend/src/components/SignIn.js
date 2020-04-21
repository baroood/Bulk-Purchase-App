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
import Dashboard_customer from './Dashboard_customer'
import Dashboard_vendor from './Dashboard_vendor'

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignIn extends Component{
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            User_type: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.redirect_to_signup = this.redirect_to_signup.bind(this)
     
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
        // console.log(this.state.email,"wow",this.state.email,"wow")
        const newUser = {
            email : this.state.email,
            password : this.state.password,
            User_type: this.state.User_type
        }
        // console.log(newUser.email)
    
        //some query

        Axios.post('http://localhost:4000/find',newUser)
            .then(res =>{

             console.log(res.data)
             if(res.data)
             {
                 console.log("User logged in")
                 localStorage.setItem('name_current_user',res.data.name)
                 localStorage.setItem('email_current_user',res.data.email)

                 if(newUser.User_type === 'Customer')
                 {
                     this.props.history.push("/dashboard_customer");
                 }
                 else if(newUser.User_type === 'Vendor')
                 {
                    this.props.history.push("/dashboard_vendor");
                 }
             }
             else
             {
                console.log("User NOT logged in")
                this.props.history.push("/signup");

             }
            });

        this.setState({
            email : '',
            password: '',
            User_type: '',
        });
        }
    redirect_to_signup(event)
    {
        this.props.history.push("/signup")
    }
// export default function SignIn() {
//   const classes = useStyles();
    render()
    {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange = {this.handleChange}

            />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange = {this.handleChange}
            />

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
                    Customer
                </Grid>

                <Grid item xs = {12} sm = {12}>
                    <input
                        type= 'radio'
                        name='User_type'
                        value='Vendor'
                        checked = {this.state.User_type === 'Vendor'}
                        onChange = {this.handleChange}
                    />
                    Vendor
                </Grid>
            </Grid>
            <br />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {this.onSubmit}
            >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              {/* <Link href="#" variant="body2"> */}
              <button onClick={this.redirect_to_signup}>
                "Don't have an account? Sign Up"

              </button>
              {/* </Link> */}
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
}
export default withStyles(styles)(SignIn);
