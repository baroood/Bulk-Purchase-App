// import React, {Component} from 'react';
import axios from 'axios';
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
// import Axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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
export default class Ready_to_dispatch extends Component {
    
    constructor(props) {
        super(props);
        this.state = {orders: []}
        this.dispatch_product = this.dispatch_product.bind(this);
        // console.log("ww")
    }
    dispatch_product(info)
    {
        // this.props.history.push("/dashboard_vendor/show_dispatched_vendor")
        const info3 = {
            status : "dispatched",
            // quantity_remaining : info2.quantity,
            productid : info.productid,
        }
        axios.post('http://localhost:4000/product_chng_status',info3)
            .then(response => {
                console.log(response.data,"world1")
                
                axios.post('http://localhost:4000/order_chng_status',info3)
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
    componentDidMount() {
        // console.log("ww")
     
        const vendor_email= {
            current_vendor_email : localStorage.getItem('email_current_user')
        }
        axios.post('http://localhost:4000/ready_to_dispatch',vendor_email)
             .then(response => {
                 this.setState({orders: response.data});
             })
             .catch(function(error) {
                 console.log(error,"hello");
             })
    }
    render() {
        const { classes } = this.props;
        return (

            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Item</th>
                            {/* <th>Quantity</th> */}
                            {/* <th>Seller</th> */}
                            {/* <th>Buyer</th> */}
                            <th>Dispatch</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.orders.map((currentProduct, i) => {
                            return (
                                <tr>
                                    <td>{currentProduct.productname}</td>
                                    {/* <td>{currentOrder.quantity}</td> */}
                                    {/* <td>{currentOrder.seller}</td> */}
                                    {/* <td>{currentOrder.buyername}</td> */}
                                    <td>

                                        <Typography variant="h6">
                                        <button onClick={this.dispatch_product({
                                            productid : currentProduct._id,
                                            productname : currentProduct.productname,

                                        })}>
                                        Dispatch    
                                        </button>
                                        </Typography>
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