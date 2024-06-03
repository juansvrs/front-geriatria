# FRONTGERIATRIA
Este proyecto fue generado con Angular CLI versión 17.0.10.
Este proyecto utiliza boostrap 5.

## LevantamientoServidor de desarrollo
Primero que nada es necesario ejecutar "npm install"
Ejecuta ng serve para un servidor de desarrollo. Navega a http://localhost:4200/. La aplicación se recargará automáticamente si cambias cualquiera de los archivos fuente.

## Creación de código
Ejecuta "ng generate component component-name" para generar un nuevo componente. También puedes usar ng generate directive|pipe|service|class|guard|interface|enum|module.

## Build
Ejecuta "ng build" para construir el proyecto. Los archivos resultantes de la construcción se almacenarán en el directorio dist/.

## Configurar proxy para el backend
Para configurar el host del backend de la aplicacion se realiza desde proxy.conf.json: Se reemplaza " "target": "http://34.148.160.13:8082/" " por la url deseada sea localhost o un servidor. Este seria el endpoint general para el resto de servicios en la aplicacion.

## Levantamiento con DOCKER
En caso de utilizar Docker como manera de levantar el componente de manera sencilla, este repositorio cuenta con Dockerfile y docker-compose.yml. Ubicarse en la raiz del proyecto y ejecutar "docker compose up -d". Cuando el proceso de instalacion termine consultar "docker ps" para observar el puerto que abrio el docker que en el archivo de configuracion de docker esta definido el puerto 80.

## Estructura general
```
front-geriatria
│  ├─ app
│  │  ├─ app.component.ts
│  │  ├─ app.config.ts
│  │  ├─ app.routes.ts
│  │  ├─ core
│  │  │  └─ header
│  │  ├─ feature
│  │  │  ├─ actividades
│  │  │  │  ├─ actividades-agregar
│  │  │  │  ├─ actividades-agregar-categoria
│  │  │  │  ├─ actividades.component.ts
│  │  │  │  └─ service
│  │  │  │     ├─ actividad.service.ts
│  │  │  │     ├─ actividad.ts
│  │  │  │     └─ tipo-actividad
│  │  │  │        ├─ tipo-actividad.service.ts
│  │  │  │        └─ tipo-actividad.ts
│  │  │  ├─ informes
│  │  │  │  └─ informes.component.ts
│  │  │  ├─ pacientes
│  │  │  │  ├─ paciente-actividades
│  │  │  │  ├─ paciente-agregar
│  │  │  │  ├─ paciente-item
│  │  │  │  ├─ pacientes.component.ts
│  │  │  │  └─ service
│  │  │  │     ├─ paciente.service.ts
│  │  │  │     └─ paciente.ts
│  │  │  ├─ registros
│  │  │  │  ├─ registro
│  │  │  │  │  └─ registro.component.ts
│  │  │  │  └─ service
│  │  │  │     ├─ registro.service.ts
│  │  │  │     └─ registro.ts
│  │  │  └─ resumen
│  │  └─ shared
│  │     ├─ alerta-service.ts
│  │     ├─ paciente-actividad.service.ts
│  │     └─ paciente-actividad.ts
│  ├─ assets
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ main.ts
│  └─ styles.css
```



## Más ayuda
Para obtener más ayuda sobre Angular CLI, usa ng help o visita la página Angular CLI Overview and Command Reference.



