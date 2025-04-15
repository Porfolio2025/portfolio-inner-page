FROM node:20


RUN npm install -g pnpm


WORKDIR /app


COPY pnpm-lock.yaml package.json ./


RUN pnpm install


COPY . .


RUN pnpm build-only


RUN npm install -g serve


EXPOSE 3000


CMD ["serve", "-s", "dist", "-l", "3000"]
