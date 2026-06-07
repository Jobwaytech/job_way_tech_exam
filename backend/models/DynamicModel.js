const mongoose = require("mongoose");

const dynamicSchema = new mongoose.Schema({}, { strict: false, timestamps: true });

const getDynamicModel = (collectionName) => {
  return mongoose.models[collectionName] || mongoose.model(collectionName, dynamicSchema, collectionName);
};

module.exports = getDynamicModel;