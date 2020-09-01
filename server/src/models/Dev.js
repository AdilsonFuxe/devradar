const mongoose = require('../database/connection');
const PointSchema = require('./utils/PointSchema');

const DevSchema = new mongoose.Schema({
    github_username: String,
    name: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location:{
        type: PointSchema,
        index: '2dsphere'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Dev', DevSchema);