import { supabase } from './supabaseClient'
const BUCKET = import.meta.env.VITE_SUPABASE_BUCKET || 'images'

export async function uploadFile(file, folder='misc'){
  if(!file) throw new Error('No file')
  const ext = file.name.includes('.') ? file.name.split('.').pop() : 'bin'
  const name = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`
  const { error } = await supabase.storage.from(BUCKET).upload(name, file, { upsert:false })
  if(error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(name)
  return data.publicUrl
}
export async function uploadMany(files, folder){
  const arr = Array.from(files || [])
  const out = []
  for(const f of arr){
    out.push(await uploadFile(f, folder))
  }
  return out
}
