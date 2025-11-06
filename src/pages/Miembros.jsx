import React from "react";
import { useData } from "../context/DataContext";

export default function Miembros() {
  const { members, selectMember } = useData();
  return (
    <section>
      <h2 style={{ fontSize: 24, marginBottom: 16 }}>Posibles Miembros</h2>
      {members.length === 0 ? (
        <div className="paper">Sin miembros. Agrega en Admin → Miembros.</div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: 20,
          }}
        >
          {members.map((m) => (
            <div key={m.id} className="paper">
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              {m.photo && (
                <img
                  src={m.photo}
                  alt={m.name}
                  style={{
                    width: 140,
                    height: 140,
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    display: "block",
                    margin: "0 auto 12px",
                  }}
                />
              )}
              <h3 style={{ margin: "4px 0", fontSize: 18, color: "#2b2b2b" }}>
                {m.name}
              </h3>
              <div style={{ fontSize: 14, color: "#374151" }}>
                Alias: {m.alias}
              </div>
              <div style={{ marginTop: 8 }}>
                <button
                  onClick={() => selectMember(m.id)}
                  style={{ color: "#2b6cb0", textDecoration: "underline" }}
                >
                  Ver perfil
                </button>
              </div>
            </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
