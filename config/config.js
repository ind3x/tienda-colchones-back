// DB connection configuration
process.env.MONGO_DB_URI = "mongodb+srv://tienda-colchones-admin:UgHQLNygtzDyt0bE@cluster0-nkyfx.mongodb.net/tienda-colchones-db?retryWrites=true&w=majority";
process.env.AUTHENTICATION_SEED = process.env.AUTHENTICATION_SEED ||  "tienda-de-colchones-seed";
process.env.TOKEN_EXPIRES_IN = "48h";