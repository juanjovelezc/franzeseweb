import React, { useState } from 'react'
import { useData } from '../context/DataContext'
import MovementModal from '../components/MovementModal'

export default function Movimientos(){
  const { movimientos } = useData()
  const [open, setOpen] = useState(null)
  return (
    <section>
      <h2 style={{fontSize:24, marginBottom:16}}>Movimientos bélicos</h2>
      {movimientos.length === 0 ? <div className="paper">Sin movimientos. Agrega en Admin → Movimientos.</div> : (
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:16}}>
          {movimientos.map(m=>(
            <div key={m.id} className="paper">
              <div style={{fontSize:12, color:'#4b5563'}}>{m.date}</div>
              <div style={{fontWeight:'600', color:'#111827', marginTop:4}}>{m.title}</div>
              <div style={{fontSize:14, color:'#374151', marginTop:8}}>{m.summary}</div>
              <div style={{marginTop:12, textAlign:'right'}}>
                <button onClick={()=>setOpen(m)} style={{color:'#2b6cb0', textDecoration:'underline'}}>Abrir expediente</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <MovementModal item={open} onClose={()=>setOpen(null)} />
    </section>
  )
}
