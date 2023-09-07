const mongoose = require('mongoose');

module.exports = function connectDB() {
    //connecting to MongoDB
    mongoose.connect(process.env.MONGO_URI);

    //Check for a connection
    const db = mongoose.connection;

    
    db.on('error',(e) =>  console.log(e));
    db.on('open', () => console.log('Connected to MongoDB'));
    db.on('close', () => console.log('MongoDB disconnected'));
    
    //* closes connection to db after 5 seconds
    // setTimeout(() => {
    //     db.close()
    // }, 3000);
}