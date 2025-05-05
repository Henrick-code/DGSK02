import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useHistory } from '@docusaurus/router';
import PocketBase from 'pocketbase';

export default function PerfilPage() {
  return (
    <BrowserOnly>
      {() => <PerfilContent />}
    </BrowserOnly>
  );
}

function PerfilContent() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    pb.authStore.loadFromCookie(localStorage.getItem('pb_auth') || '');

    if (!pb.authStore.isValid) {
      history.push('/login');
    } else {
      setUser(pb.authStore.model);
    }
  }, [history]);

  if (!user) return null; // Aquí podrías poner un "Loading..." si quieres

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Perfil de Usuario</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>ID:</strong> {user.id}</p>
      {/* Puedes agregar más datos aquí */}
    </div>
  );
}

