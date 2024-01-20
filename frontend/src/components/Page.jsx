import React from 'react'
import { useNavigate } from 'react-router-dom';

function Page() {

    const navigate = useNavigate();

    const handleOnClick = async() => {
        console.log("logout");
        {/*   try {
            const response= await axios.post('http://localhost:8000/api/v1/users/logout');
            console.log(response);
            console.log(response.data.data);
            const statusCode=response.data.statusCode;
            if(statusCode===200){
                alert("logout Successful");
                navigate('/page');
            }
            else{
                alert("logout Failed");
            }
    
    
           } catch (error) {
            console.log("error in front-end logout",error);
           }
        */}
        navigate('/');
    }

  return (
    <div class="container-sm center-container text-color text-center">
        <h1>Thank you for coming here</h1>
        <button class="btn btn-primary" onClick={handleOnClick}>Logout</button>
    </div>
  )
}

export default Page


{/*
<form>
    <img class="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>

    <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
    <p class="mt-5 mb-3 text-body-secondary">© 2017–2023</p>
  </form>
*/}


  