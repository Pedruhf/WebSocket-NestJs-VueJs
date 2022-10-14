FROM node:16-alpine

RUN apk add --no-cache bash git

RUN touch /home/node/.bashrc | echo "PS1='\w\$ '" >> /home/node/.bashrc

# RUN npm config set cache /home/node/app/.npm-cache --global

RUN npm i -g @nestjs/cli

USER node

WORKDIR /home/node/app
