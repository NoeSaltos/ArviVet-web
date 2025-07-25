import styles from './login.module.css';
import heroImage from '../../assets/fondo_login.svg';
import welcomeImage from '../../assets/logo_bienvenida.svg';

function Login() {
  return (
    <div className={styles.container}>
      <img src={heroImage} alt="Fondo veterinario" className={styles.background} />
      <div className={styles.welcomeBlock}>
        <img src={welcomeImage} alt="Bienvenida" className={styles.welcomeImage} />
        <div className={styles.dropdown}>
          <button className={styles.loginButton}>
            Usuario <span style={{marginLeft: 8}}>▼</span>
          </button>
          <div className={styles.menu}>
            <button className={styles.menuItem}>Administrativo</button>
            <button className={styles.menuItem}>Veterinario</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;