import mongoose from "mongoose";

export async function main(){
    await mongoose.connect('mongodb://local:27017/getapet')

    console.log("Conectou ao Mongoose!")

}

main.catch((err) => console.log(err))

