//connect to mongodb server at backend
const mongoose = require("mongoose");

const connecttoMongo = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(con => { console.log(`MongoDB Database connected with HOST: ${con.connection.host}`) });
}


module.exports = connecttoMongo;
