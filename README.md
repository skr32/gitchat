# finalproject

this project is meant to be the final project in "Databases & System development"

## Getting started

To run the latest image just run the following command or use the docker-compose.yaml:
```
docker compose build
docker compose up
```


to clone the project on your local device follow these steps:

```
cd target_repository
git clone (copied ssh link)
npm i
```

once the project is cloned and all dependencies are installed run
```
npm run dev
```
to run the dev server locally on your device
-> you'll need this command to run every time before working on your local project 

## Workflow
as we are using a version control software every developer works on a specific branch

- to create a branch:
```
git checkout -b [branchname]
```

- pull every time before start
```
git pull
```

- to merge your local branch in the main branch
-> push changes into your branch
-> create merge request on gitlab
-> test your changes
