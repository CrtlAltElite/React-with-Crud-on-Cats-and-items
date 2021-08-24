import React, { Component } from 'react'
import { Card, Button, Col } from 'react-bootstrap'
import {titleCase} from '../helpers'
import {Redirect} from 'react-router-dom'


export default class ItemCard extends Component {
    constructor() {
        super();
        this.state={
            clicked:false
        }
    }
    renderItem=()=>{
        this.setState({clicked:true})
    }
    render() {
        return (
            <Col>
            {this.state.clicked ? <Redirect to={`/item${this.props.item.id}`}></Redirect>:''}
                <Card style={{width:'150px', marginBottom:"25px"}}>
                <Card.Img variant="top" style={{height:"100px", objectFit: "contain"}} alt={this.props.item.name+" image"} src={this.props.item.img ?? 'https://res.cloudinary.com/cae67/image/upload/v1629310111/fakebook_shop/no-image_nkau78.png'}/>
                    <Card.Body>
                        <Card.Title>{titleCase(this.props.item.name) ?? "Generic Item"}</Card.Title>
                        <Card.Text style={{height:"100px"}}>
                            {this.props.item.description ?? 'Sorry No Description'}
                        </Card.Text>
                        <Card.Subtitle className="float-end">${this.props.item.price ?? '?.??'}</Card.Subtitle><br/>
                        <button onClick={()=>this.renderItem()}> see more </button>
                        <Button variant="primary" onClick={()=>this.props.addToCart(this.props.item)}>Add to Cart</Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}
