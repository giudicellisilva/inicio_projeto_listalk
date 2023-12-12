import { useMutation } from "react-query";
import styles from "./login.module.scss";
import { useState } from "react";
import { postLogin } from "@/api/login/postLogin";
import api from "@/api/http-common";

const Login = () =>{
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");

    const { status, mutate } = useMutation(
        async () =>{
            return postLogin(login, senha);
        },
        {
            onSuccess: (res) =>{
                console.log(res.data)
                api.defaults.headers.authorization = `Bearer ${res.data.access_token}`;
            },

            onError: (error) =>{
                console.log(error)
            }

        }
   
    )

    return(
        <div>
            <div>{status}</div>
            <label htmlFor="login">Login</label>
            <input type="text" value={login} onChange={(e) => setLogin( e.target.value)} />
            <label htmlFor="senha" >Senha</label>
            <input type="password" value={senha} onChange={(e) => setSenha( e.target.value)} />
            <button onClick={() => mutate()}>Login</button>
        </div>
    )
}

export default Login;