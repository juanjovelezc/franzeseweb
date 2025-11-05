import React, { useEffect } from 'react'
import { useData } from '../context/DataContext'

export default function MemberProfile(){
  const { selectedMember, clearSelection } = useData()
  useEffect(()=>{
    const onKey = (e)=>{ if(e.key==='Escape') clearSelection() }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  },[clearSelection])
  if(!selectedMember) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 modal-bg" onClick={clearSelection}></div>
      <div className="paper relative w-[760px]">
        <button onClick={clearSelection} className="absolute right-4 top-4">✕</button>
        <div className="seal mb-2">CLASSIFIED</div>
        <div className="flex gap-4">
          <img src={selectedMember.photo} alt={selectedMember.name} style={{width:140, height:140, objectFit:'cover', borderRadius:8, border:'1px solid #ccc'}}/>
          <div>
            <h3 style={{fontSize:24, margin:0}}>{selectedMember.name}</h3>
            <div>Alias: {selectedMember.alias}</div>
            <div>Edad: {selectedMember.age}</div>
            <div>{selectedMember.physical}</div>
          </div>
        </div>
        <div style={{marginTop:12}}>{selectedMember.info}</div>
      </div>
    </div>
  )
}
