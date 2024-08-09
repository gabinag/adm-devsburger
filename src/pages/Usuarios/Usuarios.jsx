import styles from './Usuarios.module.css';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebaseConfig';
import { useState, useEffect } from 'react';
import { Menu } from '../../components/Menu/Menu';

export const Usuarios = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [
    createUserWithEmailAndPassword,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  function handleSignUp(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    if (error) {
      alert(`Erro: ${error.message || "E-mail e/ou senha inválidos."}`);
    }
  }, [error]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.usuarios}>
      <Menu />
      <div className={styles.wrapUsuarios}>
        <h1>Cadastro de usuários</h1>
        <form onSubmit={handleSignUp}>
          <label>E-mail</label>
          <input type="email" onChange={e => setEmail(e.target.value)} required />
          <label>Senha (deve conter pelo menos 6 caracteres)</label>
          <input type="password" onChange={e => setPassword(e.target.value)} required />
          <button type="submit" onClick={handleSignUp}>Cadastrar</button>
        </form>
      </div>
    </div>
  );
};
