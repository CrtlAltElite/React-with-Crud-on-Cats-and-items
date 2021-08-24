
import React, { Component } from 'react'
import ItemCard from '../components/ItemCard'
import {getItem} from '../api/apiItems';


export default class SingleItem extends Component {
    constructor() {
        super();
        this.state={
            item:false
        }
    }

    async componentDidMount() {
        const item=await getItem(localStorage.getItem('token'),this.props.match.params.id)
        if (item===400){this.setState({tokenError:true,serverErrorItems:false})}
        if (item===500){this.setState({serverErrorItems:true, tokenError:false})}
        if (item !== 500 || item !== 400){
            this.setState({item})
        }
    }

    render() {
        return (
            <div>
                {console.log(this.props.match.params.id)}
                {this.state.item
                ?

                    <ItemCard item={this.state.item}/>
                :
                    ''
                }
            </div>
        )
    }
}
