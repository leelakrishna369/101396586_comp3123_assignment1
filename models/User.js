const mongoose = require('mongoose') // Import Mongodb libraries
const bcrypt = require('bcrypt'); // Import bcrypt libraries

// UserSchema has been created
const userSchema = new mongoose.Schema({ 
    username: {type:String, required: true, unique: true},
    email: {type:String, required: true, unique: true },
    password: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at:{ type: Date, default: Date.now}
})


// Hash the password before saving the user
// userSchema.pre('save', async function(next){
//     if(this.isModified('password')){ // Checks if the password is modified or been created for the first time
//         this.password = await bcrypt.hash(this.password, 10); // Hash the password using bcrypt
//     }
//     next(); // Moves on to the next middleWare
// })

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
