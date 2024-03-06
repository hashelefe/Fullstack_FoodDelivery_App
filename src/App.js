import './App.css';
import { BrowserRouter, Switch, Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Restaurants from './components/restaurants/Restaurants';
import Cart from './components/cart/Cart';
import Blogs from './components/blog/Blogs';
import BlogDetails from './components/blog/BlogDetails';
import BlogCreate from './components/blog/BlogCreate';
import RestaurantDetails from './components/restaurants/RestaurantDetails';
import BlogEdit from './components/blog/BlogEdit';
import { CartProvider } from './context/CartProvider';
import Orders from './components/Orders';
import Formularz from './components/Formularz'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <CartProvider>
      <Navbar/>
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          
          <Route exact path="/cart">
            <Cart/>
          </Route>

          <Route exact path="/restaurants">
            <Restaurants/>
          </Route>

          <Route exact path="/blogs">
            <Blogs/>
          </Route>

          <Route exact path="/formularz">
            <Formularz/>
          </Route>

          <Route exact path="/blogs/create">
            <BlogCreate/>
          </Route>

          <Route path="/blogs/edit/:id">
            <BlogEdit/>
          </Route>

          <Route path="/blogs/:id">
            <BlogDetails/>
          </Route>

          <Route exact path="/cart">
            <Cart/>
          </Route>

          <Route exact path="/orders">
            <Orders/>
          </Route>

          <Route path="/restaurants/:id">
            <RestaurantDetails/>
          </Route>
        </Switch>
      </div>  
      </CartProvider>
    </div>
    </BrowserRouter>
  );
}

export default App;
