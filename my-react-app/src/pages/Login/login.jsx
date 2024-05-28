import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate , Link } from 'react-router-dom'
import { userAuthentication } from '../../hooks/userAuthentication'
import styles from './login.module.css'

function Login() {
  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');
  const [error, setError ] = useState('');

  const { login, error: authError, loading } = userAuthentication()
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlerSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const user = {
      email,
      password
    }
    const res = await login(user)

    console.table(res)
    navigate("/cachorros")
  }

  useEffect(() => {
      if(authError){
        setError(authError)
      }
  }, [authError])
  return (
    <div className={styles.container}>
      <form onSubmit={handlerSubmit}>
      <span>Login</span>
        <div className={styles.inputContainer}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="senha">Senha</label>
          <input
            type={showPassword ? 'text' : 'password'} 
            name="password"
            id="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={toggleShowPassword}>
              {showPassword ? '👁️' : '👁️'}
            </button>
        </div>
        <a href="#">Esqueceu sua senha?</a>
        {!loading && <button className={styles.button}>Entrar</button>}
        {loading && <button className={styles.button} disabled>Aguarde..</button>}
        {error && <p className='error'>{error}</p>}
        <div className={styles.footer}>
          <p>Você não tem uma conta?</p>
          <Link to="/cadastro">Crie a sua conta aqui</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
