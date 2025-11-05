# Dossier v7.1 — Supabase + Storage

## Variables de entorno
Crea `.env` con:
```
VITE_SUPABASE_URL=tu_url
VITE_SUPABASE_ANON_KEY=tu_key
VITE_SUPABASE_BUCKET=images
VITE_SITE_URL=http://localhost:5173
```

## BD: Tablas + RLS
Abre `supabase.sql` en el SQL editor de Supabase y ejecútalo.

## Storage (imágenes)
1) Supabase → Storage → **Create bucket**: `images` → Público ✅
2) En `.env` define `VITE_SUPABASE_BUCKET=images`.
3) En **Admin** podrás subir imágenes; la app guardará la **URL pública** en los campos.

## Auth
- Crea un usuario (email/contraseña) o regístrate desde `/login`.
- `/admin` está protegido; lo demás es público.

## Run
```
npm install
npm run dev
```
Luego abre `http://localhost:5173/`.


## Drag & Drop + Previews (v7.2)
- Usa la nueva `DropZone` en Admin para arrastrar/soltar archivos.
- Verás **previsualizaciones locales** antes de que aparezcan las URLs publicadas.
- En cargas múltiples, las URLs se agregan al campo de imágenes automáticamente.
