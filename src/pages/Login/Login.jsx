import styles from './Login.module.css';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebaseConfig';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imgLogo from '../../assets/logo.png'

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();

  function handleSignIn(e) {
    e.preventDefault();
    
    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    setErrorMessage('');
    
    signInWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    if (error) {
      switch (error.message) {
        case 'Firebase: Error (auth/invalid-email).':
          setErrorMessage('E-mail inválido.');
          break;
        case 'Firebase: Error (auth/wrong-password).':
          setErrorMessage('Senha incorreta.');
          break;
        case 'Firebase: Error (auth/user-not-found).':
          setErrorMessage('E-mail não encontrado.');
          break;
        default:
          setErrorMessage('Erro: ' + error.message);
      }
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      navigate('/pedidos');
    }
  }, [user, navigate]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.login}>
        <div className={styles.container}>
            <h1>Administração</h1>
            <img src={imgLogo} alt="Logo da Devs Burger" />
            <p>Faça o login para acessar os pedidos e produtos da Devs Burger.</p>
        </div>
        <div className={styles.wrapLogin}>
            <form className={styles.formLogin}>
                <label>E-mail</label>
                <input 
                  type="email" 
                  onChange={e => setEmail(e.target.value)} 
                  value={email}
                  required 
                />
                <label>Senha</label>
                <input 
                  type="password" 
                  onChange={e => setPassword(e.target.value)} 
                  value={password}
                  required 
                />
                <button onClick={handleSignIn}>Entrar</button>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            </form>
        </div>
    </div>
  );
};
