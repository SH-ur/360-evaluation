// db.js
require('dotenv').config();
const mongoose = require('mongoose');

const { MONGODB_URI } = process.env;

// Conectarse a la base de datos de MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Definir modelos
// Puedes importar tus modelos directamente aquí o requerir archivos desde un directorio 'models'
const Employee = require('./models/Employee');
const User = require('./models/User');
const Feedback = require("./models/Feedback");
const Evaluation = require("./models/Evaluation")

// Relaciones (en MongoDB, las relaciones no funcionan como en SQL; en lugar de eso, puedes usar referencias)
//Videogame.schema.add({ genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }] });
//Genre.schema.add({ videogames: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Videogame' }] });

// Exportar los modelos y la conexión
module.exports = {
  connectDB, // función para conectar a la base de datos
  Employee,
  User,
  Evaluation,
  Feedback
};
