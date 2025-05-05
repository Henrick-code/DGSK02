import React, { useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';

export default function RegisterPage() {
  return (
    <BrowserOnly>
      {() => <RegisterContent />}
    </BrowserOnly>
  );
}

function RegisterContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const PocketBase = (await import('pocketbase')).default;
      const pb = new PocketBase(process.env.POCKETBASE_URL);

      await pb.collection('users').create({
        email,
        emailVisibility: true,
        password,
        passwordConfirm: password,
      });

      setSuccess(true);

      setTimeout(() => {
        window.location.href = '/login';
      }, 2000); // Espera 2 segundos antes de redirigir
    } catch (err) {
      setError('Error al registrarse: ' + (err.message || err));
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h1>Registro</h1>

      {success ? (
        <div style={{ color: 'green', marginBottom: '1rem' }}>
          ¡Registro exitoso! Redirigiendo a login...
        </div>
      ) : (
        <form onSubmit={handleRegister}>
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
          <button type="submit">Registrarse</button>
        </form>
      )}

      {!success && (
        <p style={{ marginTop: '1rem' }}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

