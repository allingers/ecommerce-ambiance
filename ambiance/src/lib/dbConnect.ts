import mongoose from 'mongoose'

// Kontrollerar om MONGODB_URI finns i miljövariablerna
if (!process.env.MONGODB_URI) {
	throw new Error('Please add your MONGODB_URI to .env.local')
}

// Hämta MONGODB_URI från miljövariablerna eller använd en fallback om det inte finns
const MONGODB_URI: string =
	process.env.MONGODB_URI ||
	'mongodb+srv://ambiance-admin:89Sierra567@ambiance.jgmcuvo.mongodb.net/ambianceDB?retryWrites=true&w=majority'

// Skapa en global variabel för att lagra mongoose och anslutningsinformation
let globalWithMongoose = global as typeof globalThis & {
	mongoose: any
}
let cached = globalWithMongoose.mongoose

// Om mongoose inte är cachad, skapa en ny cache
if (!cached) {
	cached = globalWithMongoose.mongoose = { conn: null, promise: null }
}

// Funktion för att ansluta till MongoDB
async function dbConnect() {
	if (cached.conn) {
		return cached.conn
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		}

		// Anslut till MongoDB och lagra anslutningen i cachen
		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
			return mongoose
		})
	}
	cached.conn = await cached.promise
	return cached.conn
}

export default dbConnect
