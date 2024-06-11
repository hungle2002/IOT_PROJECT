import cors from 'cors';
const allowedOrigins = ['http://localhost:3001'];

const options: cors.CorsOptions = {
  origin: ['*'],
};

export default options;
