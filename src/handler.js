// Importing the nanoid library to generate unique IDs
const { nanoid } = require('nanoid');

// Importing the list of places from an external file
let placeList = require('./place');

// Handler function to create a new place
const createPlaceHandler = (request, h) => {
    const {
        name,
        location,
        description,
        category,
        imageUrl
    } = request.payload;

    // Check if the name field is empty
    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan tempat wisata. Nama tempat wisata tidak boleh kosong.',
        }).code(400);
    }

    // Generating a unique ID
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    // Creating a new place object
    const newPlace = {
        id,
        name,
        location,
        description,
        category,
        imageUrl,
        createdAt,
        updatedAt,
        rating: 0, // Default rating value
    };

    // Adding the new place to the place list
    placeList.push(newPlace);

    // Checking if the place was successfully added
    const isSuccess = placeList.some((place) => place.id === id);

    // Returning a success response if the place was added successfully
    if (isSuccess) {
        return h.response({
            status: 'success',
            message: 'Tempat wisata berhasil ditambahkan.',
            data: {
                placeId: id,
            },
        }).code(201);
    }

    // Returning an error response if the place could not be added
    return h.response({
        status: 'error',
        message: 'Tempat wisata gagal ditambahkan.',
    }).code(500);
};

// Handler function to fetch all places with optional filtering
const fetchAllPlacesHandler = (request, h) => {
    const { name, category } = request.query;

    let filteredPlaces = placeList;

    // Filtering places by name if provided
    if (name) {
        filteredPlaces = filteredPlaces.filter((place) =>
            place.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    // Filtering places by category if provided
    if (category) {
        filteredPlaces = filteredPlaces.filter((place) =>
            place.category.toLowerCase().includes(category.toLowerCase())
        );
    }

    // Returning a success response with the filtered list of places
    return h.response({
        status: 'success',
        data: {
            places: filteredPlaces.map((place) => ({
                id: place.id,
                name: place.name,
                location: place.location,
                category: place.category,
                imageUrl: place.imageUrl,
                rating: place.rating, // Include rating in the response
            })),
        },
    }).code(200);
};

// Handler function to fetch a single place by its ID
const fetchPlaceByIdHandler = (request, h) => {
    const { id } = request.params;

    // Finding the place with the given ID
    const place = placeList.find((p) => p.id === id);

    // Returning a success response with the place if found
    if (place) {
        return h.response({
            status: 'success',
            data: {
                place,
            },
        }).code(200);
    }

    // Returning a failure response if the place is not found
    return h.response({
        status: 'fail',
        message: 'Tempat wisata tidak ditemukan.',
    }).code(404);
};

// Handler function to update a place by its ID
const updatePlaceByIdHandler = (request, h) => {
    const { id } = request.params;
    const { name, location, description, category, imageUrl } = request.payload;
    const updatedAt = new Date().toISOString();
    const index = placeList.findIndex((place) => place.id === id);

    // Checking if the place with the given ID exists
    if (index !== -1) {
        // Checking if the name field is empty
        if (!name) {
            return h.response({
                status: 'fail',
                message: 'Gagal memperbarui tempat wisata. Nama tempat wisata tidak boleh kosong.',
            }).code(400);
        }

        // Updating the place with the new information
        placeList[index] = {
            ...placeList[index],
            name,
            location,
            description,
            category,
            imageUrl,
            updatedAt,
        };

        // Returning a success response if the place was updated successfully
        return h.response({
            status: 'success',
            message: 'Tempat wisata berhasil diperbarui.',
        }).code(200);
    }

    // Returning a failure response if the place with the given ID is not found
    return h.response({
        status: 'fail',
        message: 'Gagal memperbarui tempat wisata. ID tidak ditemukan.',
    }).code(404);
};

// Handler function to remove a place by its ID
const removePlaceByIdHandler = (request, h) => {
    const { id } = request.params;
    const index = placeList.findIndex((place) => place.id === id);

    // Checking if the place with the given ID exists
    if (index !== -1) {
        // Removing the place from the list
        placeList.splice(index, 1);

        // Returning a success response if the place was removed successfully
        return h.response({
            status: 'success',
            message: 'Tempat wisata berhasil dihapus.',
        }).code(200);
    }

    // Returning a failure response if the place with the given ID is not found
    return h.response({
        status: 'fail',
        message: 'Gagal menghapus tempat wisata. ID tidak ditemukan.',
    }).code(404);
};

// Handler function to add rating to a place
const addRatingHandler = (request, h) => {
    const { id } = request.params;
    const { rating } = request.payload;

    // Finding the place with the given ID
    const placeIndex = placeList.findIndex((place) => place.id === id);

    // If place not found, return error
    if (placeIndex === -1) {
        return h.response({
            status: 'fail',
            message: 'Tempat wisata tidak ditemukan.',
        }).code(404);
    }

    // Adding the rating to the place
    placeList[placeIndex].rating = rating;

    return h.response({
        status: 'success',
        message: 'Rating berhasil ditambahkan.',
        data: {
            place: placeList[placeIndex],
        },
    }).code(200);
};

// Exporting the handler functions for use in other modules
module.exports = {
    createPlaceHandler,
    fetchAllPlacesHandler,
    fetchPlaceByIdHandler,
    updatePlaceByIdHandler,
    removePlaceByIdHandler,
    addRatingHandler, // Export the new handler
};