import React, { useState } from 'react'
import { useData } from '../context/DataContext'
import SpotModal from '../components/SpotModal'

export default function Spots(){
  const { spots } = useData()
  const [open, setOpen] = useState(null)
  return (
    <section>
      <h2 style={{fontSize:24, marginBottom:16}}>Spots</h2>
      {spots.length === 0 ? <div className="paper">Sin spots. Agrega en Admin → Spots.</div> : (
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:16}}>
          {spots.map(s=>(
            <div key={s.id} className="paper">
              <div style={{fontWeight:'600', color:'#111827'}}>{s.name}</div>
              <div style={{fontSize:14, color:'#374151'}}>{s.summary}</div>
              <div style={{marginTop:12, textAlign:'right'}}>
                <button onClick={()=>setOpen(s)} style={{color:'#2b6cb0', textDecoration:'underline'}}>Abrir expediente</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <SpotModal spot={open} onClose={()=>setOpen(null)} />
    </section>
  )
}
