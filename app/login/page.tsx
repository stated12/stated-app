'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'

export default function LoginPage() {
  const router = useRouter()

    const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
        const [loading, setLoading] = useState(false)
          const [error, setError] = useState('')

            const handleLogin = async (e: React.FormEvent) => {
                e.preventDefault()
                    setLoading(true)
                        setError('')

                            const { error } = await supabase.auth.signInWithPassword({
                                  email,
                                        password,
                                            })

                                                if (error) {
                                                      setError(error.message)
                                                            setLoading(false)
                                                                  return
                                                                      }

                                                                          router.push('/dashboard')
                                                                            }

                                                                              return (
                                                                                  <main style={{ maxWidth: 420, margin: '80px auto', padding: 20 }}>
                                                                                        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Log in</h1>

                                                                                              <form onSubmit={handleLogin}>
                                                                                                      <input
                                                                                                                type="email"
                                                                                                                          placeholder="Email"
                                                                                                                                    value={email}
                                                                                                                                              required
                                                                                                                                                        onChange={(e) => setEmail(e.target.value)}
                                                                                                                                                                  style={inputStyle}
                                                                                                                                                                          />

                                                                                                                                                                                  <input
                                                                                                                                                                                            type="password"
                                                                                                                                                                                                      placeholder="Password"
                                                                                                                                                                                                                value={password}
                                                                                                                                                                                                                          required
                                                                                                                                                                                                                                    onChange={(e) => setPassword(e.target.value)}
                                                                                                                                                                                                                                              style={inputStyle}
                                                                                                                                                                                                                                                      />

                                                                                                                                                                                                                                                              {error && <p style={{ color: 'red' }}>{error}</p>}

                                                                                                                                                                                                                                                                      <button type="submit" disabled={loading} style={buttonStyle}>
                                                                                                                                                                                                                                                                                {loading ? 'Logging in…' : 'Log in'}
                                                                                                                                                                                                                                                                                        </button>
                                                                                                                                                                                                                                                                                              </form>
                                                                                                                                                                                                                                                                                                  </main>
                                                                                                                                                                                                                                                                                                    )
                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                    const inputStyle = {
                                                                                                                                                                                                                                                                                                      width: '100%',
                                                                                                                                                                                                                                                                                                        padding: 12,
                                                                                                                                                                                                                                                                                                          marginBottom: 14,
                                                                                                                                                                                                                                                                                                            borderRadius: 6,
                                                                                                                                                                                                                                                                                                              border: '1px solid #ccc',
                                                                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                                                                              const buttonStyle = {
                                                                                                                                                                                                                                                                                                                width: '100%',
                                                                                                                                                                                                                                                                                                                  padding: 12,
                                                                                                                                                                                                                                                                                                                    background: '#000',
                                                                                                                                                                                                                                                                                                                      color: '#fff',
                                                                                                                                                                                                                                                                                                                        border: 'none',
                                                                                                                                                                                                                                                                                                                          borderRadius: 6,
                                                                                                                                                                                                                                                                                                                          }