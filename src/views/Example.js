import React, { Component } from 'react'

export default class Example extends Component {
    constructor(){
        super();
        this.state={
            name : 'Pika',
            students: ["Thu","Benny","Chris","Leo","Fernado","Sydney"]
        };
        console.log("in constructor");
    }

    componentDidMount(){
        console.log("in component Did Mount");
    }

    componentDidUpdate(){
        console.log("in component Did Update");
    }

    componentWillUnmount(){
        console.log("in component Will Unmount");
    }
    render() {
        
        const setName = (name) => {
            this.setState({name:name},()=>console.log("State has been changed now"));
            console.log('Log the name after I can setState', this.state.name)
        }
        
        const styles = {
            button:{
                backgroundColor:'blue',
                color:'white'
                },
            }
        

        return (
            <div>
                {console.log('in render')}
                { this.state.name ==='Pika' ? `Lets Play a game ${this.state.name}` : `Did I scare you ${this.state.name}?`}
                <br/>
                The name is {this.state.name}
                <br/>
                <button onClick={()=>setName("Boo")} style={styles.button}>Set Name to "Boo"</button>
                <button onClick={()=>setName("Pika")} style={styles.button}>Set Name to "Pika"</button>
                <hr/> 
                <div style={{marginTop:'60px',backgroundColor:'red'}}>
                Display a new list element for every item in an Array
                </div>
                <ul>
                    {this.state.students.map((student,index)=><li key={index}>{student}</li>)}
                </ul>
            </div>

        )
    }
}
