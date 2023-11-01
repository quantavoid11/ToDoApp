import { FormHeader,FormInput,FormAction} from "../Form"
import { useState } from "react";

function Signup() {
  const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [user,setUser]=useState("");
  return (
    <form>
     <FormHeader heading="Signup To Create Your Account" paragraph="Already have an account?" linkToUrl="/login" linkName="Login"/>

     
     <FormInput labelFor="user" labelText="User" type="text" name="username" id="username" value={user} placeholder="Username" isRequired={true} handleChange={(e)=>setUser(e.target.value)}/>

     <FormInput labelFor="email" labelText="Password" type="email" name="email" id="email" value={email} placeholder="Email address" isRequired={true} handleChange={(e)=>setEmail(e.target.value)}/>

     <FormInput labelFor="password" labelText="Password" type="password" name="password" id="password" value={password} placeholder="Password" isRequired={true} handleChange={(e)=>setPassword(e.target.value)}/>
     <FormAction text="Signup"/>
     
     
     
     </form>
   
  )
}

export default Signup