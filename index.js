const Application= require("./app/server");
const DB_URI= 'mongodb://localhost:27017/MainStore';
const PORT= 5000;
new Application(PORT, DB_URI)