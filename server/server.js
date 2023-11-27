const app = require('./app');
const cloudinary = require('cloudinary');
const connectDatabase = require('./config/database');

//handle uncaught exceptions always written first 
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception');
    process.exit(1) 
});


//config 
if(process.env.NODE_ENV !== 'PRODUCTION'){
    require('dotenv').config({ path: './config/config.env' })
}
//connect to database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

//unhandled promise rejection for mongodb
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    server.close(() => {
        process.exit(1)
    })
});