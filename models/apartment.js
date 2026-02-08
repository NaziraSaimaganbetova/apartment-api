const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Title is required'],
        trim: true 
    },
    description: { 
        type: String, 
        required: [true, 'Description is required'] 
    },
    price: { 
        type: Number, 
        required: [true, 'Price is required'] 
    },
    location: { 
        type: String, 
        required: [true, 'Location is required'] 
    },
    listingType: { 
        type: String, 
        enum: ['rent', 'sell'], 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['available', 'sold', 'rented'], 
        default: 'available' 
    },
    // RELATIONSHIP: Link to the User who created the post
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
}, { 
    timestamps: true // Automatically creates createdAt and updatedAt fields
});

module.exports = mongoose.model('Apartment', apartmentSchema);