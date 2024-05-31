const {
    addPlaceHandler,
    getAllPlacesHandler,
    getPlaceByIdHandler,
    editPlaceByIdHandler,
    deletePlaceByIdHandler,
    addRatingHandler
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

    {
        method: 'POST',
        path: '/places/{id}/rating',
        handler: addRatingHandler
    },
];

module.exports = routes;