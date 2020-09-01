const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

class DevController {
    async store (request, response){
        const { github_username, techs, latitude, longitude } = request.body;


        let dev = await Dev.findOne({ github_username });

        if(!dev)
        {
            const responseApi = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = responseApi.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                bio,
                avatar_url,
                techs: techsArray,
                location
            });
        }

        return response.json(dev);
    }

    async index(request, response){
        //Buscar todos devs num raio de 10km
        //Filtar por tecnologias
        const { latitude, longitude, techs } = request.query;
        let devs = [];
        
       devs = await Dev.find();

        if(techs && latitude && longitude){
            const techsArray = parseStringAsArray(techs);
            devs = await Dev.find({
                techs: {
                    $in: techsArray
                },
                location: {
                    $near: {
                        $geometry:{
                            type: 'Point',
                            coordinates: [ longitude, latitude]
                        },
                        $maxDistance: 10000
                    }
                }
            });
        }

        else if(techs){
            const techsArray = parseStringAsArray(techs);
            devs = await Dev.find({
                techs: {
                    $in: techsArray
                }
            });
        }

        else
            devs = await Dev.find();
        return response.json(devs);
    }
}

module.exports = new DevController();