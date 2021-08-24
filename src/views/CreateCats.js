import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {Redirect} from 'react-router-dom'
import {postCategory} from '../api/apiCategory'

const CreateItemFormSchema = Yup.object().shape({
    "name": Yup.string().required("Required"),
})

const FormInitialValues={
    name:'', 
}

export default class CreateCats extends Component {
    constructor(){
        super();
        this.state={
            tokenError:false,
            serverErrorCars:false,
            categories:[],
            unsuccessfulPost:false,
            successfulPost:false
            }
    }


    handleSubmit=async ({name})=>{
        const res=await postCategory(localStorage.getItem('token'),name)
        console.log(res)
        if (res){
            this.setState({successfulPost:true})
        }else{
            this.setState({unsuccessfulPost:true})
        }
    }

    render() {
        return (
            <div>
                {this.state.successfulPost?<small style={{color:"green"}}>Your Cagegory Was Created</small>:""}
                {this.state.unsuccessfulPost?<small style={{color:"red"}}>Error Creating Category, Please Try again</small>:""}
                {this.state.serverErrorCats?<small style={{color:"red"}}>Error try again later</small>:''}
                {this.state.tokenError?<Redirect to='/login'/>:''}       
                <br/>
                <h1>Create Category</h1>
                <Formik initialValues={FormInitialValues}
                validationSchema={CreateItemFormSchema}
                onSubmit={ (values, {resetForm}) => {
                    this.handleSubmit(values);
                    resetForm(FormInitialValues)
                
                    }}
                >
                {({ errors, touched }) => (
                    <Form>
                        <label htmlFor="name" className="form-label">New Category Name</label>
                        <Field name="name" className="form-control"/>
                        {errors.name && touched.name ? (<div style={{color:'red'}}>{errors.name}</div>) : null}

                          <button className="btn btn-primary form-control" type="submit">Create</button>
                    </Form>)}
              </Formik>
            </div>
        )
    }
}
