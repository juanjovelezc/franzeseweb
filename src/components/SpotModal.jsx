import React, { useEffect, useState } from 'react'
import ImageLightbox from './ImageLightbox'

export default function SpotModal({ spot, onClose }){
  const [zoomIndex, setZoomIndex] = useState(null)
  useEffect(()=>{
    const onKey = (e)=>{ if(e.key==='Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  },[onClose])
  if(!spot) return null
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 modal-bg" onClick={onClose}></div>
        <div className="paper relative w-[820px]">
          <button onClick={onClose} className="absolute right-4 top-4">✕</button>
          <div className="flex gap-6">
            <div className="flex-1">
              <div className="seal mb-2">RESTRICTED</div>
              <h3 style={{margin:0, fontSize:22}}>{spot.name}</h3>
              <div style={{color:'#4b5563'}}>Coords: {spot.coords}</div>
              <p style={{marginTop:8}}>{spot.details}</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {(spot.images||[]).map((src,i)=>(
                  <button key={i} className="polaroid text-left" onClick={()=>setZoomIndex(i)}>
                    <img src={src} alt={'spot-'+i} className="w-full h-44 object-cover rounded" />
                    <div className="text-xs text-gray-600 mt-2">{spot.name} — {i+1}</div>
                  </button>
                ))}
              </div>
            </div>
            <aside style={{width:180}}>
              <div className="text-xs text-gray-500 uppercase">Observaciones</div>
              <div className="mt-2 text-sm text-gray-700">{spot.summary}</div>
            </aside>
          </div>
        </div>
      </div>
      {zoomIndex !== null && (
        <ImageLightbox images={spot.images||[]} index={zoomIndex} onIndex={(i)=> setZoomIndex(i)} onClose={()=> setZoomIndex(null)} />
      )}
    </>
  )
}
