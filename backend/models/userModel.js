import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // Ensures email must be unique
            trim: true, // Optional: Trims whitespace from the email
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            default: 0,
        },
        pan: {
            number: {
                type: String,
                // Optional: Add unique: true if PAN should be unique
            },
            name: {
                type: String,
                // Optional: Add validation or constraints as needed
            },
        },
        wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Reference to Product model
        
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model("User", userSchema);
