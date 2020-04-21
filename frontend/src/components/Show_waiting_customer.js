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
export default class Show_waiting_customer extends Component {
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
        console.log("email : ",info.email)
        axios.post('http://localhost:4000/show_waiting_customer',info)
             .then(response => {
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error,"hello");
             })
        
    }
    onSubmit(info)
    {
        var ini_quan = 0
        console.log(info)
        axios.post('http://localhost:4000/info_product',info)
             .then(response => {
                 console.log(response.data,"ww")
                //  if(response.data.quantity < info.quantity)
                //  {
                //      alert("Invalid qunatity")
                //      return
                //  }
                console.log(info.quantity_remaining,info.new_quantity,info.quantity)
                if(info.quantity_remaining - ( info.new_quantity - info.quantity )<0 )
                {
                    alert("Invalid qunatity")
                    return
                }
                // else
                // {
                    
                // }
                // console.log("p")
               //  this.setState({order_placed: response.data});
                // response.data.quantity
                // response.data.quantity = 10
                axios.post('http://localhost:4000/order_placed',info)
                .then(response => {
                console.log(response.data,"ww")
                     this.setState({order_placed: response.data});
                })
                .catch(function(error) {
                    console.log(error,"hello");
                })

                
                axios.post('http://localhost:4000/info_product',info)
                .then(response => {
                    // ini_quan = response.data.quantity
                    ini_quan = info.quantity_remaining
                    console.log("this is productquan before",ini_quan)
                    var quan = ini_quan - info.quantity
                    info.quantity = ini_quan
                    // if(quan>0)
                    const info2 = {
                        productname : info.productname,
                        productid : info.productid,
                        quantity : quan,
                        seller : info.seller,
                        buyername : info.buyername,
                        // status: "waiting",
                        // quantity_remaining: quan,
                    }
                    axios.post('http://localhost:4000/order_placed_chng_quan',info2)
                    .then(response => {
                        console.log(response.data,"ww")
                        if(info2.quantity > 0)
                        {
                            const info3 = {
                                status : "waiting",
                                quantity_remaining : info2.quantity,
                                productid : info2.productid,
                            }
                            axios.post('http://localhost:4000/order_placed_chng_orders',info3)
                            .then(response => {
                                console.log(response.data,"world1")

                                axios.post('http://localhost:4000/product_chng_status',info3)
                                .then(response => {
                                    console.log(response.data,"world4")
                                })
                                .catch(function(error) {
                                    console.log(error,"hello");
                                })
                                
                            })
                            .catch(function(error) {
                                console.log(error,"hello");
                            })        
                        }
                        else
                        {
                            const info3 = {
                                status : "placed",
                                quantity_remaining : info2.quantity,
                                productid : info2.productid,
                            }
                            axios.post('http://localhost:4000/order_placed_chng_orders',info3)
                            .then(response => {
                                console.log(response.data,"world2")
                            
                                axios.post('http://localhost:4000/product_chng_status',info3)
                                .then(response => {
                                    console.log(response.data,"world1")
                                })
                                .catch(function(error) {
                                    console.log(error,"hello");
                                })
                            })
                            .catch(function(error) {
                                console.log(error,"hello");
                            })        
                        }
                        //  this.setState({order_placed: response.data});
                    })
                    .catch(function(error) {
                        console.log(error,"hello");
                    })
                    
                    //  this.setState({order_placed: response.data});
                })
                .catch(function(error) {
                    console.log(error,"hello");
                })
                
                // console.log(info2)
            })
            .catch(function(error) {
                console.log(error,"hello");
            })
                
                
            }
            handleChange(event, id) {
                const name = event.target.name
                const value = event.target.value
                // if(this.state.value >)
                this.setState({
                    [id]: value
                }, () => {
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
                            <th>Remaining</th>
                            <th>Change quantity</th>
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
                                    <td>{currentProduct.quantity_remaining}</td>
                                    <td>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        // required
                                        fullWidth
                                        id="order_quan"
                                        label="New quantity"
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
                                            new_quantity : this.state[currentProduct._id],
                                            seller : currentProduct.vendor_email,
                                            buyername : localStorage.getItem('email_current_user'),
                                            status: "waiting state",
                                            quantity_remaining: currentProduct.quantity_remaining,
                                            price : currentProduct.price,
                                            quantity : currentProduct.quantity,
                                            orderid : currentProduct._id
                                        })}
                                    >
                                        Submit
                                    </Button>
                                    </td>
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