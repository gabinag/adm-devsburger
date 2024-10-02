import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';
import imgLogo from '../../assets/logo.png';
import Modal from '../../components/Modal/Modal';
import styles from './Menu.module.css';

export const Menu = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Usuário deslogado');
      })
      .catch((error) => {
        console.error('Erro ao deslogar', error);
      });
  };

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleConfirmLogout = () => {
    setShowModal(false);
    handleSignOut();
  };

  return (
    <div className={styles.menu}>
      <div>
        <h2>Administração</h2>
        <img src={imgLogo} alt="Logo da Devs Burger" />
      </div>
      <nav className={styles.navMenu}>
        <ul>
          <li><Link to='/pedidos'>Pedidos</Link></li>
          <li><Link to='/produtos'>Produtos</Link></li>
        </ul>
        <button onClick={handleLogoutClick}>Sair</button>
      </nav>

      <Modal
        isOpen={showModal}
        onClose={handleCancel}
        onConfirm={handleConfirmLogout}
        message="Tem certeza que deseja sair?"
      />
    </div>
  );
};
