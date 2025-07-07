const express = require("express");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const moment = require('moment')

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
      passwordConfirmation,
    } = req.body;

    if (
      !email ||
      !password ||
      !name ||
      !surname ||
      !classification ||
      !major ||
      !preferredContact ||
      !profilePicture ||
      !passwordConfirmation
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const minPWDLength = 6;
    if (password.length < minPWDLength) {
      return res
        .status(400)
        .json({
          message: `Password must be at least ${minPWDLength} characters`,
        });
    }
    if (password !== passwordConfirmation
){
      return res
        .status(400)
        .json({
          message: `Passwords must match!`,
        });
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
    const hashedConPassword = await bcrypt.hash(passwordConfirmation, 10);
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
        passwordConfirmation: hashedConPassword,
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
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }
    req.session.userId = user.id;
    req.session.email = user.email;
    res.json({ success: true, message: "Login successful!" });
  } catch (err) {
    console.info(err);
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
    console.info(err);
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
    connsole.info(err);
    res.status(500).json  ({ mesage: "Internal server error" });  }
}
)
router.get("/locations", async(req,res)=>{
  if (!req.session.userId){
    return res.status(401).json({ message: "Unauthorized" });
  }
  try{
    const locations = await prisma.location.findMany();
    res.json(locations)
  }catch (err){
    res.status(500).json({ message: "Failed to fetch locations"});
  }
})

router.post("/buddyrequest", async(req,res)=>{
  if (!req.session.userId){
    return res.status(401).json({ message: "Unauthorized" });
  }
  try{
    const {
      date,
      time,
      destination,
      meetingPoint,
  } = req.body;
  const buddyRequest = await prisma.buddyRequest.create({
    data: {
      date: new Date(date),
      time: new Date(`${date}T${time}:00.000Z`),
      destination:{
        connect: {id: Number(destination)}
      },
      meetingPoint:{
        connect: {id: Number(meetingPoint)}
        },
      requester: {
        connect: {id: req.session.userId}
      },
      status: "PENDING"
      }
  });
  res
    .status(201)
    .json({ success: true, message: "Request created successfully", data:buddyRequest});
  } catch (err) {
  console.error("Error creating request:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
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

router.patch("/profile/edit", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const editFields = [
      "name",
      "surname",
      "classification",
      "major",
      "profilePicture",
      "preferredContact",
      "phone",
    ];
    const updates = {};
    for (const field of editFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }
    const updated = await prisma.user.update({
      where: { id: req.session.userId },
      data: updates,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update Profile" });
  }
});

function HaversineFormula (userLat,userLon,buddyLat,buddyLon){
  const earthRadius = 6371e3
  const userLatRad = userLat * Math.PI/180
  const buddyLatRad = buddyLat * Math.PI/180
  const deltaLatRad = (buddyLat - userLat) * Math.PI/180
  const deltaLonRad = (buddyLon - userLon) * Math.PI/180

  const a = Math.sin(deltaLatRad/2) ** 2 +
            Math.cos(userLatRad) * Math.cos(buddyLatRad) +
            Math.sin(deltaLonRad/2) ** 2

  const angularDistance = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

  const distance = earthRadius * angularDistance

  return distance;
}

async function Matched (date,time,destinationId,meetingPointId){
  try{
    time = new Date (time)
    const endTime = new Date (moment(time).add(10,'minutes'))
    const startTime = new Date (moment(time).subtract(10,'minutes'))
    const filteredBuddies = await prisma.buddyPair.findMany({
      where:{
        date: date,
        time: {
            gte: startTime,
            lte: endTime
        },
        destinationPairId: destinationId,
      }
    })
      return filteredBuddies

  }catch (error){
    console.error("Failed to match")
  }
}


module.exports = router;
