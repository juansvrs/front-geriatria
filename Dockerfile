# Usar la imagen oficial de Node.js como base
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos necesarios para instalar las dependencias
COPY package.json package-lock.json /app/

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . /app/

# Construir la aplicación Angular
RUN npm run build

# Exponer el puerto en el que la aplicación Angular se ejecutará
EXPOSE 80

# Comando para iniciar la aplicación Angular
CMD ["npm", "start"]
