FROM node:18.19.0-slim

RUN ["mkdir", "intradata_crud"]
# RUN ["mkdir", "/intradata_crud/src"]

WORKDIR "/intradata_crud"

COPY ["./files/vite.config.js", "./files/package.json","./files/index.html", "/intradata_crud/"]
RUN ["npm", "install"]

COPY ["./files/src", "/intradata_crud/src"]

CMD ["npm", "run", "dev"]