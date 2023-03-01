const express= require("express");
const { default: mongoose } = require("mongoose");
const path= require("path");
module.exports= class Application{
    #app= express();
    #DB_URI;
    #PORT;
    constructor(PORT, DB_URI){
        this.PORT= PORT;
        this.DB_URI= DB_URI;
        this.configApplication();
        this.connectToMongoDB(DB_URI);
        this.createServer(PORT);
        this.createRoutes();
        this.errorHandling();
    }
    configApplication(){
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: true}));
        this.#app.use(express.static(path.join(__dirname, "..", "public")));
    }
    createServer(PORT){
        const http= require("http");
        http.createServer(this.#app).listen(PORT, ()=>{
            console.log(`Server is running on http://localhost:${PORT}`);
        })
    }
    connectToMongoDB(DB_URI){
        mongoose.connect(DB_URI)
        .then(()=>{
            return console.log("Connected to MongoDB successfully✔️");
        })
        .catch((err)=>{
            return console.log("Failed to Connect to MongoDB❌");
        })
    }
    createRoutes(){

    }
    errorHandling(){
        this.#app.use((req, res, next)=>{
            return res.status(404).json({
                statusCode: 404,
                message: "Not Found❗"
            })
        })
        this.#app.use((error, req, res, next)=>{
            const statusCode= error.statusCode || 500;
            const message= error.message || "InternalServerError";
            return res.status(statusCode).json({
                statusCode,
                message 
            })
        })
    }
}