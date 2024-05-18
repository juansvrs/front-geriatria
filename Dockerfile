# Usar la imagen oficial de Node.js como base
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /src/app

# Copiar los archivos necesarios para instalar las dependencias
COPY package.json package-lock.json /src/app/

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . /src/app/

# Construir la aplicación Angular
RUN npm run build

# Exponer el puerto en el que la aplicación Angular se ejecutará
EXPOSE 80

# Comando para iniciar la aplicación Angular
#CMD ["npm", "start"]

CMD ["ng", "serve", "--host", "0.0.0.0"]
