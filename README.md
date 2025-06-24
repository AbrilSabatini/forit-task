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
   #### Rutas disponibles
   El backend expone las siguientes rutas en http://localhost:{PORT}/api:  
      
   | Método | Ruta         | Descripción                            |  
   | ------ | ------------ | -------------------------------------- |  
   | GET    | `/tasks`     | Obtener todas las tareas               |  
   | GET    | `/tasks/:id` | Obtener una tarea específica por su ID |  
   | POST   | `/tasks`     | Crear una nueva tarea                  |  
   | PUT    | `/tasks/:id` | Actualizar una tarea existente         |  
   | DELETE | `/tasks/:id` | Eliminar una tarea                     |  

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
---
### Lista de tareas:
![image](https://github.com/user-attachments/assets/100d03e4-25bd-4dd8-9c0b-019a124e46a5) 
  
### Crear tarea:  
![image](https://github.com/user-attachments/assets/80840d52-2c64-4a48-9a92-65a1ff3f4d9e)  
![image](https://github.com/user-attachments/assets/829896c8-3cef-4a41-b43e-7b6873c060e1)  
  
### Tarea individual:  
![image](https://github.com/user-attachments/assets/943dd63e-b67d-4a61-bceb-2e4da668ab33)  
  
### Actualizar tarea:  
![image](https://github.com/user-attachments/assets/42d009d1-54fc-4dc1-beb3-558cb204c3ac)  
![image](https://github.com/user-attachments/assets/dab74e8d-87ba-4e29-be9f-925001686a65)  
  
### Eliminar tarea:  
![image](https://github.com/user-attachments/assets/862ee4cb-9289-4147-b79d-d7f3654efb36)  

