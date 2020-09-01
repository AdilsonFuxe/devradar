const { Router } = require('express');
const DevController = require('./controllers/DevController');

const routes = Router();



routes.post('/devs', DevController.store);

routes.get('/devs', DevController.index);

routes.get('/devs/:id', (request, response)=>{
    return response.json();
});

routes.put('/devs/:id', (request, response)=>{
    return response.json();
});

routes.delete('/devs/:id', (request, response)=>{
    return response.json();
});


module.exports = routes;