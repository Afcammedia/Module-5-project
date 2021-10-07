require('dotenv').config();
const Mongoose = require('mongoose');
const AppError = require('../utils/handle.errors');

const url = process.env.URl;

module.exports = async () => {
    try {
        // Connection to database
        await Mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => console.log('DataBase Connected!..'))
            .catch((err) => {
                throw new AppError(err.message, 500);
            });

        // Checking for Database connection
        Mongoose.connection.on('connected', () => {
            throw new AppError('Mongoose connected to Database', 500);
        });

        // Catching errors
        Mongoose.connection.on('error', (error) => {
            throw new AppError(error.message, 500);
        });

        // Checking database disconnection
        Mongoose.connection.on('disconnected', (error) => {
            throw new AppError('Mongoose connection is disconnected', 500);
        });
    } catch (error) {
        throw new AppError('Something went wrong with mongoDB', 500);
    }
};
