import mongoose from "mongoose";
import { User, Thread, Message } from "../Models.js";

describe("Database models", () => {
  beforeAll(async () => {
    // Connect to the test database before running the tests
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));    
  });

  afterAll(async () => {
    // Disconnect from the test database after running the tests
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // Remove all documents from the collections after each test
    await User.deleteMany({});
    await Thread.deleteMany({});
    await Message.deleteMany({});
  });

  describe("User model", () => {
    it("should be able to save a new user", async () => {
      const user = new User({
        username: "john",
        password: "secret"
      });

      const savedUser = await user.save();
      
      expect(savedUser._id).toBeDefined();
      expect(savedUser.username).toBe(user.username);
      expect(savedUser.password).toBe(user.password);
    });

    it("should not allow duplicate usernames", async () => {
      const firstUser = new User({ username: "jane", password: "secret" });
      await firstUser.save();

      const secondUser = new User({ username: "jane", password: "password" });
      try {
        await secondUser.save();
      } catch (error) {
        expect(error.code).toBe(11000);
      }
    });
  });

  describe("Thread model", () => {
    it("should be able to save a new thread", async () => {
      const user1 = await User.create({ username: "user1", password: "password" });
      const user2 = await User.create({ username: "user2", password: "password" });

      const thread = new Thread({
        members: [user1._id, user2._id]
      });

      const savedThread = await thread.save();

      expect(savedThread._id).toBeDefined();
      expect(savedThread.members).toContain(user1._id);
      expect(savedThread.members).toContain(user2._id);
    });

    it("should require at least two members in a thread", async () => {
      const user = await User.create({ username: "user", password: "password" });

      const thread = new Thread({
        members: [user._id]
      });

      try {
        await thread.save();
      } catch (error) {
        expect(error.code).toBe(11000);
      }
    });
  });

  describe("Message model", () => {
    it("should be able to save a new message", async () => {
      const user1 = await User.create({ username: "user1", password: "password" });
      const user2 = await User.create({ username: "user2", password: "password" });

      const thread = await Thread.create({
        members: [user1._id, user2._id]
      });

      const message = new Message({
        thread: thread._id,
        from: user1._id,
        message: "Hello world!"
      });

      const savedMessage = await message.save();

      expect(savedMessage._id).toBeDefined();
      expect(savedMessage.thread).toBe(thread._id);
      expect(savedMessage.from).toBe(user1._id);
      expect(savedMessage.message).toBe(message.message);
    });

    it("should not allow messages without a thread, sender, or message content", async () => {
      const user = await User.create({ username: "user", password: "password" });

      const messageWithoutThread = new Message({
        from: user._id,
        message: "Hello world!"
      });

      await expect(messageWithoutThread.save()).rejects.toThrowError(mongoose.Error.ValidationError);
      

      const messageWithoutSender = new Message({
        thread: new mongoose.Types.ObjectId(),
        message: "Hello world!"
      });

      await expect(messageWithoutSender.save()).rejects.toThrowError(mongoose.Error.ValidationError);

      const messageWithoutContent = new Message({
        thread: new mongoose.Types.ObjectId(),
        from: user._id
      });

      await expect(messageWithoutContent.save()).rejects.toThrowError(mongoose.Error.ValidationError);
    });
  });
});
