# Project assignment for Web applications Part 2, 2021

## Description

A web application for booking tickets for boat trips. The application has login mechanism for admin users, who can create new admin users and administration of routes, departures, cabins, prices and more.
The application also logs all changes made to the database. Unit tests have been implemented on the server.

The web application is developed with React based on JavaScript frontend and ASP.NET Core on the backend with a database structure using Entity Framework code first.

Login information for admin user:

 - **Username:** Admin
 - **Password:** Admin123
 
## How to run

- **Package Source:** nuget.org
- **Source URL:** https://api.nuget.org/v3/index.json

Node.js LTS version is required. Before starting the project, you need to do npm install in the `wwwroot` folder.

Run the project with the `webapp_gruppeoppgave` profile, and not IIS express. The solution should open in your browser at: https://localhost:5001/

The project was written in JetBrains Rider with no running issues, but will work with Visual studios as well. On windows 10, nuget sources needed to be set manually, however, this was not an issue we experienced on Mac or Linux.

## Link & References

- [Link to localhost](https://localhost:5001)

## ER Model

<p align="center">
<img src="boatlineER.png" style="width: 441px;" alt="ER of Models">
</p>
