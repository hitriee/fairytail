FROM node:16.18.0-alpine

WORKDIR /var/jenkins_home/workspace/front/frontend
COPY . ./
RUN npm i
RUN npm run build

CMD ["npm", "start"]

