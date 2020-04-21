import React, {Component} from 'react';
import axios from 'axios';

export default class Show_product_listing extends Component {
    
    constructor(props) {
        super(props);
        this.state = {products: []}
    }

    componentDidMount() {
        const vendor_email= {
            current_vendor_email : localStorage.getItem('email_current_user')
        }
        axios.post('http://localhost:4000/show_product_listing',vendor_email)
             .then(response => {
                 this.setState({products: response.data});
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
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity Remaining</th>
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