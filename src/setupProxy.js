const {API_URL} = require('@/constants/system');
const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: `${API_URL}`,
      changeOrigin: true,
    }),
  );
};
