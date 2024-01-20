import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import Input from './Input'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Signup() {

    const { register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const create = async(data) => {
        try {
         const response= await axios.post('http://localhost:8000/api/v1/users/signup', data);
         console.log(response);
         console.log(response.data.data);
         const statusCode=response.data.statusCode;
         if(statusCode===201){
             alert("signup Successful");
             navigate('/page');
         }
         else{
             alert("signup Failed");
         }
 
 
        } catch (error) {
         console.log("error in front-end signup",error);
        }
     }

  return (

    <div class="container-sm cont center-container text-color">
        <div>
            <h1 class="h3 mb-3 fw-normal">Signup</h1>
        </div>
        <form onSubmit={handleSubmit(create)}>
                    <div class="form-floating">
                        <Input
                        class="form-control"
                        label="User Name: "
                        placeholder="Enter your user name"
                        {...register("userName", {
                            required: true,
                        })}
                        />
                    </div>

                    <div class="form-floating">

                        <Input
                        class="form-control"
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                    </div>

                    <div className='button-class'>
                    <button class="btn btn-primary w-100 py-2"> Register </button>
                    </div>
                </form>

                <p className='font-style'> Already Registered ? <Link to={"/login"}> Log in </Link></p>
    </div>
  )
}

export default Signup