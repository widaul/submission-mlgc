const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');
 
async function predictBinaryClassification(model, image) {

    // mengonversi input gambarnya dulu menjadi tensor
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()

    // mendapatkan prediksi, score, dan confidenceScore
    const prediction = model.predict(tensor);
    const score = await prediction.data();

    const label = score > 0.5 ? 'Cancer' : 'Non-cancer';

    const suggestion = label === 'Cancer'
        ? "Segera periksa ke dokter!"
        : "Penyakit kanker tidak terdeteksi.";

    return { label, suggestion };
    } 
    
    catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`)
    }
    

}

module.exports = predictBinaryClassification;