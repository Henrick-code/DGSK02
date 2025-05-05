import React, { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export default function Root({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Cargar sesión desde localStorage
      pb.authStore.loadFromCookie(localStorage.getItem('pb_auth') || '');
      
      // Verificar si la sesión es válida
      setIsAuthenticated(pb.authStore.isValid);
      setLoading(false);

      // Si no está autenticado y no está en login/register, bloquear el acceso
      if (!pb.authStore.isValid) {
        const path = window.location.pathname;
        if (path !== '/login' && path !== '/register') {
          setAccessDenied(true); // Mostrar acceso denegado
        }
      }
    }
  }, []);

  useEffect(() => {
    if (accessDenied) {
      // Agregar un retraso de 1 segundos antes de redirigir
      setTimeout(() => {
        window.location.href = '/login'; // Redirigir a login
      }, 1000); // Retraso de 2 segundos
    }
  }, [accessDenied]); // Dependencia para redirigir solo cuando acceda a una página protegida

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Cargando...</div>;
  }

  // Si no está autenticado, y está en login/register, no redirigir
  if (!isAuthenticated && !accessDenied) {
    return <>{children}</>;
  }

  // Si no está autenticado, y acceso denegado, mostrar el mensaje
  if (accessDenied) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Validacion de acceso</h1>
        <p>Debe iniciar sesión para acceder.</p>
        </div>
    );
  }

  return <>{children}</>; // Si está autenticado, renderizar contenido
}


