import fs from 'fs';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { default as jsonServer } from 'json-server';
import { statistics } from '@/mocked-apis/statistics';
import { enableCors } from '@/setup';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 4243;
const backend = process.env.BACKEND || 'http://localhost:4242';
const componentsDir = process.env.PREMIUM_COMPONENT_DIR;

if (!componentsDir) {
  console.error('PREMIUM_COMPONENT_DIR environment variable was not set');
  process.exit(1);
}

if (
  !fs.existsSync(componentsDir) ||
  !fs.statSync(componentsDir).isDirectory()
) {
  console.error('PREMIUM_COMPONENT_DIR has to be a directory');
  process.exit(1);
}

enableCors(server);
statistics(server, componentsDir);

server.use(createProxyMiddleware({ target: backend }));
server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`Proxy server is running at http://localhost:${port}`);
});
