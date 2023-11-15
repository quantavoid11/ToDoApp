import { FormHeader, FormInput, FormAction } from "../Form"
import { useState } from "react";
import axios from "axios";
import qs from "qs";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  let data = qs.stringify({
    'email': email,
    'username': user,
    'password': password 
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: '/api/v1/users/signup',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      setEmail('');
      setPassword('');
      setUser('');
      
    } catch (error) {
      console.log(error);

    }

  }


  return (
    <form onSubmit={registerUser}>

      <FormHeader heading="Signup To Create Your Account" paragraph="Already have an account?" linkToUrl="/" linkName="Login" />
      <FormInput labelFor="user" labelText="User" type="text" name="username" id="username" value={user} placeholder="Username" isRequired={true} handleChange={(e) => setUser(e.target.value)} />
      <FormInput labelFor="email" labelText="Password" type="email" name="email" id="email" value={email} placeholder="Email address" isRequired={true} handleChange={(e) => setEmail(e.target.value)} />
      <FormInput labelFor="password" labelText="Password" type="password" name="password" id="password" value={password} placeholder="Password" isRequired={true} handleChange={(e) => setPassword(e.target.value)} />
      <FormAction text="Signup" />



    </form>

  )
}

export default Signup