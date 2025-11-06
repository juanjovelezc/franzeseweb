import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const doLogin = async (e) => {
    e.preventDefault()
    setMsg('Verificando credenciales...')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setMsg('❌ Credenciales incorrectas o usuario no autorizado.')
      return
    }

    // ✅ Solo correos autorizados pueden ingresar
    const allowed = ["juanjovc21@gmail.com", "cplyn3@gmail.com"] // ← cámbialo por tu correo real
    if (!allowed.includes(email)) {
      setMsg("🚫 Acceso denegado: este usuario no está autorizado.")
      await supabase.auth.signOut()
      return
    }

    setMsg('✅ Acceso concedido. Redirigiendo...')
    navigate('/admin')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <form
        onSubmit={doLogin}
        style={{
          background: '#1e293b',
          padding: '32px 40px',
          borderRadius: 12,
          boxShadow: '0 0 16px rgba(0,0,0,0.3)',
          width: 340
        }}
      >
        <h2 style={{ marginBottom: 24, textAlign: 'center', color: '#93c5fd' }}>
          Acceso restringido
        </h2>

        <label style={{ fontSize: 14 }}>Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: 8,
            marginTop: 4,
            marginBottom: 16,
            borderRadius: 6,
            border: '1px solid #334155',
            background: '#0f172a',
            color: '#f1f5f9'
          }}
        />

        <label style={{ fontSize: 14 }}>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: 8,
            marginTop: 4,
            marginBottom: 24,
            borderRadius: 6,
            border: '1px solid #334155',
            background: '#0f172a',
            color: '#f1f5f9'
          }}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            padding: '10px 0',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600,
            letterSpacing: 0.5
          }}
          onMouseOver={(e) => (e.target.style.background = '#1d4ed8')}
          onMouseOut={(e) => (e.target.style.background = '#2563eb')}
        >
          Ingresar
        </button>

        {msg && (
          <p
            style={{
              marginTop: 16,
              fontSize: 13,
              textAlign: 'center',
              color: msg.includes('denegado') ? '#f87171' : '#a7f3d0'
            }}
          >
            {msg}
          </p>
        )}

        <p
          style={{
            fontSize: 12,
            textAlign: 'center',
            marginTop: 20,
            color: '#94a3b8'
          }}
        >
          Solo usuarios autorizados pueden acceder.
        </p>
      </form>
    </div>
  )
}
