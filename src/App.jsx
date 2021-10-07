import Home from "./pages/Home";
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Cart from "./pages/Cart";
import Pay from './pages/Pay';
import Success from './pages/Success';
import './App.css';
import { useSelector } from "react-redux";


const App = () => {
  const user = useSelector(state => state.user.currentUser)
  return (
    <Router>
      <Switch>
        <Route path='/pay' component={Pay}/>
        <Route path='/success' component={Success}/>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/products'>
          <ProductList />
        </Route>
        <Route path='/product/:id'>
          <Product />
        </Route>
        <Route path='/login'>
          {user ? <Redirect to='/' /> : <Login />}
        </Route>
        <Route path='/register'>
          {user ? <Redirect to='/' /> : <Register />}
        </Route>
        <Route path='/cart'>
          <Cart />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;