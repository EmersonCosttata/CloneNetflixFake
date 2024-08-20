import styles from './Login.module.css'
import netflix from '../assets/logo.png'
import  { useNavigate }  from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../components/contetx/AuthContext';


export const Login = () => {
    const navigate = useNavigate()

    const { login } = useAuth()

    const [error, setError] = useState()
    const [errorUser, setErrorUser] = useState()
    const [errorPassword, setErrorPassword] = useState()
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();
        if(!user || !password){
            setError('Preencha os Campos!')
            return
        }else if(errorUser && errorPassword){
           return
        }

        if(user === "admin@admin" && password=="12345"){
            login();
            navigate('/home')
            }else{
            setError(`Senha incorreta para ${user} Você pode usar um código de acesso, redefinir sua senha ou tentar novamente.`)
        }
    };

    const passwordVerification = (e) => {
        setPassword(e.target.value)
        if (password.length < 4 && password.length < 60) {
            setErrorPassword('A senha deve ter entre 4 e 60 caracteres.')
        } else {
            setErrorPassword(null);
        }
    }

    const UserVerification = (e) => {
        setUser(e.target.value)
        if (!user.includes("@")) {
            setErrorUser('Informe um email válido.')
        } else {
            setErrorUser(null)
        }
    }

    return (
        <div className={styles.background} >
            <header>
                <nav className={styles.navbar} >
                    <a href=''> <img src={netflix} className={styles.netflix}></img></a>
                </nav>
            </header>
            <div className={styles.login}>
                <div className={styles.entrar} >
                    <h1>Entrar</h1>

                    {error && <div className={styles.error}><p>{error}</p></div>}
                    <input type='text' placeholder='Email ou Numero de Celular' onChange={UserVerification} />
                    <span class={styles.passerro}>{errorUser && errorUser}</span>

                    <input type='password' placeholder='Senha' onChange={passwordVerification} />
                    <span class={styles.passerro}>{errorPassword && errorPassword}</span>

                    <button className={styles.btn} onClick={handleLogin} >Entrar</button>
                    <h4>OU</h4>
                    <button className={styles.btn2} onClick={handleLogin}>Usar Codigo de Acesso</button>
                    <a href='#'>Esqueceu a senha? </a>

                    <label> <input type="checkbox" id="remember" name="remember" />Lembrar-se de mim</label>
                    <p>Novo por aqui? <a>Assine agora.</a></p>
                    <p className={styles.assine}>Esta página é protegida pelo Google reCAPTCHA para garantir que você não é um robô. Saiba mais.</p>
                </div>
            </div>
            <footer>
                <div className={styles.footerAll}>
                    <h4>Dúvidas? Ligue 0800 591 2876</h4>
                    <div>
                        <a href=''> Perguntas frequentes</a>
                        <a href=''>  Central de Ajuda</a>
                        <a href=''>  Termos de Uso</a>
                        <a href=''>  Privacidade</a>
                    </div>
                    
                    <div>
                    <a href=''>  Preferências de cookies</a>
                    <a href=''>  Informações corporativas</a>
                    </div>
                                    <select className={styles.idioma}>
                    <option value="0">Idioma</option>
                    <option value="1">Português</option>
                    <option value="2">English</option>
                                    </select>
                </div>
            </footer>
        </div>
    )
}
export default Login