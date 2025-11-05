import React, { useEffect, useState } from 'react'
import ImageLightbox from './ImageLightbox'

export default function MovementModal({ item, onClose }){
  const [zoomIndex, setZoomIndex] = useState(null)
  useEffect(()=>{
    const onKey = (e)=>{ if(e.key==='Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  },[onClose])
  if(!item) return null
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 modal-bg" onClick={onClose}></div>
        <div className="paper relative w-[90%]" style={{maxWidth:960}}>
          <button onClick={onClose} className="absolute right-4 top-4">✕</button>
          <div className="flex gap-6">
            <div className="flex-1">
              <div className="seal mb-2">RESTRICTED</div>
              <h3 style={{margin:0, fontSize:22}}>{item.title}</h3>
              <div style={{color:'#4b5563'}}>{item.date} • {item.location}</div>
              <p style={{marginTop:8}}>{item.details}</p>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {(item.images||[]).map((src,i)=>(
                  <button key={i} className="polaroid text-left" onClick={()=>setZoomIndex(i)}>
                    <img src={src} alt={'img-'+i} className="w-full h-36 object-cover rounded" />
                    <div className="text-xs text-gray-600 mt-2">{item.title} — {i+1}</div>
                  </button>
                ))}
              </div>
            </div>
            <aside style={{width:220}}>
              <div className="text-xs text-gray-500 uppercase">Resumen</div>
              <div className="mt-2 text-sm text-gray-700">{item.summary}</div>
            </aside>
          </div>
        </div>
      </div>
      {zoomIndex !== null && (
        <ImageLightbox images={item.images||[]} index={zoomIndex} onIndex={(i)=> setZoomIndex(i)} onClose={()=> setZoomIndex(null)} />
      )}
    </>
  )
}
