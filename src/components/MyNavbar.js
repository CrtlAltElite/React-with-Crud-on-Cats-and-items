import React, { Component} from 'react'
import {Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import {Link} from "react-router-dom"

export default class MyNavbar extends Component {

    render() {
        return (
       
                <Navbar bg="dark" variant="dark">
                    <Container>
                    <Navbar.Brand as={Link} to="/">FakeShop</Navbar.Brand>
                    <Nav className="me-auto">
                    {this.props.token?
                        <>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/page2">Page2</Nav.Link>
                        <Nav.Link as={Link} to="/page3">Page3</Nav.Link>
                        <Nav.Link as={Link} to="/example">Example</Nav.Link>
                        <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
                        <Nav.Link as={Link} to="/logout">Logout</Nav.Link>

                        {/* admin dropdown TODO: Admin Only*/}
                        {this.props.isAdmin?
                        <NavDropdown title="Admin" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/createitems">Create Item</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/edititems">Edit Item</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/createcats">Create Category</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/editcats">Edit Category</NavDropdown.Item>
                        </NavDropdown>
                        :''}
                        {/* admin dropdown end */}
                        </>

                    :
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    }
                    </Nav>
                    <span className="float-end" style={{color:'white'}}>total: {this.props.getCartTotalPrice().toFixed(2)}, items: {this.props.getCartItemTotal()}</span>
                    </Container>
                </Navbar>
          
        )
    }
}
