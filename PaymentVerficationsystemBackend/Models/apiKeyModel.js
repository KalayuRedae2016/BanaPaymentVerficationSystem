const mongoose = require('mongoose');
const crypto = require('crypto');

// Define API Key Schema
const apiKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  bankType: {
    type: String,
    required: true,
  },
  scope: {
    type: String,
    enum: ['read-only', 'write', 'admin'],
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'revoked'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: null, // Optionally, you can add an expiration date for API keys
  },
});

module.exports = mongoose.model('ApiKey', apiKeySchema);

