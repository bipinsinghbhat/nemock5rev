const mongoose=require("mongoose")
const mongourl="mongodb+srv://bipin:bipin@cluster0.c8pbmt2.mongodb.net/mock900?retryWrites=true&w=majority"

const connection=mongoose.connect(mongourl)

module.exports={
    connection
}

