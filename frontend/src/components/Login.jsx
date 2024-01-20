import React from 'react'
import { useForm } from "react-hook-form";
import Input from './Input'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

    const { register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const create = async(data) => {
       try {
        const response= await axios.post('http://localhost:8000/api/v1/users/login', data);
        console.log(response);
        const statusCode=response.data.statusCode;
        if(statusCode===200){
            alert("Login Successful");
            navigate('/page');
        }
        else{
            alert("Login Failed");
        }


       } catch (error) {
        console.log("error in front-end",error);
       }
    }


  return (
    <div class="container-sm cont center-container text-color">
        <div >
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
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

                    <div class="form-floating text-color">

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
                    <button class="btn btn-primary w-100 py-2"> Login </button>
                    </div>
                </form>


                <p className='font-style'> Not Registered Yet ? <Link to={"/"}> Sign up </Link></p>
    </div>
  )
}

export default Login