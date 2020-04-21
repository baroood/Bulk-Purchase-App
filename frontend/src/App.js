// import React from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css"

// import UsersList from './components/users-list.component'
// import CreateUser from './components/create-user.component'


// function App() {
//   return (
//     <Router>
//       <div className="container">
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//           <Link to="/" className="navbar-brand">App</Link>
//           <div className="collapse navbar-collapse">
//             <ul className="navbar-nav mr-auto">
//               <li className="navbar-item">
//                 <Link to="/" className="nav-link">Users</Link>
//               </li>
//               <li className="navbar-item">
//                 <Link to="/create" className="nav-link">Create User</Link>
//               </li>
//             </ul>
//           </div>
//         </nav>

//         <br/>
//         <Route path="/" exact component={UsersList}/>
//         <Route path="/create" component={CreateUser}/>
//       </div>
//     </Router>
//   );
// }

// export default App;






import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Dashboard_customer from './components/Dashboard_customer'
import Dashboard_vendor from './components/Dashboard_vendor'
import Add_product from './components/Add_product'
import Show_product_listing from './components/Show_product_listing'
import Show_orders_vendor from './components/Show_orders_vendor'
import Show_dispatched_vendor from './components/Show_dispatched_vendor'
import Show_products_search from './components/Show_products_search'
import Show_all_products from './components/Show_all_products'

import Ready_to_dispatch from './components/Ready_to_dispatch'

import Show_dispatched_customer from './components/Show_dispatched_customer'
import Show_placed_customer from './components/Show_placed_customer'
import Show_waiting_customer from './components/Show_waiting_customer'
import { render } from 'react-dom';
function App() {
  {
  return (
    <Router>
      <div className="container">
        <br/>
        <Route exact path='/' component={SignIn}>
        </Route>
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} />
        <Route path='/dashboard_customer' component={Dashboard_customer} />
        <Route path='/dashboard_vendor' component={Dashboard_vendor} />
        <Route path='/dashboard_vendor/add_a_product' component={Add_product} />
        <Route path='/dashboard_vendor/show_product_listing' component={Show_product_listing} />
        <Route path='/dashboard_vendor/show_orders_vendor' component={Show_orders_vendor} />
        <Route path='/dashboard_vendor/show_dispatched_vendor' component={Show_dispatched_vendor} />
        <Route path='/dashboard_customer/show_products_search' component={Show_products_search} />
        <Route path='/dashboard_customer/show_all_products' component={Show_all_products} />



        <Route path='/dashboard_vendor/ready_to_dispatch' component={Ready_to_dispatch} />


        <Route path='/dashboard_customer/show_dispatched_customer' component={Show_dispatched_customer} />
        <Route path='/dashboard_customer/show_placed_customer' component={Show_placed_customer} />
        <Route path='/dashboard_customer/show_waiting_customer' component={Show_waiting_customer} />
        
        {/* <Route path='/dashboard' component={Dashboard} /> */}
        {/* <Route path='/signin' component={SignIn} /> */}
        {/* <Route path="/" exact component={UsersList}/>
        <Route path="/create" component={CreateUser}/> */}
      </div>
    </Router>
  );
}
}
export default App;
