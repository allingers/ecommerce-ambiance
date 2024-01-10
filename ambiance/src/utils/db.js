const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

// Hämta anslutningssträngen från .env-filen
const url = process.env.MONGODB_URI || "mongodb+srv://ambiance-admin:89Sierra567@ambiance.jgmcuvo.mongodb.net/ambianceDB?retryWrites=true&w=majority";

// Skapa en instans av MongoClient
const client = new MongoClient(url);

async function run() {
    try {
        // Anslut till MongoDB Atlas
        await client.connect();
        console.log("Successfully connected to Atlas");

    } catch (err) {
        console.log(err.stack);
    } finally {
        // Stäng anslutningen när du är klar
        await client.close();
    }
}

// Kör din funktion
run().catch(console.dir);

