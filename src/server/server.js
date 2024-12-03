const Hapi = require('@hapi/hapi');
const routes = require('./routes');
require('dotenv').config();

const loadModel = require('../services/loadModel');
const InputError = require('../exceptions/InputError');

(async () => {
    const server = Hapi.server({
        port: 8000,
        host: '0.0.0.0',
        routes: {
            cors: {
              origin: ['*'],
            },
        },
    });
    server.route(routes); 
    server.ext('onPreResponse', function (request, h) {
        const response = request.response;
        if (response instanceof InputError) {
            const newResponse = h.response({
                status: 'fail',
                message: 'Terjadi kesalahan dalam melakukan prediksi'
            })
            newResponse.code(response.statusCode)
            return newResponse;
        }
        if (response.isBoom) {
            const newResponse = h.response({
                status: 'fail',
                message: response.message
            })
            newResponse.code(response.output.statusCode)
            return newResponse;
        }
        return h.continue;
    });    
    const model = await loadModel();
    server.app.model = model;
    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
})();