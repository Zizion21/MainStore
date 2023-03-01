const express= require("express");
const { default: mongoose } = require("mongoose");
const morgan = require("morgan");
const path= require("path");
const createError= require("http-errors");
const { AllRoutes } = require("./router/router");
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
        this.#app.use(morgan("dev"));
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
        mongoose.connection.on("connected", ()=>{
            console.log("Mongoose connected to DB ✔️");
        });
        mongoose.connection.on("disconnected", (error)=>{
            console.log("Failed to connect to DB ❌");
        });
        process.on("SIGINT", async()=>{
            console.log("Disconnected❗");
            await mongoose.connection.close();
            process.exit(0);
        });
    }
    createRoutes(){
        this.#app.use(AllRoutes)

    }
    errorHandling(){
        this.#app.use((req, res, next)=>{
            next(createError.NotFound())
        })
        this.#app.use((error, req, res, next)=>{
            const serverError= createError.InternalServerError();
            const statusCode= error.statusCode || serverError.status;
            const message= error.message || serverError.message;
            return res.status(statusCode).json({
                errors: {
                    statusCode,
                    message 
                }
            })
        })
    }
}