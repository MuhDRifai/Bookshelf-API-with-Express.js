```markdown
# Bookshelf API

## Project Description

The Bookshelf API is an implementation using Express.js to manage a book library. This API provides basic operations such as adding, fetching, updating, and deleting books from the library collection.

## Project Structure

- `src`: The main project directory.
  - `postman`: Directory containing images and Postman collections.
    - Images illustrating how to import test commands.
    - `Postman Bookshelf API Test Collection and Environment`: Folder containing Postman collection and environment.

- `src/server.js`: The main file containing the implementation of the Express server and API endpoints.

- `package.json`: Project configuration file including dependencies and scripts to run the project.

## How to Use

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Run the Server**

   - Production mode:

     ```bash
     npm start
     ```

   - Development mode with nodemon:

     ```bash
     npm run start-dev
     ```

3. **Use Postman for Testing**

   When building the Bookshelf API, it is essential to test its functionality. Utilize the provided Postman Collection and Environment files.

   - Retrieve both JSON files from the `postman` -> `Postman Bookshelf API Test Collection and Environment` folder:
     - [JSON Files](./src/postman/berkasJson.png)

   - In the Postman application, click the `Import` button in the left panel.
     - [Import JSON Files](./src/postman/1.png)

   - Click the `Upload Files` button to import both extracted JSON files.
     - [Upload JSON Files](./src/postman/2.jpeg)

   - Afterward, the `Bookshelf API Test Collection and Environment` will be available in your Postman.
     - [Collection](./src/postman/3.jpeg)
     - [Environment](./src/postman/4.jpeg)

## API Endpoints

- **POST /books**: Add a new book to the library.
- **GET /books**: Retrieve a list of books with search options.
- **GET /books/:bookId**: Retrieve book details based on ID.
- **PUT /books/:bookId**: Update book information based on ID.
- **DELETE /books/:bookId**: Delete a book based on ID.

## Book Data Structure

```json
{
  "id": "unique_id",
  "name": "Book Title",
  "year": "Publication Year",
  "author": "Author",
  "summary": "Book Summary",
  "publisher": "Publisher",
  "pageCount": 300,
  "readPage": 150,
  "finished": false,
  "reading": true,
  "insertedAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## Additional Scripts

- **npm test**: Run the testing script (not yet implemented).

## Development Environment

- Node.js
- Express.js
- Nanoid
- Nodemon (for development only)

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for more information.
```