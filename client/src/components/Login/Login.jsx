import { useState } from "react"
import { FormAction, FormFooter, FormHeader, FormInput } from "../Form"
import axios from "axios";
import qs from 'qs';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    let data = qs.stringify({
        'email': email,
        'password': password
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/api/v1/users/login',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.request(config);
            console.log(JSON.stringify(response.data));
            setEmail('');
            setPassword('');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={loginUser}>
            <FormHeader heading="Login To Your Account" paragraph="Don't have account yet?" linkToUrl="/signup" linkName="Signup" />

            <FormInput labelFor="email" labelText="Password" type="email" name="email" id="email" value={email} placeholder="Email address" isRequired={true} handleChange={(e) => setEmail(e.target.value)} />

            <FormInput labelFor="password" labelText="Password" type="password" name="password" id="password" value={password} placeholder="Password" isRequired={true} handleChange={(e) => setPassword(e.target.value)} />
            <FormFooter />
            <FormAction text="Login" />
        </form>



    )
}

export default Login