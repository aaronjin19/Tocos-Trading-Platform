import mongoose from "mongoose";
import request from "supertest";

import app, { server } from "../server";
import { Transaction, User } from "../models";
import httpStatus from "http-status";

const api = request(app);

let firstUser: mongoose.Document;
let secondUser: mongoose.Document;
let thirdUser: mongoose.Document;
let transaction1: mongoose.Document;
let transaction2: mongoose.Document;
let transaction3: mongoose.Document;

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});

beforeEach(async () => {
  await User.deleteMany({});
  await Transaction.deleteMany({});
  firstUser = await User.create({
    name: "Helen",
    token: 1000,
  });
  secondUser = await User.create({
    name: "Jeffy",
    token: 2000,
  });
  thirdUser = await User.create({
    name: "Alice",
    token: 3000,
  });
  transaction1 = await Transaction.create({
    sender: firstUser._id,
    receiver: secondUser._id,
    amount: 100,
  });
  transaction2 = await Transaction.create({
    sender: secondUser._id,
    receiver: firstUser._id,
    amount: 500,
  });
  transaction3 = await Transaction.create({
    sender: secondUser._id,
    receiver: thirdUser._id,
    amount: 300,
  });
});

describe("Add user test", () => {
  it("Successfully created", async () => {
    const response = await api.post("/user").send({
      name: "Bob",
      token: 100,
    });
    const data = response.body;

    expect(response.status).toBe(httpStatus.CREATED);

    expect(data.id).toBeDefined();
    expect(data.createdDate).toBeDefined();
  });

  it("Failed to create user because name field is empty", async () => {
    const response = await api.post("/user").send({
      name: "",
      token: 100,
    });
    const data = response.body;
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(data.msg).toBe("Name is required");
  });

  it("Failed to create user because token field is empty", async () => {
    const response = await api.post("/user").send({
      name: "Jeffy",
      token: 0,
    });
    const data = response.body;
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(data.msg).toBe("Token is required");
  });

  it("Failed to create user because token is smaller than 0", async () => {
    const response = await api.post("/user").send({
      name: "Jeffy",
      token: -100,
    });
    const data = response.body;
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(data.msg).toBe("Token must greater than 0");
  });
});

describe("Get users and specific user test", () => {
  it("Successfully get users", async () => {
    try {
      const res = await api.get("/user");
      const user = res.body;

      expect(res.status).toBe(httpStatus.OK);

      expect(user[0].name).toBe("Helen");
      expect(user[0].token).toBe(1000);
      expect(user[1].name).toBe("Jeffy");
      expect(user[1].token).toBe(2000);
    } catch (err: any) {
      const { status, data } = err.response;

      expect(status).toBe(httpStatus.INTERNAL_SERVER_ERROR);

      expect(data.msg).toBe("An error occured while adding the user!");
    }
  });

  it("Successfully get specific user", async () => {
    try {
      const response = await api.get(`/user/${firstUser._id}`);
      const { name, token } = response.body;
      expect(response.status).toBe(httpStatus.OK);

      expect(name).toBe("Helen");
      expect(token).toBe(1000);
    } catch (err: any) {
      const { status, data } = err.response;
      expect(status).toBe(httpStatus.INTERNAL_SERVER_ERROR);

      expect(data.msg).toBe(
        "An error occurred while getting the list of users."
      );
    }
  });

  it("Failed to get specific user because incorrect id", async () => {
    const response = await api.get("/user/ffffffffffffffffffffffff");
    const data = response.body;
    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(data.msg).toBe("User not found");
  });
});

describe("Add transaction test", () => {
  it("Successfully created", async () => {
    const response = await request(app).post("/transaction").send({
      sender: firstUser._id,
      receiver: secondUser._id,
      amount: 100,
    });

    const { msg } = response.body;

    expect(response.status).toBe(httpStatus.CREATED);
    expect(msg).toBe("Transaction created successfully!");
  });

  it("Failed to create because sender is empty", async () => {
    const response = await request(app).post("/transaction").send({
      sender: "",
      receiver: secondUser._id,
      amount: 100,
    });
    const data = response.body;

    expect(response.status).toBe(httpStatus.BAD_REQUEST);

    expect(data.msg).toBe("Sender is required");
  });

  it("Failed to create because receiver is empty", async () => {
    const response = await request(app).post("/transaction").send({
      sender: firstUser._id,
      receiver: "",
      amount: 100,
    });
    const data = response.body;

    expect(response.status).toBe(httpStatus.BAD_REQUEST);

    expect(data.msg).toBe("Receiver is required");
  });

  it("Failed to create because amount is empty", async () => {
    const response = await request(app).post("/transaction").send({
      sender: firstUser._id,
      receiver: secondUser._id,
      amount: 0,
    });
    const data = response.body;

    expect(response.status).toBe(httpStatus.BAD_REQUEST);

    expect(data.msg).toBe("Token amount is required");
  });

  it("Failed to create because amount is negative value", async () => {
    const response = await request(app).post("/transaction").send({
      sender: firstUser._id,
      receiver: secondUser._id,
      amount: -10,
    });
    const data = response.body;

    expect(response.status).toBe(httpStatus.BAD_REQUEST);

    expect(data.msg).toBe("Token amount must greater than 0");
  });

  it("Failed to create because receiver is same with sender", async () => {
    const response = await request(app).post("/transaction").send({
      sender: firstUser._id,
      receiver: firstUser._id,
      amount: 1000,
    });
    const data = response.body;
    expect(response.status).toBe(httpStatus.BAD_REQUEST);

    expect(data.msg).toBe("Sender can't be same with receiver.");
  });

  it("Failed to create because sender hasn't got enough money", async () => {
    try {
      const response = await request(app).post("/transaction").send({
        sender: firstUser._id,
        receiver: secondUser._id,
        amount: 10000,
      });
      const data = response.body;
      expect(response.status).toBe(httpStatus.NOT_FOUND);

      expect(data.msg).toBe("Sender hasn't got enough money.");
    } catch (err: any) {}
  });

  it("Failed to sender does not exist", async () => {
    const response = await request(app).post("/transaction").send({
      sender: "ffffffffffffffffffffffff",
      receiver: secondUser._id,
      amount: 100,
    });
    const data = response.body;
    expect(response.status).toBe(httpStatus.NOT_FOUND);

    expect(data.msg).toBe("Sender does not exist.");
  });

  it("Failed to receiver does not exist", async () => {
    const response = await request(app).post("/transaction").send({
      sender: firstUser._id,
      receiver: "ffffffffffffffffffffffff",
      amount: 100,
    });
    const data = response.body;
    expect(response.status).toBe(httpStatus.NOT_FOUND);

    expect(data.msg).toBe("Receiver does not exist.");
  });
});

describe("Get specific transactions", () => {
  it("Successfully get transactions", async () => {
    const response = await api.get(`/transaction/${firstUser._id}`);
    const data = response.body;

    expect(response.status).toBe(httpStatus.OK);

    expect(data[0]._id).toBe(String(transaction1._id));
    expect(data[1]._id).toBe(String(transaction2._id));
  });

  it("Failed to get transactions", async () => {
    const response = await api.get("/transaction/ffffffffffffffffffffffff");
    const data = response.body;

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(data.msg).toBe(
      "Can't find user"
    );
  });
});
