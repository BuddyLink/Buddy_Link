const express = require("express");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      surname,
      classification,
      major,
      profilePicture,
      preferredContact,
      phone,
      walkCount = 0,
    } = req.body;

    if (
      !email ||
      !password ||
      !name ||
      !surname ||
      !classification ||
      !major ||
      !preferredContact ||
      !profilePicture
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    if (email.endsWith(".edu") === false) {
      return res
        .status(400)
        .json({ message: "Email must be a valid .edu email" });
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        surname,
        classification,
        major,
        profilePicture,
        preferredContact,
        phone,
        walkCount,
      },
    });
    req.session.userId = newUser.id;
    req.session.email = newUser.email;
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const emailExists = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (!emailExists) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }
    const passwordMatch = await bcrypt.compare(password, emailExists.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }
    req.session.userId = emailExists.id;
    req.session.email = emailExists.email;
    res.json({ success: true, message: "Login successful!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/me", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
      select: { email: true },
    });
    res.json({ id: req.session.userId, email: user.email });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/profile", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
      select: {
        email: true,
        name: true,
        surname: true,
        classification: true,
        major: true,
        profilePicture: true,
        preferredContact: true,
        phone: true,
        walkCount: true,
      },
    });
    res.json({
      id: req.session.userId,
      email: user.email,
      name: user.name,
      surname: user.surname,
      classification: user.classification,
      major: user.major,
      profilePicture: user.profilePicture,
      preferredContact: user.preferredContact,
      phone: user.phone,
      walkCount: user.walkCount,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logout successful!" });
  });
});

module.exports = router;
