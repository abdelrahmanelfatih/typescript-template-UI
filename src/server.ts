import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, 'build')));

// Serve the main HTML file on the root route
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
