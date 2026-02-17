import mongoose, { Mongoose } from "mongoose";

export const connectDB = async () => {
    try {
        const conn:Mongoose = await mongoose.connect(process.env.MONGO_URI as string);
        console.log('Mongodb connected : ', conn.connection.host)
    } catch (error) {
        console.error("error mongodb connection : ", error);
        process.exit(1); //1 status code means fail, 0 means success
    }
}