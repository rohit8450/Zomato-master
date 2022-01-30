import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ListingApi from './components/listing/ListingApi'
import Home from './components/Home'
import RestaurantDetailsApi from './components/details/RestaurantDetailsApi'
import ViewOrdersApi from './components/veiworders/ViewOrdersApi'
import RegisterComp from './components/loginRegister/RegisterComp'
import LoginComp from "./components/loginRegister/LoginComp";


const Routing = () => {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/list/:mealId" component={ListingApi} />
        <Route path="/details/:res_id" component={RestaurantDetailsApi} />
        <Route path="/viewOrder" component={ViewOrdersApi} />
        <Route path="/register" component={RegisterComp} />
        <Route path="/login" component={LoginComp} />
      </BrowserRouter>
    );
}


export default Routing;