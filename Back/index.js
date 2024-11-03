// index.js
const server = require('./src/app.js');
const { connectDB } = require('./src/db.js');

// Conectar a MongoDB y luego iniciar el servidor
connectDB().then(() => {
  server.listen(3001, () => {
    console.log('Server listening at 3001');
  });
}).catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
});
