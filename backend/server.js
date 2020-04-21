const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();
const productRoutes = express.Router();

let Vendor = require('./models/vendor');
let Customer = require('./models/customer');
let Product = require('./models/product');
let Order = require('./models/order');

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

// Getting all the products for a particular vendor
userRoutes.route('/show_product_listing').post(function(req, res) {
    // console.log('herere')
    // {"quantity": {$gte: 1}}
    Product.find(({"vendor_email" : req.body.current_vendor_email,"quantity": {$gte: 1}}), function(err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log(users)
            res.json(users);
        }
    });
});


// Getting all the orders for a particular vendor
userRoutes.route('/show_orders_vendor').post(function(req, res) {
    // console.log('herere')
    Order.find(({"seller" : req.body.current_vendor_email}), function(err, users) {
        if (err) {
            console.log(err);
        } else {
            // console.log(users)
            res.json(users);
        }
    });
});





// Getting dispatched orders for a particular vendor
userRoutes.route('/show_dispatched_vendor').post(function(req, res) {
    // console.log('herere')
    Order.find(({"seller" : req.body.current_vendor_email,"status" : "dispatched"}), function(err, users) {
        if (err) {
            console.log(err);
        } else {
            // console.log(users)
            res.json(users);
        }
    });
});





// ready to dispatch orders for a particular vendor
userRoutes.route('/ready_to_dispatch').post(function(req, res) {
    // console.log('herere')
    Product.find(({"vendor_email" : req.body.current_vendor_email,"status_pro" : "placed"}), function(err, users) {
        if (err) {
            console.log(err);
        } else {
            // console.log(users)
            res.json(users);
        }
    });
});




// Getting all the products
userRoutes.route('/show_all_products').post(function(req, res) {
    // console.log('herere')
    Product.find(({"quantity": {$gte: 1}}), function(err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log(users)
            res.json(users);
        }
    });
});



// Getting all the placed orders
userRoutes.route('/show_placed_customer').post(function(req, res) {
    // console.log('herere')
    // var email_user = localStorage.getItem('email_current_user')
    Order.find(({"status" : "placed","buyername": req.body.email}), function(err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log(users)
            res.json(users);
        }
    });
});



// Getting all the waiting products
userRoutes.route('/show_waiting_customer').post(function(req, res) {
    // console.log('herere')
    // var email_user = localStorage.getItem('email_current_user')
    Order.find(({"status" : "waiting", "buyername" : req.body.email}), function(err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log(users)
            res.json(users);
        }
    });
});



// Getting all the dispatched orders
userRoutes.route('/show_dispatched_customer').post(function(req, res) {
    // console.log('herere')
    // var email_user = localStorage.getItem("email_current_user")
    Order.find(({"status" : "dispatched","buyername" : req.body.email}), function(err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log(users)
            res.json(users);
        }
    });
});


// Getting the products with a particular product name
userRoutes.route('/show_products_search').post(function(req, res) {
    // console.log('herere')
    Product.find(({"productname" : req.body.search_query,"quantity": {$gte: 1}}), function(err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log(users)
            res.json(users);
        }
    });
});


// // Getting/Adding orders
// userRoutes.route('/order_placed').post(function(req, res) {
//     // console.log('herere')
//     Product.find(({}), function(err, users) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(users)
//             res.json(users);
//         }
//     });
// });



// Adding a new user
userRoutes.route('/add').post(function(req, res) {
    
    console.log(req.body)
    console.log("Start")
    console.log(req.body.User_type)
    // let current_user = new Vendor(req.body);
    if(req.body.User_type === 'Vendor')
    {
        console.log("its a vendor")
        let current_user = new Vendor(req.body);
        console.log(current_user)
        current_user.save()
            .then(current_user => {
                res.status(200).json({'User': 'User added successfully'});
            })
            .catch(err => {
                res.status(400).send('Error');
            });
        
    } 
    else if(req.body.User_type === 'Customer')
    {
        let current_user = new Customer(req.body);
        console.log(current_user)
        current_user.save()
            .then(current_user => {
                res.status(200).json({'User': 'User added successfully'});
            })
            .catch(err => {
                res.status(400).send('Error');
            });
    }
});





// Adding a new product
userRoutes.route('/addproduct').post(function(req, res) {
    
    console.log(req.body)
    console.log("Start")
    // console.log(req.body.User_type)
    // let current_user = new Vendor(req.body);
    // if(req.body.User_type === 'Vendor')
        // console.log("its a vendor")
        let current_product = new Product(req.body);
        // console.log(current_product)
        current_product.save()
            .then(current_product => {
                res.status(200).json({'Product': 'Product added successfully'});
            })
            .catch(err => {
                res.status(400).send('Error');
            });
});




// Getting info about procduct whose order is placed
userRoutes.route('/info_product').post(function(req, res) {
    // console.log('herere')
    Product.findOne(({"productname" : req.body.productname, "vendor_email" : req.body.seller}), 'productname price quantity vendor_email', function(err, users) {
        if (err) {
            console.log(err);
        } else {
            // console.log('wow')
            // console.log(users)
            res.json(users);
        }
    });
});





// Changing product quantity after order is placed
userRoutes.route('/order_placed_chng_quan').post(function(req, res) {
    // console.log("owo")
    // Product.find(({}),)
    // let new_product = Product (req.body);
    var val = req.body.quantity
    Product.findOneAndUpdate({productname: req.body.productname, "vendor_email" : req.body.seller},{ "quantity" : req.body.quantity  }, (err, docs) => {
        if(err) {
            return res.send( {
                message: 'server error'
            })
        }
        return res.send({
            message: 'updated'
        })
    })
    // return res.send
});





// Changing product quantity in orders and updating status after order is placed
userRoutes.route('/order_placed_chng_orders').post(function(req, res) {
    console.log("owo")
    // Product.find(({}),)
    
    // let new_product = Product (req.body);
    var val = req.body.productid
    Order.updateMany({productid: req.body.productid},{ "quantity_remaining" : req.body.quantity_remaining, "status" : req.body.status  }, (err, docs) => {
        if(err) {
            console.log("errrror")
            return res.send( {
                message: 'server error'
            })
        }
        return res.send({
            message: 'updated'
        })
    })
    // return res.send
});



// updating status after order is dispatched
userRoutes.route('/order_chng_status').post(function(req, res) {
    console.log("owo")
    // Product.find(({}),)
    
    // let new_product = Product (req.body);
    var val = req.body.productid
    Order.updateMany({productid: req.body.productid},{  "status" : req.body.status  }, (err, docs) => {
        if(err) {
            console.log("errrror")
            return res.send( {
                message: 'server error'
            })
        }
        return res.send({
            message: 'updated'
        })
    })
    // return res.send
});





//  and updating product status after order is placed
userRoutes.route('/product_chng_status').post(function(req, res) {
    console.log("owo")
    var val = req.body.productid
    Product.updateOne({"_id": req.body.productid},{ "status_pro" : req.body.status  }, (err, docs) => {
        if(err) {
            console.log("errrror")
            return res.send( {
                message: 'server error'
            })
        }
        return res.send({
            message: 'updated'
        })
    })
    // return res.send
});






// Adding a new order
userRoutes.route('/order_placed').post(function(req, res) {
    
    // console.log(req.body)
    // console.log("Start")
    let current_order = new Order(req.body);
    // console.log(current_order)
    current_order.save()
        .then(current_order => {
            res.status(200).json({'Product': 'Product added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});




// userRoutes.route('/add').post(function(req, res) {
//     let user = new User(req.body);
// //     console.log(user)
//     var dbo = db.db("users");
//     dbo.collection("customers").insertOne(user,function(req, res))
//         .then(user => {
//             res.status(200).json({'User': 'User added successfully'});
//         })
//         .catch(err => {
//             res.status(400).send('Error');
//         });
// });





// querying users
userRoutes.route('/find').post(function(req, res) {
    if(req.body.User_type === 'Customer')
    {
        Customer.findOne({email: req.body.email, password : req.body.password, User_type : req.body.User_type},function(err, users) {
            if (err) {
                console.log(err);
            } else {
                res.json(users);
            }
        });    
    }
    else if(req.body.User_type === 'Vendor')
    {
        Vendor.findOne({email: req.body.email, password : req.body.password, User_type : req.body.User_type},function(err, users) {
            if (err) {
                console.log(err);
            } else {
                res.json(users);
            }
        });    
    }
});







// Getting a user by id
// userRoutes.route('/:id').get(function(req, res) {
//     let id = req.params.id;
//     User.findById(id, function(err, user) {
//         res.json(user);
//     });
// });

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
