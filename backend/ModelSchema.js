import mongoose from 'mongoose';

const modelSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        description: "The user's full name, used to construct the user_id."
    },
    user_id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[a-z_]+_\d{8}$/,
        description: "Unique user identifier in the format: {full_name_ddmmyyyy}."
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    roll_number: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    oddNumbers : {
        type: [Number],
    },
    evenNumbers : {
        type: [Number],
    },
    alphabets : {
        type: [String],
    },
    specialCharacters : {
        type: [String],
    },
    sum : {
        type: Number,
    },
    concatenatedString : {
        type: String,
    }
}, {timestamps: true});

const Model = mongoose.model('Model', modelSchema);
export default Model;