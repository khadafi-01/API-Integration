const {
    addPlaceHandler,
    getAllPlacesHandler,
    getPlaceByIdHandler,
    editPlaceByIdHandler,
    deletePlaceByIdHandler
} = require('./handler');

const routes = [{
        method: 'POST',
        path: '/places',
        handler: addPlaceHandler,
    },
    {
        method: 'GET',
        path: '/places',
        handler: getAllPlacesHandler,
    },
    {
        method: 'GET',
        path: '/places/{id}',
        handler: getPlaceByIdHandler,
    },
    {
        method: 'PUT',
        path: '/places/{id}',
        handler: editPlaceByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/places/{id}',
        handler: deletePlaceByIdHandler,
    },
];

module.exports = routes;