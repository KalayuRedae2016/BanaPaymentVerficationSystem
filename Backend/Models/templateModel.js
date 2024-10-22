const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true ,unique:true,default:'reciept'},
  content: { type: String, required: true }, // HTML content as a string
});

const Template = mongoose.model('Template', TemplateSchema);
module.exports = Template;
