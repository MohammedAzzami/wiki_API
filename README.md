# RESTful API with Express and MongoDB

This project implements a simple RESTful API using Express.js and MongoDB, allowing CRUD operations (Create, Read, Update, Delete) on articles.

## Features

- **GET /articles**: Retrieve all articles.
- **POST /articles**: Create a new article.
- **DELETE /articles**: Delete all articles.
- **GET /articles/:articleTitle**: Retrieve a specific article by title.
- **PUT /articles/:articleTitle**: Update a specific article by title (overwrite).
- **PATCH /articles/:articleTitle**: Update specific fields of a specific article.
- **DELETE /articles/:articleTitle**: Delete a specific article by title.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing articles.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Body-parser**: Middleware to parse incoming request bodies.
- **EJS**: Templating engine for rendering views (optional, if used).

## Setup

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd <repository_directory>
2. **Install dependencies:**:
   npm install
3. **Configure MongoDB**:
   a- Ensure MongoDB is installed and running locally.
   b- Update mongoose.connect() in app.js to point to your MongoDB instance.
4. **API Endpoints**:
   Use tools like Postman to interact with the API endpoints listed above.

## Contributing
Contributions are welcome! Feel free to fork the repository and submit pull requests.
