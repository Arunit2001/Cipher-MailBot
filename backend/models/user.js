const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const Schema   = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
  method: {
    type: String,
    enum: ['local', 'google'],
    required: true
  },
  local: {
    email: {
      type: String,
      lowercase: true
    },
    password: { 
      type: String
    }
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  name: String,
  createdAt: Date
});

// userSchema.methods

// userSchema.methods.isValidPassword = async function(newPassword) {
//   try {
//     console.log(newPassword);
//     return await bcrypt.compare(newPassword, this.local.password);
//   } catch(error) {
//     throw new Error(error);
//   }
// };

// Create a model
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;
module.exports.hashedPassword = async function(password){
  try {
    console.log('entered');
    // Generate a salt
    const saltRounds = 10;
    // Generate a password hash (salt + hash)
    return await bcrypt.hash(password, saltRounds);
    // Re-assign hashed version over original, plain text password
  } catch(error) {
      throw new Error('hashing failed', error)
  }
};