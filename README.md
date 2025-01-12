backend_readme: |
  # Lego Gift Finder - Backend

  Welcome to the Lego Gift Finder backend, which powers the Lego Gift Finder frontend by processing user inputs and returning Lego product recommendations based on criteria provided through the frontend survey.

  ## Problem Statement
  Parents often find it challenging to select the right Lego toys for their children. This backend service is designed to process survey data submitted by users (through the frontend) and return the best Lego product recommendations from an external Lego products database.

  ## Features
  - Processes survey data from the frontend.
  - Queries an external database containing Lego products based on user preferences.
  - Returns a list of recommended Lego sets based on the survey answers.

  ## How to Set Up the Backend Locally

  ### Prerequisites
  - Node.js installed (v12 or higher).
  - MySQL or similar relational database (or a mock database) with Lego product data.
  - A `.env` file with appropriate database credentials.

  ### Steps to Run Locally:
  1. Clone the repository:
     ```bash
     git clone https://github.com/davidmaxxxy/brickminds-be.git
     ```

  2. Navigate to the project directory:
     ```bash
     cd brickminds-be
     ```

  3. Install dependencies:
     ```bash
     npm install
     ```

  4. Set up your database:
     - Ensure you have access to the external Lego products database or mock data (can be set up in a local MySQL database).
     - You will need to set the database credentials in the `.env` file. The database should have a table like `toys` or `products` containing Lego products and their attributes.

  5. Configure the `.env` file:
     Create a `.env` file in the root of the project and set the database credentials as follows:
     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=password
     DB_NAME=lego_database
     ```

  6. Run the backend server:
     ```bash
     node server.js
     ```

     The server should now be running at [http://localhost:5001](http://localhost:5001).

  7. The backend will receive requests from the frontend (when the user submits the survey), process them, and return Lego product recommendations.


  ## External Database
  This backend is designed to interact with an external database containing Lego product information. The database schema includes tables with attributes like product name, age group, category, etc. If you'd like to use a mock database, replace the database connection code with mock data.

  ## How the Backend Works
  1. The frontend collects user responses to the survey.
  2. The frontend sends these responses to the backend through the `/survey` POST endpoint.
  3. The backend processes the responses, queries the Lego products database, and returns the most relevant Lego sets.
  4. The frontend displays the recommendations to the user.

  ## Technologies Used
  - Node.js (for backend development)
  - MySQL (or alternative relational database)
  - Express (for handling HTTP requests)
  - dotenv (for environment variable management)

  ## Contributors
  - Your Name
