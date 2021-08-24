import React, { Component } from 'react'

export default class Page2 extends Component {

    constructor() {
        super();
        this.state={
            user:''
        };
    }

    render() {
        return (
            <div>
                test: {this.props.test}<br/>
                the user is {this.props.user}
                <br/>
                <input onChange={(event)=>{this.setState({'user':event.target.value})}}></input>
                <button onClick={()=>this.props.setUser(this.state.user)}>Submit</button>
            </div>
        )
    }
}
