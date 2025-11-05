import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const DataContext = createContext()
export const useData = ()=> useContext(DataContext)

export function DataProvider({ children }){
  const [members, setMembers] = useState([])
  const [spots, setSpots] = useState([])
  const [movimientos, setMovimientos] = useState([])
  const [events, setEvents] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [loading, setLoading] = useState(true)

  async function loadAll(){
    setLoading(true)
    const [m, s, mv, ev] = await Promise.all([
      supabase.from('members').select('*').order('id'),
      supabase.from('spots').select('*').order('id'),
      supabase.from('movements').select('*').order('date', { ascending: true }),
      supabase.from('events').select('*').order('date', { ascending: true })
    ])
    if(!m.error) setMembers(m.data || [])
    if(!s.error) setSpots(s.data || [])
    if(!mv.error) setMovimientos(mv.data || [])
    if(!ev.error) setEvents(ev.data || [])
    setLoading(false)
  }
  useEffect(()=>{ loadAll() }, [])

  const setters = { members:setMembers, spots:setSpots, movements:setMovimientos, events:setEvents }

  const add = async (table, item) => { const { data, error } = await supabase.from(table).insert(item).select(); if(error) throw error; setters[table](p=>[...p,...(data||[])]); }
  const update = async (table, id, patch) => { const { data, error } = await supabase.from(table).update(patch).eq('id', id).select(); if(error) throw error; setters[table](p=>p.map(x=> x.id===id ? {...x, ...(data?.[0]||patch)} : x)); }
  const remove = async (table, id) => { const { error } = await supabase.from(table).delete().eq('id', id); if(error) throw error; setters[table](p=>p.filter(x=>x.id!==id)); }

  const selectMember = (id)=> setSelectedId(id)
  const clearSelection = ()=> setSelectedId(null)
  const selectedMember = useMemo(()=> members.find(m=>m.id===selectedId) || null, [selectedId, members])

  return <DataContext.Provider value={{ members, spots, movimientos, events, add, update, remove, loadAll, selectedId, selectedMember, selectMember, clearSelection, loading }}>{children}</DataContext.Provider>
}
