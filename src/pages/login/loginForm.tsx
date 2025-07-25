import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './login.module.css';
import fondoAcceso from '../../assets/fondo_acceso.svg';

function LoginForm() {
  const { rol } = useParams(); // administrativo o veterinario
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Simulación de usuarios (esto luego se reemplaza por Supabase)
  const mockUsers = [
    { email: 'admin@arvivet.com', password: 'admin123', rol: 'administrativo' },
    { email: 'vet@arvivet.com', password: 'vet123', rol: 'veterinario' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Rol:', rol); // <-- Agrega esto

    // Buscar usuario en mockUsers
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password && u.rol === rol
    );

    if (user) {
      if (rol === 'administrativo') {
        navigate('/dashboard/admin');
      } else if (rol === 'veterinario') {
        navigate('/dashboard/vet');
      }
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className={styles.container}>
      <img src={fondoAcceso} alt="Fondo acceso" className={styles.background} />
      <form className={styles.loginCard} onSubmit={handleLogin}>
        <h2>Accede a tu cuenta</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="Ingrese su correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className={styles.eyeIcon}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            👁️
          </span>
        </div>

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default LoginForm;
