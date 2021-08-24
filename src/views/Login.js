import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import getToken from '../api/apiBasicAuth';
import {Redirect} from 'react-router-dom';

const loginFormSchema = Yup.object().shape({
    "email": Yup.string().email("Must be a valid email format").required('Required'),
    "password":Yup.string().required('Required'),
})

const loginFormInitialValues={
    email: '',
    password: '',
    }


export default class Login extends Component {

    constructor() {
        super();
        this.state={
            badLogin:false,
            serverError:false,
            redirect:false,
        }
    }

    handleSubmit=async ({email,password})=>{
        //do api call
        const token = await getToken(email,password)
        console.log(token)
        if( token === 401){return this.setState({badLogin:true,serverError:false})}
        if( token === 500){return this.setState({serverError:true,badLogin:false})}
        localStorage.setItem("token",token)
        this.props.setToken(token)
        this.setState({redirect:true})
        

    }
    render() {
        return (
            <div>
                {this.state.redirect ?<Redirect to={{ pathname: "/", props:{token: localStorage.getItem('token')}  }} />:''}
                <Formik initialValues={loginFormInitialValues}
                validationSchema={loginFormSchema}
                onSubmit={ (values, {resetForm}) => {
                    console.log("Hello");
                    console.log(values);
                    this.handleSubmit(values);
                    resetForm(loginFormInitialValues)
                    }}>
                    {({ errors, touched }) => (
                        <Form>
                            <label htmlFor="email" className="form-label">Email</label>
                            <Field name="email" className="form-control"/>
                            {errors.email && touched.email ? (<div style={{color:'red'}}>{errors.email}</div>) : null}
                            
                            <label htmlFor="round" className="form-label">Password</label>
                            <Field name="password" className="form-control" type="password"/>
                            {errors.password && touched.password ? (<div style={{color:'red'}}>{errors.password}</div>) : null}
                            
                            {this.state.badLogin?<small style={{color:'red'}}>Invalid Email/password combination<br/></small>:''}
                            {this.state.serverError?<small style={{color:'red'}}>Server Error Please Try again<br/></small>:''}

                            <button type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}
