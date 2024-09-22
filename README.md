# MongoDB CRUD Operation Demo

This project demonstrates basic CRUD (Create, Read, Update, Delete) operations using MongoDB as part of the **Noroff Lesson 1.4**. It includes a simple Bootstrap frontend and MongoDB backend to manage a collection of cars. Users can view all cars but need to log in to perform operations like adding, deleting, or updating cars.

Client functions are not optimized.

## Project Overview

The collection contains cars with attributes like:

- **Horsepower (HP)**
- **Fuel consumption per 100 km (HP/l100km)**

The data is stored in MongoDB, which allows a schema-less design. However, if strict schema enforcement is required, **Mongoose** can be used as an alternative to MongoDB's default flexible model.

### Cars Data (Used in Demo)

| Car Name                                   | Horsepower (HP) | HP / l100km |
| ------------------------------------------ | --------------- | ----------- |
| Mercedes-Benz S-class AMG S 63 V8 2017     | 612             | 87.4        |
| Mercedes-Benz E-class AMG E 63 S V8 2017   | 612             | 87.4        |
| Porsche 911 GT2 RS 3.8 2017                | 700             | 87.5        |
| Alfa Romeo Giulia Quadrifoglio 2.9 V6 2016 | 510             | 102         |
| W Motors Fenyr 4.0 2015                    | 900             | 100         |
| McLaren 720S 4.0 V8 2017                   | 720             | 102.9       |
| Koenigsegg Agera R 5.0 V8 2013             | 1140            | 95          |
| Bugatti Divo 8.0 W16 2018                  | 1500            | 100         |
| Bugatti Chiron 8.0 W16 2016                | 1500            | 100         |
| IMSA RXR One 4.0 V8 2017                   | 860             | 122.9       |

The data in the table demonstrates the relationship between a car's horsepower and fuel efficiency.

## CRUD Operations

1. **Create**: Add a new car to the database.
2. **Read**: Retrieve the list of cars from the database.
3. **Update**: Modify details of an existing car (allowed only for logged-in users).
4. **Delete**: Remove a car from the collection (allowed only for logged-in users).

## Technologies Used

- **MongoDB**: Database solution for storing car data.
- **Express.js**: Backend framework for handling API routes.
- **Bootstrap**: Frontend framework for styling the UI.

## How to Run

1. Clone this repository.
2. Install the required dependencies.
3. Set up MongoDB on your local or cloud environment.
4. Run the project using Node.js.

## Important Notes

### To enable TOKEN or to get an access token (required for update/delete operations)

1. Create a Client Grant manually by going to the Auth0 Dashboard.
2. Follow the steps to set up machine-to-machine authentication for your application.

Use the following API request to obtain a token via Postman:

**POSTMAN: POST Request**

**URL:**

```
https://<your-auth0-domain>/oauth/token
```

**Body:**

```bash
{
  "grant_type": "client_credentials",
  "client_id": "<your-client-id>",
  "client_secret": "<your-client-secret>",
  "audience": "https://<your-auth0-domain>/api/v2/"
}
```

## MongoDB: Overview of Basic Shell Commands

To create the car collection in MongoDB, use the following command:

```bash
db.createCollection("cars")
```

## License

This project is created as part of the Noroff Fullstack Development course.
