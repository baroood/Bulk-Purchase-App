import React, {Component} from 'react';
import axios from 'axios';

export default class Show_orders_vendor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {orders: []}
    }

    componentDidMount() {
        const vendor_email= {
            current_vendor_email : localStorage.getItem('email_current_user')
        }
        axios.post('http://localhost:4000/show_orders_vendor',vendor_email)
             .then(response => {
                 this.setState({orders: response.data});
             })
             .catch(function(error) {
                 console.log(error,"hello");
             })
    }
    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            {/* <th>Seller</th> */}
                            <th>Buyer</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.orders.map((currentOrder, i) => {
                            return (
                                <tr>
                                    <td>{currentOrder.productname}</td>
                                    <td>{currentOrder.quantity}</td>
                                    {/* <td>{currentOrder.seller}</td> */}
                                    <td>{currentOrder.buyername}</td>
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