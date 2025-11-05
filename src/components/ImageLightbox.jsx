import React, { useEffect, useRef, useState } from 'react'

export default function ImageLightbox({ images = [], index = 0, onClose, onIndex }){
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const dragging = useRef(false)
  const last = useRef({ x: 0, y: 0 })
  const currentSrc = images[index] || null

  useEffect(()=>{
    const onKey = (e)=>{
      if(e.key === 'Escape') onClose?.()
      if(e.key === 'ArrowLeft') onIndex?.(Math.max(0, index - 1))
      if(e.key === 'ArrowRight') onIndex?.(Math.min(images.length - 1, index + 1))
      if(e.key === '0') { setZoom(1); setOffset({x:0,y:0}) }
    }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  },[index, images.length, onClose, onIndex])

  useEffect(()=>{ setZoom(1); setOffset({x:0,y:0}) },[index])

  if(!currentSrc) return null

  const onWheel = (e)=>{
    e.preventDefault()
    const delta = -Math.sign(e.deltaY) * 0.1
    setZoom(z => Math.max(1, Math.min(3, +(z + delta).toFixed(2))))
  }
  const onMouseDown = (e)=>{
    if(zoom === 1) return
    dragging.current = true
    last.current = { x: e.clientX - offset.x, y: e.clientY - offset.y }
  }
  const onMouseMove = (e)=>{
    if(!dragging.current) return
    setOffset({ x: e.clientX - last.current.x, y: e.clientY - last.current.y })
  }
  const onMouseUp = ()=> dragging.current = false

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0" style={{background:'rgba(0,0,0,0.8)'}} onClick={onClose}></div>
      {index > 0 && (
        <button aria-label="Prev" onClick={()=> onIndex?.(index-1)} className="absolute left-2 top-1/2 -translate-y-1/2 text-white/80 text-3xl px-3 py-2">‹</button>
      )}
      {index < images.length-1 && (
        <button aria-label="Next" onClick={()=> onIndex?.(index+1)} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 text-3xl px-3 py-2">›</button>
      )}
      <img
        key={currentSrc}
        src={currentSrc}
        alt="image"
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`, cursor: zoom>1 ? 'grab' : 'default' }}
        className="max-w-[92vw] max-h-[92vh] rounded shadow-2xl select-none"
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-black/40 px-3 py-1 rounded">
        {index+1}/{images.length} — rueda para zoom (0 para reset)
      </div>
    </div>
  )
}
