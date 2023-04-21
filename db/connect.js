import mongoose from "mongoose";

export const connectDB = (url) => {
    return mongoose.connect(url)
    .then(() => console.log('connected'))
    .catch((error) => console.error(error))
}