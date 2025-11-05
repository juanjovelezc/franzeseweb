import React from 'react'

export default function PreviewGrid({ urls=[] }){
  if(!urls.length) return null
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(96px, 1fr))', gap:8, marginTop:8}}>
      {urls.map((u,i)=>(
        <div key={i} style={{border:'1px solid #e5e7eb', borderRadius:6, background:'#fff'}}>
          <img src={u} alt={'p-'+i} style={{width:'100%', height:86, objectFit:'cover', borderRadius:6}} />
        </div>
      ))}
    </div>
  )
}
