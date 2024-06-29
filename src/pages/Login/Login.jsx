import styles from './Login.module.css';

export const Login = () => {
  return (
    <div className={styles.login}>
        <div className={styles.container}>
            <h1>Administração Devs Burger</h1>
            <p>Faça o login para acessar os pedidos e produtos do Devs Burger</p>
        </div>
        <div className={styles.wrapLogin}>
            <form>
                <label>Usuário</label>
                <input type="text" />
                <label>Senha</label>
                <input type="password" />
            </form>
            <button>Entrar</button>
        </div>
    </div>
  )
}
