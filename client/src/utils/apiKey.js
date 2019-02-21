if (!process.env.NODE_ENV) require('dotenv').config();

const { apiKey } = process.env;

export default apiKey;
