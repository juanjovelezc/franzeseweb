import React, { useState } from 'react'
import { useData } from '../context/DataContext'
import { uploadFile, uploadMany } from '../lib/storage'
import DropZone from '../components/DropZone'
import PreviewGrid from '../components/PreviewGrid'

function Text({label, value, onChange, textarea}){
  return (
    <label style={{display:'block', marginBottom:10}}>
      <div style={{fontSize:12, color:'#9aa9b8'}}>{label}</div>
      {textarea
        ? <textarea value={value} onChange={e=>onChange(e.target.value)} rows={4} style={{width:'100%'}} />
        : <input value={value} onChange={e=>onChange(e.target.value)} style={{width:'100%'}} />}
    </label>
  )
}
function Row({children}){ return <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:12}}>{children}</div> }
function Section({title, children, right}){
  return (
    <div className="paper" style={{marginBottom:20}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
        <h3 style={{margin:0}}>{title}</h3>
        {right}
      </div>
      {children}
    </div>
  )
}
function genId(prefix){ return prefix + '-' + Math.random().toString(36).slice(2,7).toUpperCase() }

export default function Admin(){
  const { members, spots, movimientos, events, add, update, remove } = useData()
  const [tab, setTab] = useState('members')
  return (
    <section>
      <h2 style={{fontSize:24, marginBottom:12}}>Panel de Administración</h2>
      <div style={{display:'flex', gap:8, marginBottom:16}}>
        {['members','spots','movs','events'].map(t=> (
          <button key={t} onClick={()=>setTab(t)} style={{padding:'6px 10px', borderRadius:6, background: tab===t ? '#2b6cb0' : 'transparent', color: tab===t ? '#fff' : '#e6eef6', border:'1px solid #2b6cb0'}}>
            {t==='members'?'Miembros': t==='spots'?'Spots': t==='movs'?'Movimientos':'Historia'}
          </button>
        ))}
      </div>
      {tab==='members' && <MembersAdmin list={members} add={add} update={update} remove={remove} />}
      {tab==='spots' && <SpotsAdmin list={spots} add={add} update={update} remove={remove} />}
      {tab==='movs' && <MovsAdmin list={movimientos} add={add} update={update} remove={remove} />}
      {tab==='events' && <EventsAdmin list={events} add={add} update={update} remove={remove} />}
    </section>
  )
}

function MembersAdmin({ list, add, update, remove }){
  const [draft, setDraft] = useState({ id:'', name:'', alias:'', age:'', physical:'', info:'', photo:'' })
  const onAdd = ()=>{
    const id = draft.id || genId('M')
    add('members', { id, ...draft })
    setDraft({ id:'', name:'', alias:'', age:'', physical:'', info:'', photo:'' })
  }
  return (
    <>
      <Section title="Agregar miembro" right={<button onClick={onAdd}>Agregar</button>}>
        <Row>
          <Text label="ID (opcional)" value={draft.id} onChange={v=>setDraft({...draft, id:v})} />
          <Text label="Nombre" value={draft.name} onChange={v=>setDraft({...draft, name:v})} />
        </Row>
        <Row>
          <Text label="Alias" value={draft.alias} onChange={v=>setDraft({...draft, alias:v})} />
          <Text label="Edad" value={draft.age} onChange={v=>setDraft({...draft, age:v})} />
        </Row>
        <Text label="Foto (URL)" value={draft.photo} onChange={v=>setDraft({...draft, photo:v})} />
        <DropZone onFiles={async(files)=>{ const f = files[0]; const reader = new FileReader(); reader.onload = ()=> setDraft(d=>({ ...d, __preview: reader.result })); reader.readAsDataURL(f); const url = await uploadFile(f, 'members'); setDraft(d=>({ ...d, photo:url })); }} label="Arrastra la foto o haz click" />
        {draft.__preview && <PreviewGrid urls={[draft.__preview]} />}
        <Text label="Descripción física" value={draft.physical} onChange={v=>setDraft({...draft, physical:v})} />
        <Text label="Información" textarea value={draft.info} onChange={v=>setDraft({...draft, info:v})} />
      </Section>
      <Section title={"Miembros ("+list.length+")"}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:12}}>
          {list.map(m => <MemberCard key={m.id} item={m} update={update} remove={remove} />)}
        </div>
      </Section>
    </>
  )
}
function MemberCard({ item, update, remove }){
  const [edit, setEdit] = useState(item)
  const save = ()=> update('members', item.id, edit)
  const del = ()=> remove('members', item.id)
  return (
    <div className="paper">
      {edit.photo && <img src={edit.photo} alt={edit.name} style={{width:'100%', height:140, objectFit:'cover', borderRadius:6, border:'1px solid #ddd'}}/>}
      <Text label="Nombre" value={edit.name} onChange={v=>setEdit({...edit, name:v})} />
      <Text label="Alias" value={edit.alias} onChange={v=>setEdit({...edit, alias:v})} />
      <Text label="Edad" value={edit.age} onChange={v=>setEdit({...edit, age:v})} />
      <Text label="Foto" value={edit.photo} onChange={v=>setEdit({...edit, photo:v})} />
      <DropZone onFiles={async(files)=>{ const f = files[0]; const url = await uploadFile(f, 'members'); setEdit(prev=>({...prev, photo:url, __preview: URL.createObjectURL(f)})) }} label="Arrastra nueva foto o haz click" />
      {edit.__preview && <PreviewGrid urls={[edit.__preview]} />}
      <Text label="Descripción física" value={edit.physical} onChange={v=>setEdit({...edit, physical:v})} />
      <Text label="Información" textarea value={edit.info} onChange={v=>setEdit({...edit, info:v})} />
      <div style={{display:'flex', gap:8}}>
        <button onClick={save}>Guardar</button>
        <button onClick={del} style={{color:'#fff', background:'#8b0000', border:'1px solid #8b0000', borderRadius:6, padding:'4px 10px'}}>Eliminar</button>
      </div>
    </div>
  )
}

function SpotsAdmin({ list, add, update, remove }){
  const [draft, setDraft] = useState({ id:'', name:'', coords:'', summary:'', details:'', images:[] })
  const [images, setImages] = useState('')
  const onAdd = ()=>{
    const id = draft.id || genId('S')
    add('spots', { id, ...draft, images: images.split(',').map(s=>s.trim()).filter(Boolean) })
    setDraft({ id:'', name:'', coords:'', summary:'', details:'', images:[] }); setImages('')
  }
  return (
    <>
      <Section title="Agregar spot" right={<button onClick={onAdd}>Agregar</button>}>
        <Row>
          <Text label="ID (opcional)" value={draft.id} onChange={v=>setDraft({...draft, id:v})} />
          <Text label="Nombre" value={draft.name} onChange={v=>setDraft({...draft, name:v})} />
        </Row>
        <Text label="Coords" value={draft.coords} onChange={v=>setDraft({...draft, coords:v})} />
        <Text label="Resumen" value={draft.summary} onChange={v=>setDraft({...draft, summary:v})} />
        <Text label="Detalles" textarea value={draft.details} onChange={v=>setDraft({...draft, details:v})} />
        <Text label="Imágenes (coma)" value={images} onChange={setImages} />
        <DropZone multiple onFiles={async(files)=>{ const arr = Array.from(files); const previews = await Promise.all(arr.map(f=> new Promise(res=>{ const r=new FileReader(); r.onload=()=>res(r.result); r.readAsDataURL(f) }))); setImages(p=> (p? p+', ' : '') + previews.map(()=> '').join('')); const urls = await uploadMany(files, 'spots'); setImages(prev=> (prev ? prev + ', ' : '') + urls.join(', ')); setDraft(d=>({ ...d, __previews: previews })); }} label="Arrastra imágenes o haz click" />
        {draft.__previews && <PreviewGrid urls={draft.__previews} />}
      </Section>
      <Section title={"Spots ("+list.length+")"}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:12}}>
          {list.map(s => <SpotCard key={s.id} item={s} update={update} remove={remove} />)}
        </div>
      </Section>
    </>
  )
}
function SpotCard({ item, update, remove }){
  const [edit, setEdit] = useState(item)
  const save = ()=> update('spots', item.id, { ...edit, images: (typeof edit.images==='string'? edit.images.split(',').map(s=>s.trim()).filter(Boolean): edit.images) })
  const del = ()=> remove('spots', item.id)
  return (
    <div className="paper">
      <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:8}}>
        {(edit.images||[]).slice(0,2).map((src,i)=>(<img key={i} src={src} alt={'img'+i} style={{width:'100%', height:100, objectFit:'cover', borderRadius:6, border:'1px solid #ddd'}}/>))}
      </div>
      <Text label="Nombre" value={edit.name} onChange={v=>setEdit({...edit, name:v})} />
      <Text label="Coords" value={edit.coords} onChange={v=>setEdit({...edit, coords:v})} />
      <Text label="Resumen" value={edit.summary} onChange={v=>setEdit({...edit, summary:v})} />
      <Text label="Detalles" textarea value={edit.details} onChange={v=>setEdit({...edit, details:v})} />
      <Text label="Imágenes (coma)" value={Array.isArray(edit.images)? edit.images.join(', ') : edit.images} onChange={v=>setEdit({...edit, images:v})} />
      <DropZone multiple onFiles={async(files)=>{ const urls = await uploadMany(files, 'spots'); setEdit(prev=> ({...prev, images: Array.isArray(prev.images) ? [...prev.images, ...urls] : (prev.images ? prev.images + ', ' : '') + urls.join(', ')})) }} label="Arrastra imágenes o haz click" />
      <div style={{display:'flex', gap:8}}>
        <button onClick={save}>Guardar</button>
        <button onClick={del} style={{color:'#fff', background:'#8b0000', border:'1px solid #8b0000', borderRadius:6, padding:'4px 10px'}}>Eliminar</button>
      </div>
    </div>
  )
}

function MovsAdmin({ list, add, update, remove }){
  const [draft, setDraft] = useState({ id:'', title:'', date:'', location:'', summary:'', details:'', images:[] })
  const [images, setImages] = useState('')
  const onAdd = ()=>{
    const id = draft.id || genId('OP')
    add('movements', { id, ...draft, images: images.split(',').map(s=>s.trim()).filter(Boolean) })
    setDraft({ id:'', title:'', date:'', location:'', summary:'', details:'', images:[] }); setImages('')
  }
  return (
    <>
      <Section title="Agregar movimiento bélico" right={<button onClick={onAdd}>Agregar</button>}>
        <Row>
          <Text label="ID (opcional)" value={draft.id} onChange={v=>setDraft({...draft, id:v})} />
          <Text label="Título" value={draft.title} onChange={v=>setDraft({...draft, title:v})} />
        </Row>
        <Row>
          <Text label="Fecha (YYYY-MM-DD)" value={draft.date} onChange={v=>setDraft({...draft, date:v})} />
          <Text label="Lugar" value={draft.location} onChange={v=>setDraft({...draft, location:v})} />
        </Row>
        <Text label="Resumen" value={draft.summary} onChange={v=>setDraft({...draft, summary:v})} />
        <Text label="Detalles" textarea value={draft.details} onChange={v=>setDraft({...draft, details:v})} />
        <Text label="Imágenes (coma)" value={images} onChange={setImages} />
        <DropZone multiple onFiles={async(files)=>{ const arr = Array.from(files); const previews = await Promise.all(arr.map(f=> new Promise(res=>{ const r=new FileReader(); r.onload=()=>res(r.result); r.readAsDataURL(f) }))); setDraft(d=>({ ...d, __previews: previews })); const urls = await uploadMany(files, 'movements'); setImages(prev=> (prev ? prev + ', ' : '') + urls.join(', ')) }} label="Arrastra imágenes o haz click" />
        {draft.__previews && <PreviewGrid urls={draft.__previews} />}
      </Section>
      <Section title={"Movimientos ("+list.length+")"}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:12}}>
          {list.map(s => <MovCard key={s.id} item={s} update={update} remove={remove} />)}
        </div>
      </Section>
    </>
  )
}
function MovCard({ item, update, remove }){
  const [edit, setEdit] = useState(item)
  const save = ()=> update('movements', item.id, { ...edit, images: (typeof edit.images==='string'? edit.images.split(',').map(s=>s.trim()).filter(Boolean): edit.images) })
  const del = ()=> remove('movements', item.id)
  return (
    <div className="paper">
      <Text label="Título" value={edit.title} onChange={v=>setEdit({...edit, title:v})} />
      <Row>
        <Text label="Fecha" value={edit.date} onChange={v=>setEdit({...edit, date:v})} />
        <Text label="Lugar" value={edit.location} onChange={v=>setEdit({...edit, location:v})} />
      </Row>
      <Text label="Resumen" value={edit.summary} onChange={v=>setEdit({...edit, summary:v})} />
      <Text label="Detalles" textarea value={edit.details} onChange={v=>setEdit({...edit, details:v})} />
      <Text label="Imágenes (coma)" value={Array.isArray(edit.images)? edit.images.join(', ') : edit.images} onChange={v=>setEdit({...edit, images:v})} />
      <DropZone multiple onFiles={async(files)=>{ const urls = await uploadMany(files, 'movements'); setEdit(prev=> ({...prev, images: Array.isArray(prev.images) ? [...prev.images, ...urls] : (prev.images ? prev.images + ', ' : '') + urls.join(', ')})) }} label="Arrastra imágenes o haz click" />
      <div style={{display:'flex', gap:8}}>
        <button onClick={save}>Guardar</button>
        <button onClick={del} style={{color:'#fff', background:'#8b0000', border:'1px solid #8b0000', borderRadius:6, padding:'4px 10px'}}>Eliminar</button>
      </div>
    </div>
  )
}

function EventsAdmin({ list, add, update, remove }){
  const [draft, setDraft] = useState({ id:'', date:'', title:'', location:'', summary:'', details:'', thumb:'', images:[] })
  const [images, setImages] = useState('')
  const onAdd = ()=>{
    const id = draft.id || genId('E')
    add('events', { id, ...draft, images: images.split(',').map(s=>s.trim()).filter(Boolean) })
    setDraft({ id:'', date:'', title:'', location:'', summary:'', details:'', thumb:'', images:[] }); setImages('')
  }
  return (
    <>
      <Section title="Agregar evento a la Historia" right={<button onClick={onAdd}>Agregar</button>}>
        <Row>
          <Text label="ID (opcional)" value={draft.id} onChange={v=>setDraft({...draft, id:v})} />
          <Text label="Fecha" value={draft.date} onChange={v=>setDraft({...draft, date:v})} />
        </Row>
        <Row>
          <Text label="Título" value={draft.title} onChange={v=>setDraft({...draft, title:v})} />
          <Text label="Lugar" value={draft.location} onChange={v=>setDraft({...draft, location:v})} />
        </Row>
        <Text label="Resumen" value={draft.summary} onChange={v=>setDraft({...draft, summary:v})} />
        <Text label="Detalles" textarea value={draft.details} onChange={v=>setDraft({...draft, details:v})} />
        <Text label="Thumb (URL)" value={draft.thumb} onChange={v=>setDraft({...draft, thumb:v})} />
        <DropZone onFiles={async(files)=>{ const f=files[0]; const r=new FileReader(); r.onload=()=> setDraft(d=>({...d, __thumbPreview: r.result })); r.readAsDataURL(f); const url = await uploadFile(f, 'events'); setDraft(d=>({...d, thumb:url})); }} label="Arrastra thumb o haz click" />
        {draft.__thumbPreview && <PreviewGrid urls={[draft.__thumbPreview]} />}
        <Text label="Imágenes (coma)" value={images} onChange={setImages} />
        <DropZone multiple onFiles={async(files)=>{ const arr = Array.from(files); const previews = await Promise.all(arr.map(f=> new Promise(res=>{ const r=new FileReader(); r.onload=()=>res(r.result); r.readAsDataURL(f) }))); setDraft(d=>({...d, __previews: previews })); const urls = await uploadMany(files, 'events'); setImages(prev=> (prev ? prev + ', ' : '') + urls.join(', ')) }} label="Arrastra imágenes del evento o haz click" />
        {draft.__previews && <PreviewGrid urls={draft.__previews} />}
      </Section>
      <Section title={"Historia ("+list.length+")"}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:12}}>
          {list.map(s => <EventCard key={s.id} item={s} update={update} remove={remove} />)}
        </div>
      </Section>
    </>
  )
}
function EventCard({ item, update, remove }){
  const [edit, setEdit] = useState(item)
  const save = ()=> update('events', item.id, { ...edit, images: (typeof edit.images==='string'? edit.images.split(',').map(s=>s.trim()).filter(Boolean): edit.images) })
  const del = ()=> remove('events', item.id)
  return (
    <div className="paper">
      <Row>
        <Text label="Fecha" value={edit.date} onChange={v=>setEdit({...edit, date:v})} />
        <Text label="Título" value={edit.title} onChange={v=>setEdit({...edit, title:v})} />
      </Row>
      <Row>
        <Text label="Lugar" value={edit.location} onChange={v=>setEdit({...edit, location:v})} />
        <Text label="Thumb" value={edit.thumb} onChange={v=>setEdit({...edit, thumb:v})} />
      </Row>
      <DropZone onFiles={async(files)=>{ const f=files[0]; const url = await uploadFile(f, 'events'); setEdit(prev=>({...prev, thumb:url, __thumbPreview: URL.createObjectURL(f)})) }} label="Arrastra nueva thumb o haz click" />
      {edit.__thumbPreview && <PreviewGrid urls={[edit.__thumbPreview]} />}
      <Text label="Resumen" value={edit.summary} onChange={v=>setEdit({...edit, summary:v})} />
      <Text label="Detalles" textarea value={edit.details} onChange={v=>setEdit({...edit, details:v})} />
      <Text label="Imágenes (coma)" value={Array.isArray(edit.images)? edit.images.join(', ') : edit.images} onChange={v=>setEdit({...edit, images:v})} />
      <DropZone multiple onFiles={async(files)=>{ const urls = await uploadMany(files, 'events'); setEdit(prev=> ({...prev, images: Array.isArray(prev.images) ? [...prev.images, ...urls] : (prev.images ? prev.images + ', ' : '') + urls.join(', ')})) }} label="Arrastra imágenes o haz click" />
      <div style={{display:'flex', gap:8}}>
        <button onClick={save}>Guardar</button>
        <button onClick={del} style={{color:'#fff', background:'#8b0000', border:'1px solid #8b0000', borderRadius:6, padding:'4px 10px'}}>Eliminar</button>
      </div>
    </div>
  )
}
