import { useState } from "react"
import { FormAction, FormFooter, FormHeader, FormInput } from "../Form"



function Login() {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    return (
        <form >
            <FormHeader heading="Login To Your Account" paragraph="Don't have account yet?" linkToUrl="/signup" linkName="Signup" />

            <FormInput labelFor="email" labelText="Password" type="email" name="email" id="email" value={email} placeholder="Email address" isRequired={true} handleChange={(e)=>setEmail(e.target.value)}/>

            <FormInput labelFor="password" labelText="Password" type="password" name="password" id="password" value={password} placeholder="Password" isRequired={true} handleChange={(e)=>setPassword(e.target.value)}/>
            <FormFooter />
            <FormAction text="Login"/>
            </form>



    )
}

export default Login