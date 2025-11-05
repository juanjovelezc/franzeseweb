import React from 'react'
import { useData } from '../context/DataContext'

export default function Historia(){
  const { events } = useData()
  return (
    <section>
      <div className="paper" style={{marginBottom:16}}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <div>
            <div style={{fontSize:12, color:'#8b0000'}}>CONFIDENTIAL</div>
            <h2 style={{margin:'6px 0', fontSize:28, color:'#2b2b2b'}}>Historia</h2>
            <div style={{fontSize:12, color:'#6b7280'}}>Archivo: Caso Nº 47-CR/2025</div>
          </div>
        </div>
      </div>
      {events.length === 0 ? <div className="paper">Sin eventos. Agrega en Admin → Historia.</div> : (
        <ul style={{listStyle:'none', padding:0, display:'grid', gap:16}}>
          {events.map(ev=>(
            <li key={ev.id} className="paper">
              <div style={{fontSize:12, color:'#4b5563'}}>{ev.date}</div>
              <div style={{display:'flex', gap:16}}>
                {ev.thumb && <img src={ev.thumb} alt={ev.title} style={{width:112, height:80, objectFit:'cover', border:'1px solid #ddd'}}/>}
                <div>
                  <div className="seal" style={{marginBottom:4}}>FILE NOTE</div>
                  <h4 style={{margin:'4px 0', fontSize:18}}>{ev.title}</h4>
                  <p style={{marginTop:6, color:'#374151', fontSize:14}}>{ev.summary}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
