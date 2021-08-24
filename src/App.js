import { Switch, Route } from 'react-router-dom';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/MyNavbar'
import './App.css';
import { Container } from 'react-bootstrap'
import Home from './views/Home'
import Example from './views/Example'
import Login from './views/Login'
import Logout from './views/Logout'
import Page2 from './views/Page2'
import Page3 from './views/Page3'
import Shop from './views/Shop'
import SingleItem from './views/SingleItem'
import CreateItems from './views/CreateItems'
import EditItems from './views/EditItems'
import CreateCats from './views/CreateCats'
import EditCats from './views/EditCats'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import {getIsAdmin} from './api/apiAdmin'



export default class App extends Component {
  
  constructor() {
    super();
    this.state={
      isAdmin:false,
      user:"",
      cart:{}
    };
  }
  

  static getDerivedStateFromProps=(props, state)=>{
    return {token:localStorage.getItem('token')}
  }
  
  addToCart=(item)=>{
    let cart= this.state.cart
    if (cart[item.name]){
      cart[item.name]={...item, quanity:cart[item.name].quanity+=1}
    }
    else{
      cart[item.name] = {...item, quanity:1}
    }
    this.setState({cart})
    alert(`Thanks for adding ${item.name} to your cart`)
  }

  getCartTotalPrice=()=>{
    let total=0
    for (const item in this.state.cart){
        total+=this.state.cart[item].price*this.state.cart[item].quanity
    }
    return total
  }

  getCartItemTotal=()=>{
    let total=0
    for (const item in this.state.cart){
        total+=this.state.cart[item].quanity
    }
    return total
  }

  componentDidMount() {
    if (this.state.token){this.getIsAdmin()}
  }

  setUser = (user) => {this.setState({user:user},()=>console.log("User is",this.state.user));}
  setToken = (token) => {this.setState({token},this.getIsAdmin)}

  getIsAdmin=()=>{
    const isAdmin=async ()=>{
      let res=await getIsAdmin(localStorage.getItem('token'))
      if (res === 500 || res ===400){res=false}
      console.log("isAdmin",res)
      this.setState({isAdmin:res})
    }
    isAdmin()
  }

  doLogout = () =>{
    localStorage.setItem("token",'')
    this.setToken('');
    this.setState({isAdmin:false})

  }

  
  render (){
    return(
      <>
        <MyNavbar token={this.state.token} isAdmin={this.state.isAdmin} getCartTotalPrice={this.getCartTotalPrice}  getCartItemTotal={this.getCartItemTotal}/>
        <Container id="content_container">
          <Switch> 
            <ProtectedRoute exact path ="/" token={this.state.token} render={()=><Home/>} />
            <ProtectedRoute exact path ="/page2" token={this.state.token} render={()=><Page2 setUser={this.setUser} user={this.state.user} test="It works" />} />
            <ProtectedRoute exact path ="/page3" token={this.state.token} render={()=><Page3 user={this.state.user}/>} />
            <ProtectedRoute exact path ="/example" token={this.state.token} render={()=><Example/>} />
            <ProtectedRoute exact path ="/shop" token={this.state.token} render={()=><Shop addToCart={this.addToCart}/>} />
            <ProtectedRoute exact path ="/item:id" token={this.state.token} render={(props)=><SingleItem {...props}/>} />
           
            <AdminRoute exact path ="/createcats" isAdmin={this.state.isAdmin} token={this.state.token} render={()=><CreateCats/>} />
            <AdminRoute exact path ="/editcats" isAdmin={this.state.isAdmin} token={this.state.token} render={()=><EditCats/>} />

            <AdminRoute exact path ="/createitems" isAdmin={this.state.isAdmin} token={this.state.token} render={()=><CreateItems/>} />
            <AdminRoute exact path ="/edititems" isAdmin={this.state.isAdmin} token={this.state.token} render={()=><EditItems/>} />
            
            
            <Route exact path ="/login" render={()=><Login setToken={this.setToken}/>} />
            <ProtectedRoute exact path ="/logout" token={this.state.token} render={()=><Logout doLogout={this.doLogout}/>}/>
          </Switch>
        </Container>
      </>
      
    )
  };
}