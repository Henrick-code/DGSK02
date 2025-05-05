


import React, { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import Link from '@docusaurus/Link';

let pb = null; // Declaramos afuera, inicializamos adentro

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Solo ejecutamos en el navegador
    pb = new PocketBase(process.env.POCKETBASE_URL);

    // Restaurar sesión desde localStorage
    const cookie = typeof window !== 'undefined' ? localStorage.getItem('pb_auth') : '';
    pb.authStore.loadFromCookie(cookie || '');

    pb.authStore.onChange(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('pb_auth', pb.authStore.exportToCookie());
      }
    });

    if (pb.authStore.isValid) {
      setUser(pb.authStore.model);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      setUser(authData.record);
    } catch (err) {
      setError('Error al iniciar sesión: ' + err.message);
    }
  };

  const handleLogout = () => {
    pb.authStore.clear();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pb_auth');
    }
    setUser(null);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h1>Bienvenido a Nuestra Documentacion</h1>
      
      {user ? (
        <>
          <p>Señor Usuario <strong>{user.email}</strong> la documentacion en este sitio web es de acceso limitado, No compartir con terceros </p>
          <strong><Link to="/">Ver Documentacion</Link></strong>

          <p></p>

          <button onClick={handleLogout}>Cerrar sesión</button>
          
        </>
         
      ) : (
        <>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
            />
            <button type="submit">Entrar</button>
          </form>
          <p style={{ marginTop: '1rem' }}>
            ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
          </p>
        </>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}




