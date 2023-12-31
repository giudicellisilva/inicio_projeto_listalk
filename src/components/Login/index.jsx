import { useMutation } from "react-query";
import styles from "./login.module.scss";
import { useState } from "react";
import { postLogin } from "@/api/login/postLogin";
import api from "@/api/http-common";
import { useRouter } from "next/navigation";

const Login = ({setVisible}) =>{
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const {push} =  useRouter();

    const { status, mutate } = useMutation(
        async () =>{
            return postLogin(login, senha);
        },
        {
            onSuccess: (res) =>{
                console.log(res.data);
                api.defaults.headers.authorization = `Bearer ${res.data.access_token}`;
                push("/categoria");
            },

            onError: (error) =>{
                console.log(error);
            }

        }
   
    )

    return(
        <div className={styles.login}>
            <button className={styles.login__buttonClose} onClick={() => setVisible(false)}>Close</button>
            <div className={styles.login__status} >Status: {status}</div>
            <label htmlFor="login">Login</label>
            <input className={styles.login__input} type="text" value={login} onChange={(e) => setLogin( e.target.value)} />
            <label htmlFor="senha" >Senha</label>
            <input className={styles.login__input} type="password" value={senha} onChange={(e) => setSenha( e.target.value)} />
            <button className={styles.login__buttonLogin} onClick={() => mutate()}>Login</button>
        </div>
    )
}

export default Login;