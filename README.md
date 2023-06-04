# finalproject

This project is the final project for the "Databases & System Development" class.

If you want to take a look at the project, you can find a live build here: https://chat.krusbersky.net

## Project Description

The goal of this project is to create a chat application with a backend and a frontend. The backend will handle multiple users and store their messages in a database, while the frontend will display the messages and allow users to send messages.

## Project Structure

The project follows a MERN (MongoDB, Express.js, React.js, Node.js) stack structure. This means that the backend is built with Node.js and Express.js, the frontend is developed using React.js, and the database employed is MongoDB.

## Getting Started

To get started with the project, follow the instructions below.

### Docker Compose (Recommended)

1. Clone the repository:

```
git clone https://gitlab.com/cl3mi1/finalproject
cd finalproject
```


2. Run the Docker Compose dev file:

```
docker compose -f docker-compose_dev.yml up --build
```


This command will start the development server on port 5000, and the database will run on port 80. The database will be persisted in the Docker volume `mongodb_data`.

### npm Run (For Development)

1. Clone the repository:

```
git clone https://gitlab.com/cl3mi1/finalproject
cd finalproject
```


2. Run the backend and frontend separately:

- Backend:

  ```
  cd backend
  npm install
  npm run dev
  ```

- Frontend:

  ```
  cd frontend
  npm install
  npm run dev
  ```

This will start the development server on port 5000, and the database will run on port 8080. Note that a database is required to run the backend. You can either use the Docker Compose method described above or install MongoDB locally:


```
docker run -d -p 27017:27017 --name test-mongo mongo:latest
```



## Workflow

To ensure smooth collaboration, please follow the workflow outlined below:

- Create a new branch for your work:


```
git checkout -b [branchname]
```


- Pull the latest changes from the main branch before starting your work:


```
git pull
```

- Push your changes to your branch.
- Create a merge request on GitLab.
- Test your changes before merging into the main branch.

Please adhere to these guidelines to maintain code consistency and facilitate seamless integration of contributions.

If you have any questions or need further assistance, feel free to reach out. Happy coding!
