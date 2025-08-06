Gorgeous Notes Backend
This is the backend for the Gorgeous Notes application, built with Express.js and MongoDB. It provides a RESTful API for creating, reading, updating, and deleting notes, with support for fields like title, content, category, priority, mood, tags, and color. The backend connects to MongoDB Atlas for cloud-based data persistence.
Features

RESTful API for CRUD operations on notes.
MongoDB Atlas integration for scalable, cloud-based storage.
Supports note fields: title, content, category, priority, mood, tags, color, createdAt, and updatedAt.
Error handling for invalid requests and server issues.
CORS support for cross-origin requests from the frontend.
Environment variable configuration using dotenv.

Tech Stack

Node.js
Express.js
MongoDB (with Mongoose)
dotenv (environment variables)
CORS
body-parser

Project Structure
server/
├── server.js           # Main Express server
├── Dockerfile          # Docker configuration
├── package.json        # Dependencies and scripts
├── .env                # Environment variables (not tracked)
└── README.md           # This file

Prerequisites

Node.js (v14 or higher)
Docker (optional, for containerized setup)
MongoDB Atlas account
Git

Setup
1. Clone the Repository
Clone the repository and navigate to the server directory:
git clone https://github.com/your-username/gorgeous-notes.git
cd gorgeous-notes/server

2. Environment Variables
Create a .env file in the server directory with the following:
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0

Replace <username>, <password>, and <cluster> with your MongoDB Atlas credentials. Ensure the MongoDB Atlas cluster allows connections from your IP or 0.0.0.0/0 (for testing).
3. Install Dependencies
Install the required Node.js dependencies:
npm install

4. Running Locally
Start the Express server:
npm start

The server will run on http://localhost:3000.
5. Running with Docker
Ensure Docker is installed. The docker-compose.yml in the parent directory includes the server service. If running standalone, use the Dockerfile in the server directory:
docker build -t gorgeous-notes-server .
docker run -p 4000:3000 --env-file .env gorgeous-notes-server

Alternatively, use the docker-compose.yml from the parent directory:
services:
  server:
    build: ./server
    container_name: express_api
    ports:
      - 4000:3000
    environment:
      APP_NAME: LearnDocker
      PORT: 3000
      MONGODB_URI: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0

Run with:
docker-compose up --build

The server will be accessible at http://localhost:4000.
API Endpoints

GET /api/notesRetrieve all notes, sorted by creation date (newest first).Response: [{ _id, title, content, category, priority, mood, tags, color, createdAt, updatedAt }, ...]Errors: 500 (Server Error)

GET /api/notes/:idRetrieve a single note by ID.Response: { _id, title, content, category, priority, mood, tags, color, createdAt, updatedAt }Errors: 404 (Not Found), 500 (Server Error)

POST /api/notesCreate a new note.Request Body: { title, content, category?, priority?, mood?, tags?, color? }Response: { _id, title, content, category, priority, mood, tags, color, createdAt, updatedAt }Errors: 400 (Missing required fields), 500 (Server Error)

PUT /api/notes/:idUpdate an existing note by ID.Request Body: { title, content, category?, priority?, mood?, tags?, color? }Response: { _id, title, content, category, priority, mood, tags, color, createdAt, updatedAt }Errors: 400 (Missing required fields), 404 (Not Found), 500 (Server Error)

DELETE /api/notes/:idDelete a note by ID.Response: { message: "Note deleted" }Errors: 404 (Not Found), 500 (Server Error)


Testing the API
Use tools like Postman or curl to test the endpoints. Example:
curl http://localhost:4000/api/notes

To create a note:
curl -X POST http://localhost:4000/api/notes \
-H "Content-Type: application/json" \
-d '{"title":"Test Note","content":"This is a test","category":"Work","priority":"high","mood":"🚀","tags":["test","demo"],"color":"#667eea"}'

Troubleshooting

MongoDB Connection Issues:

Verify MONGODB_URI is correct and includes the notes database.
Check MongoDB Atlas network access (IP whitelist).
View logs: docker logs express_api or npm start output.


CORS Errors:

Ensure the cors middleware is enabled (included in server.js).
Verify the frontend URL is allowed in CORS settings if customized.


Port Conflicts:

Check if port 4000 (or 3000 locally) is in use.
Update PORT in .env or docker-compose.yml if needed.



Contributing

Fork the repository.
Create a feature branch: git checkout -b feature-name.
Commit changes: git commit -m "Add feature".
Push to the branch: git push origin feature-name.
Open a pull request.

License
This project is licensed under the MIT License.