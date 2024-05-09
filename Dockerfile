FROM node:18.19.0

ENV PATH /app/node_modules/.bin:$PATH 
COPY package*.json ./ 
RUN npm install

COPY . . 
RUN npm run build
# RUN serve -s dist -l 8809 
CMD  npm run start

EXPOSE 5052