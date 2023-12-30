const express = require('express');
const cors = require('cors');
const mongoDB = require('./Db');
const cloudinary = require('cloudinary').v2; // Add Cloudinary module
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

mongoDB(); // Call the function to connect to MongoDB

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON in the request body
app.use(express.json());

// Configure Cloudinary with your account details
cloudinary.config({
  cloud_name: 'di9tuayhz',
  api_key: '371743922548799',
  api_secret: 'xq5qUkUbBfsFLQTFTSAQTiwzUHA',
});

// Function to upload images from a local directory
const uploadImages = async () => {
  try {
    // Directory path where your images are stored
    // const directoryPath = 'E:\Desktop\Documents\photots\WhatsApp Images\WhatsApp Images\Aaryan jewells';
    const directoryPath = 'E:/Desktop/Documents/photots/WhatsApp Images/WhatsApp Images/Aaryan jewells';

    // Read the files in the directory
    const files = fs.readdirSync(directoryPath);

    // Iterate through each file
    for (const file of files) {
      const filePath = path.join(directoryPath, file);

      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(filePath, { public_id: file });

      // Log the result for each image
      // console.log(`Uploaded ${file}: ${result.secure_url}`);
    }
  } catch (error) {
    console.error(`Error uploading images: ${error.message}`);
  }
};

// Call the function to upload images when the server starts
// uploadImages();

// Define your existing routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Import and use the createUser route
const createUserRoute = require('./Routes/CreateUser');
app.use('/users', createUserRoute);
app.use('/users', require('./Routes/DisplayData'));
app.use('/users', require('./Routes/orderedData'));
app.use('/users', require('./Routes/MyOrderout'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
