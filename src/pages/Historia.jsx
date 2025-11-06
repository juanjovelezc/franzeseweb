import React, { useState } from "react";
import { useData } from "../context/DataContext";

export default function Historia() {
  const { events } = useData();
  const [selected, setSelected] = useState(null);
  const [imageModal, setImageModal] = useState(null);

  return (
    <section>
      <div className="paper" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 12, color: "#8b0000" }}>CONFIDENTIAL</div>
            <h2 style={{ margin: "6px 0", fontSize: 28, color: "#2b2b2b" }}>
              Historia
            </h2>
            <div style={{ fontSize: 12, color: "#6b7280" }}>
              Archivo: Caso Nº 47-CR/2025
            </div>
          </div>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="paper">Sin eventos. Agrega en Admin → Historia.</div>
      ) : (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "grid",
            gap: 16,
          }}
        >
          {events.map((ev) => (
            <li key={ev.id} className="paper">
              <div style={{ fontSize: 12, color: "#4b5563" }}>{ev.date}</div>
              <div style={{ display: "flex", gap: 16 }}>
                {ev.thumb && (
                  <img
                    src={ev.thumb}
                    alt={ev.title}
                    style={{
                      width: 112,
                      height: 80,
                      objectFit: "cover",
                      border: "1px solid #ddd",
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <div className="seal" style={{ marginBottom: 4 }}>
                    FILE NOTE
                  </div>
                  <h4 style={{ margin: "4px 0", fontSize: 18 }}>{ev.title}</h4>
                  <p
                    style={{
                      marginTop: 6,
                      color: "#374151",
                      fontSize: 14,
                    }}
                  >
                    {ev.summary}
                  </p>
                  <button
                    onClick={() => setSelected(ev)}
                    style={{
                      marginTop: 8,
                      padding: "6px 10px",
                      fontSize: 13,
                      border: "1px solid #1e3a8a",
                      borderRadius: 6,
                      background: "#1d4ed8",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Ver detalle
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal de detalle */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="paper"
            style={{
              width: "90%",
              maxWidth: 600,
              padding: 24,
              maxHeight: "85vh",
              overflowY: "auto",
              borderRadius: 12,
              backgroundColor: "#f4f1ec",
              backgroundImage: "url(/textures/paper-texture.jpg)",
              backgroundBlendMode: "multiply",
              backgroundSize: "400px",
              backgroundRepeat: "repeat",
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
              border: "1px solid #d1ccc3",
            }}
          >
            <h3 style={{ marginTop: 0 }}>{selected.title}</h3>
            <div style={{ fontSize: 13, color: "#4b5563", marginBottom: 8 }}>
              {selected.date} – {selected.location}
            </div>

            {selected.thumb && (
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <img
                  src={selected.thumb}
                  alt={selected.title}
                  style={{
                    width: "80%",
                    maxWidth: 280,
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "1px solid #bbb",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    cursor: "pointer",
                    backgroundColor: "#f4f1ec",
                  }}
                  onClick={() => setImageModal(selected.thumb)}
                />
              </div>
            )}

            <p
              style={{ fontSize: 15, color: "#1e293b", whiteSpace: "pre-wrap" }}
            >
              {selected.details || "Sin información detallada."}
            </p>

            {selected.images && selected.images.length > 0 && (
              <>
                <h4 style={{ marginTop: 20 }}>Imágenes adicionales:</h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(100px, 1fr))",
                    gap: 8,
                  }}
                >
                  {selected.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`img-${i}`}
                      style={{
                        width: "100%",
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 6,
                        cursor: "pointer",
                      }}
                      onClick={() => setImageModal(img)}
                    />
                  ))}
                </div>
              </>
            )}

            <div style={{ textAlign: "right", marginTop: 16 }}>
              <button
                onClick={() => setSelected(null)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "1px solid #475569",
                  background: "#f1f5f9",
                  cursor: "pointer",
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
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <img
            src={imageModal}
            alt="imagen ampliada"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: 8,
              boxShadow: "0 0 15px rgba(0,0,0,0.8)",
            }}
          />
        </div>
      )}
    </section>
  );
}
