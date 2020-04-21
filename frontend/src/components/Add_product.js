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

class Add_product extends Component {
    constructor() {
        super()
        this.state = {
            productname: '',
            price: '',
            quantity: '',
            vendor_email: localStorage.getItem('email_current_user'),
            status_pro :'',
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
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
        // console.log(this.state.firstName)
        const newProduct = {
            productname : this.state.productname,
            price : this.state.price,
            quantity : this.state.quantity,
            vendor_email : this.state.vendor_email,
            status_pro : "not ordered"
        }
        console.log(newProduct)
        //////////////
        Axios.post('http://localhost:4000/addproduct',newProduct)
            .then(res => console.log(res.data,"done!!",newProduct));

        this.setState({
            productname: '',
            price: '',
            quantity: '',
            // vendor_email: '',
        });
        console.log("wow1")
    }
    render() {
        const { classes } = this.props;

        return (
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {/* <Avatar className={classes.avatar}> */}
                {/* <LockOutlinedIcon /> */}
                {/* </Avatar> */}
                <Typography component="h1" variant="h5">
                Add a product
                </Typography>
                <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                    <TextField
                        autoComplete="proname"
                        name="productname"
                        variant="outlined"
                        required
                        fullWidth
                        id="proname"
                        label="Product Name"
                        value = {this.state.productname}
                        autoFocus
                        onChange = {this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="Price"
                        label="Price"
                        name="price"
                        autoComplete="price"
                        value = {this.state.price}

                        onChange = {this.handleChange}

                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="quantity"
                        label="Quantity"
                        id="quantity"
                        autoComplete="quantity"
                        value = {this.state.quantity}

                        onChange = {this.handleChange}

                    />
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
                    Submit
                </Button>
                </form>
            </div>
            {/* <Box mt={5}>
                <Copyright />
            </Box> */}
            </Container>
        );
    }
}

export default withStyles(styles)(Add_product);
