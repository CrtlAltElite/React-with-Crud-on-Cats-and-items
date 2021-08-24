import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {getCategories} from '../api/apiCategory';
import {Redirect} from 'react-router-dom'
import {patchItem, getItems, deleteItem} from '../api/apiItems'
import {Button} from 'react-bootstrap'


const CreateItemFormSchema = Yup.object().shape({
    "name": Yup.string(),
    "description": Yup.string(),
    "price":Yup.string().matches(/^\d+(\.\d{1,2})?$/,"Must Be a Valid Price"),
    "img": Yup.string(),
    "category_id":Yup.number().integer().required()
})

export default class CreateItems extends Component {
    constructor(){
        super();
        this.state={
            tokenError:false,
            serverErrorCars:false,
            categories:[],
            items:[],
            item:{},
            unsuccessfulPost:false,
            successfulPost:false,
            unsuccessfulDelete:false,
            successfulDelete:false
        }
    }
    
    deleteItem=async()=>{
        if (window.confirm(`Are you sure you warm to delete ${this.state.item.name}`)){
            const res =await deleteItem(localStorage.getItem('token'),this.state.item.id)
            if (res){this.setState({successfulDelete:true,unsuccessfulDelete:false}); this.getAllItems();
            }
            else{this.setState({successfulDelete:false,unsuccessfulDelete:true})
            }
        }
    }


    componentDidMount() {
        this.getAllCats()
        this.getAllItems()
    }

    getAllCats=async ()=>{
        const cats=await getCategories(localStorage.getItem('token'))
        if (cats===400){this.setState({tokenError:true,serverErrorCats:false})}
        if (cats===500){this.setState({serverErrorCats:true, tokenError:false})}
        if (cats !== 500 || cats !== 400){
            this.setState({categories:cats}, console.log(this.state.categories))
        }
    }

    getAllItems=async ()=>{
        const items=await getItems(localStorage.getItem('token'))
        if (items===400){this.setState({tokenError:true,serverErrorItems:false})}
        if (items===500){this.setState({serverErrorItems:true, tokenError:false})}
        if (items !== 500 || items !== 400){
            this.setState({items:items})
        }
    }

    handleSubmit=async (values)=>{
        console.log("values: ",values)
        const res=await patchItem(localStorage.getItem('token'),{id:this.state.item.id, ...Object.fromEntries(Object.entries(values).map((e)=>e[1]!==null ? [e[0],e[1]]:[e[0],''] ))})
        console.log(res)
        if (res){
            this.setState({successfulPost:true})
        }else{
            this.setState({unsuccessfulPost:true})
        }
        this.getAllItems()
        
    }

    handlePullDown=(event)=>{
        const newId = event.target.value;
        if (newId===0){return}
        const newItem = this.state.items.filter((li)=>li.id===parseInt(newId))[0];
        this.setState({item:newItem});
    }

    render() {
  
        
        return (
            <div>
                {this.state.successfulDelete?<small style={{color:"green"}}>Your Item Was Deleted</small>:""}
                {this.state.unsuccessfulDelete?<small style={{color:"red"}}>Error Deleting item, Please Try again</small>:""}
                {this.state.successfulPost?<small style={{color:"green"}}>Your Item Was Modified</small>:""}
                {this.state.unsuccessfulPost?<small style={{color:"red"}}>Error Modifing item, Please Try again</small>:""}
                {this.state.serverErrorCats?<small style={{color:"red"}}>Error try again later</small>:''}
                {this.state.tokenError?<Redirect to='/login'/>:''}       
                <br/>
                <label htmlFor="itemsList" className="form-label">Choose Item to Edit</label>
                <select  id="options" name="itemsList" className="form-select form-select-lg mb-3"  onChange={(event)=>this.handlePullDown(event)} > 
                    <option defaultValue={0} label="--Choose an Item--"/>
                   {this.state.items?.map((item)=><option key={item.id} value={item.id} label={item.name}/>)}
                </select>
                {Object.entries(this.state.item??{}).length>0 ?
                    <>
                        <br/>
                        <hr/>
                        <h2>#{this.state.item?.id??'000'} - {this.state.item?.name??"No Item"}</h2>
                        <Button variant="danger" onClick={()=>this.deleteItem()}>Delete Item</Button>
                        <hr/>
                        <br/>
                        
                        <Formik initialValues={
                            {
                                name:this.state.item?.name ?? '',
                                description:this.state.item?.description??'',
                                price:this.state.item?.price??'',
                                img:this.state.item?.img?? '',
                                category_id:this.state.item?.category_id??''   
                            }
                        }
                        enableReinitialize
                        validationSchema={CreateItemFormSchema}
                        onSubmit={ (values, {resetForm}) => {
                            console.log(values);
                            this.handleSubmit(values);
                            resetForm({  name: '',
                                description:'',
                                price:'',
                                img: '',
                                category_id: ''   
                            })
                        
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
                </>
                :
                ''}
            </div>
        )
    }
}
