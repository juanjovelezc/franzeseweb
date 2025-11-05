import React, { useCallback, useRef, useState } from 'react'

/**
 * DropZone
 * props:
 * - multiple: boolean
 * - onFiles(files: FileList | File[]) -> void
 * - label: string
 */
export default function DropZone({ multiple=false, onFiles, label='Arrastra imágenes o haz click' }){
  const inputRef = useRef(null)
  const [active, setActive] = useState(false)

  const onDrop = useCallback((e)=>{
    e.preventDefault(); e.stopPropagation(); setActive(false)
    const files = e.dataTransfer.files
    if(files && files.length){ onFiles(multiple ? files : [files[0]]) }
  },[multiple, onFiles])

  const onSelect = useCallback((e)=>{
    const files = e.target.files
    if(files && files.length){ onFiles(multiple ? files : [files[0]]) }
  },[multiple, onFiles])

  return (
    <div
      onDragOver={(e)=>{ e.preventDefault(); setActive(true) }}
      onDragLeave={()=> setActive(false)}
      onDrop={onDrop}
      onClick={()=> inputRef.current?.click()}
      style={{
        border: '2px dashed ' + (active ? '#60a5fa' : 'rgba(148,163,184,0.6)'),
        padding: 12, borderRadius: 10, background: active ? 'rgba(59,130,246,0.08)' : 'transparent',
        cursor: 'pointer', textAlign:'center', color:'#64748b', fontSize:14
      }}
    >
      {label}
      <input ref={inputRef} type="file" accept="image/*" onChange={onSelect} style={{display:'none'}} multiple={multiple} />
    </div>
  )
}
