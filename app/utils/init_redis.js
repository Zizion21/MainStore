const redisDB= require("redis");
const redisClient= redisDB.createClient();
redisClient.connect();
redisClient.on("connect", ()=> console.log("Connected to redis successfully 🍅"));
redisClient.on("ready", ()=> console.log("Redis is ready to use...💥"));
redisClient.on("error", (err)=> console.log("Redis Error:", err.message));
redisClient.on("end", ()=> console.log("Redis disconnected."));

module.exports= redisClient;