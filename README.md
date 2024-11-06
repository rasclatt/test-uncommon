# Uncommon Test

This is a full-stack project using React for the frontend, Express for the backend, and SQLite for the database. This README will guide you through setting up the project on your local machine.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [SQLite](https://www.sqlite.org/download.html)

## After Clone: Server
After cloning this repo, you must naviate to the repo root and into the `server` directory. Once inside, you will want to first install the modules required for this server using the terminal command:

```
npm run install
```
Next, you will want to start the Express server by running the terminal command:
```
npm run start
```
## After Clone: Client
Once the server has successfully started up, you will want to move out of the `server` directory and into the `client` directory. Now you will need to also install the modules for the client using the terminal command:
```
npm run install
```
And to begin the localhost, you will want to run:
```
npm run dev
```
## Congrats! You have successfully installed the application.

> One note to keep in mind, you are able to change the ports of the frontend and backend on your localhost. This is found in the `server/.env` and `client/.env` files, respectively.

Let's move onto running available endpoints and the software itself. To access the frontend application, open your browser and navigate to: [http://localhost:5173/](http://localhost:5173/) (or whichever port you may have changed it to). From here you will be able to add items and remove items from the list of available items. All items are found within the `server/database.db` file.

## Accessing Endpoints
If you are using postman to access endpoints, you will be able to do so using `POST`, `GET`, and `DELETE` protocols.

### Get Item Information

**Endpoint**: `GET /items`

**Description**: This endpoint retrieves items list.

**Method**: `GET`

**URL**: `http://localhost:3201/items`

#### Example Request

```bash
curl -X GET "http://localhost:3201/items" -H "accept: application/json"
```

### Create Item Information

**Endpoint**: `POST /items`

**Description**: This endpoint saves new items.

**Method**: `POST`

**URL**: `http://localhost:3201/items`

#### Request Parameters

| Parameter | Type     | Required | Description                       |
|-----------|----------|----------|-----------------------------------|
| `name`  | `string` | Yes      | Text for the item |
| `description`  | `string` | NO      | Some description text |

#### Example Request

```bash
curl -X POST "http://localhost:3201/items" \
     -H "Content-Type: application/json" \
     -d '{"name":"Some text here", "description":"some more text here"}'
```

### Delete Item

**Endpoint**: `DELETE /items`

**Description**: This endpoint deletes an item.

**Method**: `DELETE`

**URL**: `http://localhost:3201/items`

#### Request Parameters

| Parameter | Type     | Required | Description                       |
|-----------|----------|----------|-----------------------------------|
| `id`  | `string` | Yes      | The id for the post |

#### Example Request

```bash
curl -X POST "http://localhost:3201/items" \
     -H "Content-Type: application/json" \
     -d '{"id":"1a2321adf233adfa42342asgsfd:21321faf34fbsd4at434sa"}'
```
