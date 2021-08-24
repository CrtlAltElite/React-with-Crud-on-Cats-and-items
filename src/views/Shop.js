import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import {getCategories} from '../api/apiCategory';
import {getItems, getItemsByCat} from '../api/apiItems';
import {Col, Row, Button} from 'react-bootstrap';
import ItemCard from '../components/ItemCard';
import {titleCase} from '../helpers'
export default class Shop extends Component {
    constructor() {
        super();
        this.state={
            categories:[],
            items:[],
            serverErrorCats:false,
            serverErrorItems:false,
            tokenError:false,
            itemStart:0,
            itemEnd:11,
    };
    }

    getAllItems=async ()=>{
        const items=await getItems(localStorage.getItem('token'))
        if (items===400){this.setState({tokenError:true,serverErrorItems:false})}
        if (items===500){this.setState({serverErrorItems:true, tokenError:false})}
        if (items !== 500 || items !== 400){
            this.setState({items:items})
        }
    }

    getAllCats=async ()=>{
        const cats=await getCategories(localStorage.getItem('token'))
        if (cats===400){this.setState({tokenError:true,serverErrorCats:false})}
        if (cats===500){this.setState({serverErrorCats:true, tokenError:false})}
        if (cats !== 500 || cats !== 400){
            console.log("cats: ", cats);
            this.setState({categories:cats})
        }
    }

    async componentDidMount() {
        await this.getAllCats()
        await this.getAllItems()
    }

    handleCat = async (id) => {
        if (id===0){
            return await this.getAllItems()
        }
        const items=await getItemsByCat(localStorage.getItem('token'),id)
        if (items===400){this.setState({tokenError:true,serverErrorItems:false})}
        if (items===500){this.setState({serverErrorItems:true, tokenError:false})}
        if (items !== 500 || items !== 400){
            console.log(items)
            this.setState({items:items})
        }

    }
    handlePrev=()=>{
        const oldStart=this.state.itemStart
        const oldEnd=this.state.itemEnd
        this.setState({itemStart:oldStart-10,
                        itemEnd:oldEnd-10})
        
    }
    handleNext=()=>{        
        const oldStart=this.state.itemStart
        const oldEnd=this.state.itemEnd
        this.setState({itemStart:oldStart+10,
                        itemEnd:oldEnd+10})}
    render() {
        const styles={
            catButton:{
                backgroundColor:'white',
                color: 'black',
                width: '100%',
                border: '1px solid grey',
                borderRadius: '15px',
                marginBottom: '5px',
            }
        }

        return (
            <div>
                {this.state.serverErrorCats?<small style={{color:"red"}}>Error try again later</small>:''}
                {this.state.tokenError?<Redirect to='/login'/>:''}                  
                    <Row>
                        <Col md={3}>
                        <center><h3>Categories</h3></center>
                        <hr/>
                        <ul style={{listStyleType:'none'}}>
                            <li><button style={styles.catButton} onClick={()=>this.handleCat(0)}>All Items</button></li>
                            {this.state.categories.length>0?this.state.categories?.map((c)=><li key={c.id}><button style={styles.catButton} onClick={()=>this.handleCat(c.id)}>{titleCase(c.name)}</button></li>):''}<br/>
                        </ul>
                        </Col>
                        <Col md={9}>
                        <Row>
                                {this.state.items?.slice(this.state.itemStart,this.state.itemEnd).map((i)=><ItemCard item={i} key={i.id} addToCart={this.props.addToCart}/>)}
                        </Row>
                    <div className="d-flex justify-content-center">
                        <Button variant="danger" onClick={()=>this.handlePrev()} className={" me-2 " + (this.state.itemStart===0 ? "disabled" : '')}> {"<< Prev"} </Button>
                        <Button variant="success" onClick={()=>this.handleNext()} className={" " + (this.state.items?.length<this.state.itemEnd?"disabled":'')}> {"Next >>"} </Button>
                    </div>
                        </Col>
                    </Row>

                {/* display categories along top link to only grab by category

                show first 10 items in shop

                    display card component for every item
                                for items missing img show placeholder image


                add back/next button */}

            </div>
        )
    }
}
