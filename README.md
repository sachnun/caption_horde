# Image Captioning API Documentation

The Image Captioning API allows you to generate captions for images using the StableHorde API. It utilizes Express.js, Multer, and Node-fetch libraries to handle the server-side logic and interaction with the StableHorde API.

## Prerequisites

Before using the Image Captioning API, you need to have the following:

1. StableHorde API Key: Obtain an API key from StableHorde to authenticate your requests.

## Installation

To set up and run the Image Captioning API, follow these steps:

1. Clone the repository and navigate to the project directory.
2. Run `npm install` to install the required dependencies.
3. Replace the `(API_KEY)` placeholder in the code with your StableHorde API key.
4. Run `node app.js` to start the server. The API will be accessible at `http://localhost:3000`.

## API Endpoints

### `GET /`

- Returns a JSON response with a welcome message indicating the successful connection to the Image Captioning API.

### `POST /upload`

- Accepts a single image file (`image`) using a `multipart/form-data` request.
- Generates captions for the uploaded image using the StableHorde API.
- Deletes the uploaded file from the server after generating the captions.
- Returns a JSON response containing the generated captions.

## Usage

To generate captions for an image, follow these steps:

1. Make a POST request to `/upload` endpoint with an image file in the request payload.
2. Upon successful processing, the API will return a JSON response with the generated captions for the image.

## Error Handling

If any errors occur during the process, the API will return a 500 status code along with an error message in the response.

Please note that the Image Captioning API is designed to work with the StableHorde API and requires a stable internet connection and a valid StableHorde API key.

For more details on the StableHorde API, refer to the official StableHorde documentation.

Feel free to explore and integrate the Image Captioning API into your applications!

For any further assistance or support, please contact the API developer at (email or contact information).
