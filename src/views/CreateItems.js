import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {getCategories} from '../api/apiCategory';
import {Redirect} from 'react-router-dom'
import {postItem} from '../api/apiItems'

const CreateItemFormSchema = Yup.object().shape({
    "name": Yup.string().required("Required"),
    "description": Yup.string().required("Required"),
    "price":Yup.string().matches(/^\d+(\.\d{1,2})?$/,"Must Be a Valid Price").required("Required"),
    "img": Yup.string().required("Required"),
    "category_id":Yup.number().integer().required("Required")
})

const FormInitialValues={
    name:'',
    description:'',
    price:'',
    img:'',
    category_id:''   
}

export default class CreateItems extends Component {
    constructor(){
        super();
        this.state={
            tokenError:false,
            serverErrorCats:false,
            categories:[],
            unsuccessfulPost:false,
            successfulPost:false
            }
    }

    componentDidMount() {
        this.getAllCats()
    }

    getAllCats=async ()=>{
        const cats=await getCategories(localStorage.getItem('token'))
        if (cats===400){this.setState({tokenError:true,serverErrorCats:false})}
        if (cats===500){this.setState({serverErrorCats:true, tokenError:false})}
        if (cats !== 500 || cats !== 400){
            this.setState({categories:cats}, console.log(this.state.categories))
        }
    }

    handleSubmit=async (values)=>{
        const res=await postItem(localStorage.getItem('token'),values)
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
                {this.state.successfulPost?<small style={{color:"green"}}>Your Item Was Created</small>:""}
                {this.state.unsuccessfulPost?<small style={{color:"red"}}>Error Creating item, Please Try again</small>:""}
                {this.state.serverErrorCats?<small style={{color:"red"}}>Error try again later</small>:''}
                {this.state.tokenError?<Redirect to='/login'/>:''}       
                <br/>
                <Formik initialValues={FormInitialValues}
                validationSchema={CreateItemFormSchema}
                onSubmit={ (values, {resetForm}) => {
                    console.log(values);
                    this.handleSubmit(values);
                    resetForm(FormInitialValues)
                
                    }}
                >
                {({ errors, touched }) => (
                    <Form>
                        <label htmlFor="name" className="form-label">Item Name</label>
                        <Field name="name" className="form-control"/>
                        {errors.name && touched.name ? (<div style={{color:'red'}}>{errors.name}</div>) : null}
                        
                        <label htmlFor="description" className="form-label">description</label>
                        <Field name="description" className="form-control"/>
                        {errors.description && touched.description ? (<div style={{color:'red'}}>{errors.description}</div>) : null}
                        
                        <label htmlFor="price" className="form-label">Price</label>
                        <Field name="price" className="form-control"/>
                        {errors.price && touched.price ? (<div style={{color:'red'}}>{errors.price}</div>) : null}
                       
                        <label htmlFor="img" className="form-label">Image Link</label>
                        <Field name="img" className="form-control"/>
                        {errors.img && touched.img ? (<div style={{color:'red'}}>{errors.img}</div>) : null}
                       
                        <label htmlFor="category_id" className="form-label"></label>
                        <Field as="select" name="category_id" className="form-select">
                            {this.state.categories?.map((c)=><option value={c.id} key={c.id}>{c.name}</option>)}
                        </Field>
                        {errors.category_id && touched.category_id ? (<div style={{color:'red'}}>{errors.category_id}</div>) : null}

                        <button className="btn btn-primary form-control" type="submit">Submit</button>
                    </Form>)}
              </Formik>
            </div>
        )
    }
}
