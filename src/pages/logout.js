import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';
import PocketBase from 'pocketbase';

export default function Logout() {
  const history = useHistory();

  useEffect(() => {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    pb.authStore.clear(); // Cierra la sesión
    history.push('/login'); // Redirige al login
  }, [history]);

  return <p>Cerrando sesión...</p>;
}
