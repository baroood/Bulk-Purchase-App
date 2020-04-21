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
import axios from 'axios';
export default class Show_placed_customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            quantity: 0
        }
        
    }

    componentDidMount() {
        const info ={
            email : localStorage.getItem('email_current_user')
        }
        axios.post('http://localhost:4000/show_placed_customer',info)
             .then(response => {
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error,"hello");
             })
    }
            render()
             {
                return (
                    <div>
                <br></br>
                <br></br>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Vendor</th>
                            {/* <th>Order</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((currentProduct, i) => {
                            return (
                                <tr>
                                    <td>{currentProduct.productname}</td>
                                    <td>{currentProduct.price}</td>
                                    <td>{currentProduct.quantity}</td>
                                    <td>{currentProduct.seller}</td>
                                    {/* <td>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        // required
                                        fullWidth
                                        id="order_quan"
                                        label="Quantity to order"
                                        name="order_quantity"
                                        autoComplete="quantity"
                                        autoFocus
                                        onChange = {(event) => this.handleChange(event, currentProduct._id)}
                                        value={this.state[currentProduct._id]}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick = {() => this.onSubmit({
                                            productname : currentProduct.productname,
                                            productid : currentProduct._id,
                                            quantity : this.state[currentProduct._id],
                                            seller : currentProduct.vendor_email,
                                            buyername : localStorage.getItem('email_current_user'),
                                            status: "waiting state",
                                            quantity_remaining: 1,
                                        })}
                                    >
                                        Submit
                                    </Button>
                                    </td> */}
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}