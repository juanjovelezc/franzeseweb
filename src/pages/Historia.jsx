import React, { useState } from 'react'
import { useData } from '../context/DataContext'

export default function Historia() {
  const { events } = useData()
  const [selected, setSelected] = useState(null)
  const [imageModal, setImageModal] = useState(null)

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20, color: '#1e293b' }}>Línea de Tiempo</h2>

      {events.length === 0 && <p>No hay historias registradas.</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {events.map((e) => (
          <div
            key={e.id}
            style={{
              border: '1px solid #d1d5db',
              borderRadius: 8,
              padding: 16,
              background: '#f9fafb',
              boxShadow: '0 1px 2px rgba(0,0,0,0.08)'
            }}
          >
            <h3 style={{ margin: 0, color: '#1e293b' }}>{e.title}</h3>
            <div style={{ fontSize: 14, color: '#475569', marginBottom: 8 }}>
              {e.date} – {e.location}
            </div>
            <p style={{ fontSize: 14, color: '#334155', marginBottom: 8 }}>
              {e.summary?.slice(0, 120) || 'Sin resumen disponible.'}
              {e.summary && e.summary.length > 120 ? '…' : ''}
            </p>
            <button
              onClick={() => setSelected(e)}
              style={{
                padding: '6px 12px',
                background: '#1d4ed8',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 13
              }}
            >
              Ver detalle
            </button>
          </div>
        ))}
      </div>

      {/* Modal de detalle */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fefefe url(/textures/paper-texture.jpg)',
              backgroundSize: 'cover',
              padding: 24,
              borderRadius: 12,
              width: '90%',
              maxWidth: 600,
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              overflowY: 'auto',
              maxHeight: '80vh'
            }}
          >
            <h3 style={{ marginTop: 0 }}>{selected.title}</h3>
            <p style={{ fontSize: 14, color: '#475569' }}>
              {selected.date} – {selected.location}
            </p>

            {selected.thumb && (
              <img
                src={selected.thumb}
                alt={selected.title}
                style={{
                  width: '100%',
                  height: 240,
                  objectFit: 'cover',
                  borderRadius: 8,
                  cursor: 'pointer',
                  marginBottom: 16
                }}
                onClick={() => setImageModal(selected.thumb)}
              />
            )}

            <p style={{ whiteSpace: 'pre-wrap', fontSize: 15, color: '#1e293b' }}>
              {selected.details || 'Sin información detallada.'}
            </p>

            {selected.images && selected.images.length > 0 && (
              <>
                <h4 style={{ marginTop: 20 }}>Imágenes adicionales:</h4>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                    gap: 8
                  }}
                >
                  {selected.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={'img-' + i}
                      style={{
                        width: '100%',
                        height: 100,
                        objectFit: 'cover',
                        borderRadius: 6,
                        cursor: 'pointer'
                      }}
                      onClick={() => setImageModal(img)}
                    />
                  ))}
                </div>
              </>
            )}

            <div style={{ textAlign: 'right', marginTop: 16 }}>
              <button
                onClick={() => setSelected(null)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: '1px solid #475569',
                  background: '#f1f5f9',
                  cursor: 'pointer'
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de imagen ampliada */}
      {imageModal && (
        <div
          onClick={() => setImageModal(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100
          }}
        >
          <img
            src={imageModal}
            alt="imagen ampliada"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: 8,
              boxShadow: '0 0 15px rgba(0,0,0,0.8)'
            }}
          />
        </div>
      )}
    </div>
  )
}
