## Instalación

**Clonar repositorio**
   ```bash
   git clone https://github.com/AbrilSabatini/forit-task
   ```
   ```bash
   cd forit-task
   ```
   ---
### **Ejecutar Backend**
  1. Ir a la carpeta del backend:
      ```bash
      cd Backend
      ```
  2. Crear un archivo `.env` en la raiz del proyecto a partir de `.env.template`.  

      ``` .env
      PORT=3000              # Puerto de la App
      SEED_DATA=true         # Inicia la aplicación con tareas precargadas
      ```
  3. Instalar dependencias y correr la aplicación:
      ```bash
      npm install
      ```
      ```bash
      npm run dev
      ```
### **Ejecutar Frontend**
  1. Ir a la carpeta del frontend:
      ```bash
      cd ../Frontend
      ```
      o
      ```bash
      cd Frontend
      ```
  2. Crear un archivo `.env` en la raiz del proyecto a partir de `.env.template`.  

      ``` .env
      VITE_API_URL=http://localhost:3000/api              # URL del backend
      ```
  3. Instalar dependencias y correr la aplicación:
      ```bash
      npm install
      ```
      ```bash
      npm run dev
      ```