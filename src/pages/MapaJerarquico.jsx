import React from 'react'
import { useData } from '../context/DataContext'
import { useNavigate } from 'react-router-dom'

export default function MapaJerarquico(){
  const { members, selectMember } = useData()
  const navigate = useNavigate()
  const goToMember = (id)=>{ selectMember(id); navigate('/miembros') }
  const boss = members[0] || null

  return (
    <section>
      <h2 style={{fontSize:24, marginBottom:16}}>Mapa Jerárquico</h2>
      {members.length === 0 ? <div className="paper">Sin datos. Agrega miembros en Admin.</div> : (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:24}}>
          {boss && <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <img src={boss.photo} alt="Boss" style={{width:112, height:112, objectFit:'cover', border:'4px solid #fff', boxShadow:'0 6px 14px rgba(0,0,0,.4)', cursor:'pointer'}} onClick={()=>goToMember(boss.id)} />
            <div style={{marginTop:8, fontSize:12, color:'#d1d5db'}}>BOSS</div>
          </div>}
          <div style={{display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center'}}>
            {members.slice(1,6).map(m => (
              <img key={m.id} src={m.photo} alt={m.name} style={{width:80, height:80, objectFit:'cover', border:'2px solid #fff', boxShadow:'0 4px 10px rgba(0,0,0,.4)', cursor:'pointer'}} onClick={()=>goToMember(m.id)} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
