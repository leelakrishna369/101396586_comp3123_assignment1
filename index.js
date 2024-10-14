const express = require('express');
const mongoose = require('mongoose'); // Mongoose for MongoDB connection
const SERVER_PORT = process.env.port || 8181;
const employeeRoutes = require('./routes/empmanagement')
const userRoutes = require('./routes/usermanagement')

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://lkrm1585:lkrm1585@cluster0.vvphl.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,  
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log('Error connecting to MongoDB:', error));

app.use('/api/v1/emp', employeeRoutes);
app.use('/api/v1/user', userRoutes)

app.listen(SERVER_PORT, () => {
    console.log("The server is running is on port 8181")
})