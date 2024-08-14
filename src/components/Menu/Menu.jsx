import styles from './Menu.module.css';
import { NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';

export const Menu = () =>  {

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('Usuário deslogado');
    }).catch((error) => {
      console.error('Erro ao deslogar', error);
    });
  };

  return (
    <div className={styles.menu}>
      <p>Adm Devs Burger</p>
      <nav className={styles.navMenu}>
          <ul>
              <li><NavLink to='/pedidos'>Pedidos</NavLink></li>
              <li><NavLink to='/produtos'>Produtos</NavLink></li>
          </ul>
          <button onClick={handleSignOut}>Sair</button>
      </nav>
    </div>
  );
  }