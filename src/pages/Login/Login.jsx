import styles from './Login.module.css';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebaseConfig';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();

  function handleSignIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    if (error) {
      alert(`Erro: ${error.message}`);
    }
  }, [error]);

  if(loading) {
    return <p>Carregando...</p>
  }

  if(user) {
    navigate('/pedidos');
  }

  return (
    <div className={styles.login}>
        <div className={styles.container}>
            <h1>Administração Devs Burger</h1>
            <p>Faça o login para acessar os pedidos e produtos do Devs Burger</p>
        </div>
        <div className={styles.wrapLogin}>
            <form>
                <label>E-mail</label>
                <input type="email" onChange={e=>setEmail(e.target.value)} required/>
                <label>Senha</label>
                <input type="password" onChange={e=>setPassword(e.target.value)} required/>
                <button onClick={handleSignIn}>Entrar</button>
            </form>
        </div>
    </div>
  )
}
