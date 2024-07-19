# Geeks Castle Dev. 

# Requisitos: 
- Node.js (v18 o superior)
- Nest.js CLI
- Firebase CLI
- Una cuenta de Firebase y un proyecto configurado

# Instalación
Instalar los módulos de node con npm install o yarn / yarn install. 

Para instalar los módulos dentro de la carpeta functions, debe realizar un cd hacia functions (sitúese en la terminal y escriba cd functions) y luego ejecutar npm install. 

# Configuración

El siguiente paso es crear un proyecto en Firebase.

1. Crea un nuevo proyecto en Firebase Console.
2. Configurar Firebase CLI: firebase login y después firebase init
3. Configurar firebase.json: 

JSON de ejemplo para firebase.json
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "emulators": {
    "functions": {
      "port": 5001
    },
    "firestore": {
      "port": 8080
    },
    "ui": {
      "enabled": true,
      "port": 4000
    }
  }
}

Para ejecutar el emulador de Firebase, ejecute firebase emulators:start en la terminal integrada de visual studio code.

# Documentación de Endpoints

Levante el servidor de nest con npm run start:dev, luego acceda a esta url desde el navegador: http://localhost:3000/api 

Allí encontrará información más detallada sobre los endpoints.

# Env

Tome en cuenta el .env.example para que sepa cuales son las variables de entorno que se van a utilizar. 

Estas variables de entorno: FIREBASE_PROJECT_ID=, FIREBASE_PRIVATE_KEY=,FIREBASE_CLIENT_EMAIL=, puede conseguirlas en Firebase al momento de crear el proyecto.

# Tests

Para ejecutar los tests utilice el siguiente comando en la terminal integrada de visual studio code: npm run test

# Plus
Para el caso de que suceda un error con la carpeta lib dentro de la carpeta functions, haga un cd hacia la carpeta functions (cd functions) y luego ejecute npm run build.