import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import {Table} from 'react-bootstrap';

const ErgastFormSchema = Yup.object().shape({
    "season": Yup.number().integer('Whole Number Please').moreThan(1949,"Enter year after 1950").lessThan(2022,"Enter a year before 2021").required('Required'),
    "round": Yup.number().integer('Whole Number Please').min(1,'Round number must be 1-20').max(20, 'Round number must be 1-20').required('Required'),
})

const ergastFormInitialValues={
    season: '',
    round: '',
    }

export default class Home extends Component {
    constructor() {
        super();
        this.state={
            racers:[],
            badRound:false
        };
    }
    
    handleSubmit=(values)=>{
        //now we will do out api call to get our drivers
        var season = values.season;
        var round = values.round;
    
        fetch(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    racers: data.MRData.StandingsTable.StandingsLists[0].DriverStandings
                }, ()=>console.log(this.state.racers))
            })
            .catch(error => {this.setState({badRound:true});console.error(error)})
    
    }


    render() {
        return (
            <>
              <h1>Search F1 Racing Results</h1>
              {this.state.badRound ? <small style={{color:"red"}}>Invalid Year Round Combo</small>:""}
              <Formik initialValues={ergastFormInitialValues}
                validationSchema={ErgastFormSchema}
                onSubmit={ (values, {resetForm}) => {
                    console.log("Hello");
                    console.log(values);
                    this.handleSubmit(values);
                    resetForm(ergastFormInitialValues)
                
                    }}
                >
                {({ errors, touched }) => (
                    <Form>
                        <label htmlFor="season" className="form-label">Season</label>
                        <Field name="season" className="form-control"/>
                        {errors.season && touched.season ? (<div style={{color:'red'}}>{errors.season}</div>) : null}
                        
                        <label htmlFor="round" className="form-label">Round</label>
                        <Field name="round" className="form-control"/>
                        {errors.round && touched.round ? (<div style={{color:'red'}}>{errors.round}</div>) : null}
                        
                        <button type="submit">Submit</button>
                    </Form>)}
              </Formik>

              {/* Racer table here */}
            {this.state.racers.length>0 ?
                <Table striped bordered hover>
                
                    <>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Points</th>
                        <th>Wins</th>
                        <th>Name</th>
                        <th>DOB</th>
                        <th>Nationality</th>
                        <th>Constructor</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.racers.map(racer => (
                            <tr key={racer.position}>
                                <td>{racer.position}</td>
                                <td>{racer.points}</td>
                                <td>{racer.wins}</td>
                                <td>
                                    <a target="_blank" rel="noreferrer" href={racer.Driver.url}>{racer.Driver.givenName} {racer.Driver.familyName}</a>
                                </td>
                                <td>{racer.Driver.dateOfBirth}</td>
                                <td>{racer.Driver.nationality}</td>
                                <td>
                                    <a target="_blank" rel="noreferrer" href={racer.Constructors[0].url}>{racer.Constructors[0].name}</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </>                
                </Table>
            :''}
            </>
        )
    }
}
