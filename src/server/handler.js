const predictBinaryClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const getHistories = require("../services/getHistories");

async function postPredictHandler(request, h) {

        const { image } = request.payload;
        const { model } = request.server.app;

        const { label, suggestion } = await predictBinaryClassification(model, image);
        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();

        const data = {
            id,
            result: label,
            suggestion,
            createdAt,
        };

        await storeData(id, data);

        const response = h.response({
            status: 'success',
            message: 'Model is predicted successfully',
            data,
        });
        response.code(201);
        return response;

    } 

    async function getHistoriesHandler(_request, h) {
        histories = await getHistories()
        const response = h.response({
            status: 'success',
            data: histories
        })
        return response;
    }

   
  module.exports = {postPredictHandler, getHistoriesHandler };