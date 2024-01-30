# Tocos Tranding Platform

This document provides an overview of the application's features, technology stack, usage instructions, testing procedures and potential improvements.

## Table of Contents

- [Introduction](#introduction)
- [Database Design](#database-design)
- [API Design](#api-design)
- [Usage](#usage)

## Introduction

Tocos Trading Platform is a web application designed to facilitate transactions between users. It provides features for add user, add transaction, view user detail and view transaction log. This application is built using a modern technology stack that includes TailwindCSS, React, Node.js with TypeScript, Express, Jest, Supertest, and MongoDB.

## Database Design

The application uses two database models: User and Transaction

1. User:

   | Field        | Type     |
   |--------------|----------|
   | _id          | ObjectId |
   | name         | String   |
   | token        | Number   |
   | createdDate  | Date     |

2. Transaction:

   | Field        | Type     |
   |--------------|----------|
   | _id          | ObjectId |
   | sender       | ObjectId |
   | receiver     | ObjectId |
   | amount       | Number   |
   | createdDate  | Date     |

## API Design

- **Get Users**
  - Method: GET
  - Endpoint: `/user`
  - Description: Retreives a list of users
  - Request Parameters: None
  - Response:
    - 200: Return list of users
    - 500: Error occurs while getting users
- **Get One User**
  - Method: GET
  - Endpoint: `/user/:id`
  - Description: Get a specific user details
  - Request Parameters: id of user
  - Response:
    - 200: Get a specific user
    - 404: There's no user with that id
    - 500: Error occurs while getting user
- **Create User**
  - Method: POST
  - Endpoint: `/user`
  - Description: Create a User
  - Request Body: name and token data with JSON structure
  - Response:
    - 201: Return id and createdDate of new user
    - 400: Invaid input
    - 500: Error occurs while adding user
- **Create Transaction**
  - Method: POST
  - Endpoint: `/transaction`
  - Description: Create a transaction
  - Request Body: sender, receiver and amount of token with JSON structure
  - Response:
    - 201: Return successful message
    - 400: Invalid input
    - 404: There isn't any valid sender or user with that id
    - 500: Error occurs while creating transaction
- **Get Transaction**
  - Method: GET
  - Endpoint: `/transaction/:id`
  - Description: Get a list of transactions
  - Request Body: id of sender or receiver
  - Response:
    - 200: Return a list of transactions
    - 500: Error occurs while getting the list of transactions

## Usage

To run the Tocos Trading Platform using Docker CLI.

1. Clone the repository and naviaget to the project directory.
2. Make sure Docker is installed on your system.
3. Open a termical and run the following command:

    ```bash
      docker compose up
    ```

4. Access the application by navigating to `http://localhost:5173` in your web browser.
