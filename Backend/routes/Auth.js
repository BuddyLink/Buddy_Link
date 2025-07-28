import { Router } from "express";
import { hash, compare } from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const potentialBuddies = new Map();
const router = Router();
import moment from "moment";
import admin from "firebase-admin";
import { createRequire } from "module";
import rateLimit from "express-rate-limit";
var require = createRequire(import.meta.url);
var serviceAccount = require("../serviceAccountKey.json");
const veryCloseThershold = 500;
const moderateThershold = 1000;
const farThershold = 1500;
const veryCloseScore = 1;
const moderateScore = 0.5;
const farScore = 0.25;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

router.post('/signup', async (req, res) => {
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
      preferences,
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
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const minPWDLength = 6;
    if (password.length < minPWDLength) {
      return res.status(400).json({
        message: `Password must be at least ${minPWDLength} characters`,
      });
    }
    if (password !== passwordConfirmation) {
      return res.status(400).json({
        message: 'Passwords must match!',
      });
    }
    if (email.endsWith('.edu') === false) {
      return res
        .status(400)
        .json({ message: 'Email must be a valid .edu email' });
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await hash(password, 10);
    const hashedConPassword = await hash(passwordConfirmation, 10);
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
        preferences,
      },
    });
    req.session.userId = newUser.id;
    req.session.email = newUser.email;
    res
      .status(201)
      .json({ success: true, message: 'User created successfully' });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Email or password is incorrect' });
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: 'Email or password is incorrect' });
    }
    req.session.userId = user.id;
    req.session.email = user.email;
    res.json({ success: true, message: 'Login successful!' });
  } catch (err) {
    console.info(err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

router.get('/me', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
      select: { email: true },
    });
    res.json({ id: req.session.userId, email: user.email });
  } catch (err) {
    console.info(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/profile', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
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
    console.info(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get("/locations", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const locations = await prisma.location.findMany();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch locations", error: err });
  }
});

router.post('/buddyrequest', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const { date, time, destination, meetingPoint } = req.body;
    const buddyRequest = await prisma.buddyRequest.create({
      data: {
        date: new Date(date),
        time: new Date(`${date}T${time}:00.000Z`),
        destination: {
          connect: { id: Number(destination) },
        },
        meetingPoint: {
          connect: { id: Number(meetingPoint) },
        },
        requester: {
          connect: { id: req.session.userId },
        },
        status: 'PENDING',
      },
      include: {
        destination: true,
        meetingPoint: true,
        requester: true,
      },
    });
    const destinationId = buddyRequest.destination.id;
    const meetingPointId = buddyRequest.meetingPoint.id;
    const userId = req.session.userId;
    const matched = await matchedBuddy(
      date,
      time,
      destinationId,
      meetingPointId,
      userId,
    );
    const latestRequestId = await prisma.buddyRequest.findFirst({
      orderBy: {
        id: "desc",
      },
    });
    const requestId = latestRequestId.id;

    await prisma.user.update({
      where: { id: req.session.userId },
      data: { status: "ACTIVE" },
    });

    res.status(201).json({
      success: true,
      message: 'Request created successfully',
      matched: matched,
      requestId: requestId,
    });
  } catch (err) {
    console.error('Error creating request:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

router.delete("/cancelRequest", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { id } = req.body;
  try {
    await prisma.buddyRequest.delete({
      where: { id: parseInt(id) },
    });

    await prisma.user.update({
      where: { id: req.session.userId },
      data: { status: "INACTIVE" },
    });

    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Failed to delete request" });
  }
});

router.post("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout successful!' });
  });
});

router.patch('/profile/edit', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const editFields = [
      'name',
      'surname',
      'classification',
      'major',
      'profilePicture',
      'preferredContact',
      'phone',
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
    res
      .status(500)
      .json({ message: "Failed to update Profile", error: error.message });
  }
});

function haversineFormula(userLat, userLon, buddyLat, buddyLon) {
  const earthRadius = 6371e3;
  const userLatRad = (userLat * Math.PI) / 180;
  const buddyLatRad = (buddyLat * Math.PI) / 180;
  const deltaLatRad = ((buddyLat - userLat) * Math.PI) / 180;
  const deltaLonRad = ((buddyLon - userLon) * Math.PI) / 180;

  const a =
    Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
    Math.cos(userLatRad) *
      Math.cos(buddyLatRad) *
      Math.sin(deltaLonRad / 2) *
      Math.sin(deltaLonRad / 2);

  const angularDistance = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * angularDistance;

  return distance;
}

async function locationCod(Id) {
  try {
    const locationCoordinates = await prisma.location.findUnique({
      where: {
        id: Number(Id),
      },
    });
    return locationCoordinates;
  } catch (error) {
    console.error("Failed to get coordinates", error);
  }
}

class Node {
  constructor(score,buddy) {
    this.score = score;
    this.buddy = buddy;
    this.left = null;
    this.right = null;
  }
}
function insert(root, score,buddy) {
  if (root == null)
    return new Node(score,buddy);

  if (root.buddy === buddy)
    return root;

  if(score < root.score){
    root.left = insert(root.left, score,buddy);
  }else if(score > root.score){
    root.right = insert(root.right, score,buddy);
  }
  return root;
}

function getSuccessor(curr) {
  curr = curr.right;
  while (curr !== null && curr.left !== null) {
    curr = curr.left;
  }
  return curr;
}

function deleteNode(root,score,buddy){
  if (root === null){
    return root;
  }

  if(score < root.score){
    root.left = deleteNode(root.left, score,buddy);
  }else if(score > root.score){
    root.right = deleteNode(root.right, score,buddy);
  }else{
    if (root.left === null)
      return root.right;

    if (root.right === null)
      return root.left;

    let succ = getSuccessor(root);
    root.score = succ.score;
    root.right = deleteNode(root.right, succ.score,buddy);
  }
  console.log(root);
  return root;

}

function inorder(root,result) {
  if (root != null) {
    inorder(root.right, result);
    result.push(JSON.parse(root.buddy));
    inorder(root.left, result);
  }
}

function sorted(root) {
  let result = [];
  inorder(root, result);
  return result;
}

let root = null;

async function matchedBuddy(date, time, destinationId, meetingPointId, userId) {
  try {
    const dateTimeString = `${date}T${time}:00.000Z`;
    const baseDateTime = moment(dateTimeString);
    const endTime = new Date(baseDateTime.clone().add(10, "minutes"));
    const startTime = new Date(baseDateTime.clone().subtract(10, "minutes"));

    const filteredBuddies = await prisma.buddyPair.findMany({
      where: {
        date: new Date(date),
        time: {
          gte: startTime,
          lte: endTime,
        },
        destinationPairId: Number(destinationId),
        status: "ACTIVE",
      },
    });

    const userPreferences = await prisma.user.findUnique({
      where: { id: userId },
      select: { preferences: true, major: true, classification: true },
    });
    const totalPreferences =
      Number(userPreferences.preferences.distance) +
      Number(userPreferences.preferences.major) +
      Number(userPreferences.preferences.classification);
    const distanceWeight =
      Number(userPreferences.preferences.distance) / totalPreferences;
    const majorWeight =
      Number(userPreferences.preferences.major) / totalPreferences;
    const classificationWeight =
      Number(userPreferences.preferences.classification) / totalPreferences;

    const locationCoordinates = await locationCod(meetingPointId);
    const userLat = locationCoordinates.latitude;
    const userLon = locationCoordinates.longitude;

    for (let i = 0; i < filteredBuddies.length; i++) {
      const buddy = filteredBuddies[i];
      const buddyId = buddy.id;
      const cacheKey = `${buddyId}::${meetingPointId}`;

      let totalScore = 0;

      if (potentialBuddies.has(cacheKey)) {
        totalScore = potentialBuddies.get(cacheKey);
      } else {
        const locationCoordinatesBuddy = await locationCod(buddy.locationId);
        const buddyLat = locationCoordinatesBuddy.latitude;
        const buddyLon = locationCoordinatesBuddy.longitude;

        const distance = haversineFormula(userLat, userLon, buddyLat, buddyLon);

        let distanceScore = 0;
        let majorScore = 0;
        let classificationScore = 0;

        if (buddy.major === userPreferences.major) {
          majorScore = 1 * majorWeight;
        }
        if (buddy.classification === userPreferences.classification) {
          classificationScore = 1 * classificationWeight;
        }
        if (distance < veryCloseThershold) {
          distanceScore = veryCloseScore * distanceWeight;
        } else if (distance < moderateThershold) {
          distanceScore = moderateScore * distanceWeight;
        } else if (distance < farThershold) {
          distanceScore = farScore * distanceWeight;
        }

        totalScore = majorScore + classificationScore + distanceScore;
        potentialBuddies.set(cacheKey, totalScore);
        root = insert(root, totalScore, JSON.stringify(buddy));
      }
    }
    const sortedBuddies = sorted(root);
    return sortedBuddies;
  } catch (error) {
    console.error('Failed to match');
    return JSON.stringify({ message: error.message });
  }
}

router.post("/token", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const { fcmToken } = req.body;
    const existingToken = await prisma.token.findFirst({
      where: {
        fcmToken,
        userId: req.session.userId,
      },
    });
    if (!existingToken) {
      await prisma.token.create({
        data: {
          fcmToken,
          user: {
            connect: { id: req.session.userId },
          },
        },
      });
    }
    res.status(201).json({
      success: true,
      message: "Token captured",
    });
  } catch (error) {
    console.error("Error while capturing token");
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

function randomNumberGenerator() {
  const randomNumber = new Uint8Array(5);
  crypto.getRandomValues(randomNumber);
  let digit = [];
  for (var i = 0; i < randomNumber.length; i++) {
    let number = randomNumber[i];
    const numberArray = number.toString().split("").map(Number);
    let firstDigit = numberArray[0];
    digit.push(firstDigit);
    var verificationCode = digit.join("");
  }
  return verificationCode;
}

router.post("/match", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { buddyPair } = req.body;
    const matchedPair = await prisma.match.create({
      data: {
        buddyPair: {
          connect: { id: Number(buddyPair) },
        },
        user: {
          connect: { id: req.session.userId },
        },
      },
    });
    const code = randomNumberGenerator();

    const hashedCode = await hash(code, 10);
    await prisma.codeInput.create({
      data: {
        codeInput: hashedCode,
        user: {
          connect: { id: req.session.userId },
        },
      },
    });

    const token = await prisma.token.findFirst({
      orderBy: {
        id: "desc",
      },
    });
    const Token = token.fcmToken;
    try {
      const message = {
        notification: {
          title: "Verification Code",
          body: code,
        },
        token: Token,
      };
      admin
        .messaging()
        .send(message)
        .then((response) => {
          console.info("Successfully", response);
        })
        .catch((error) => {
          console.error("Error sending message", error);
        });
    } catch (error) {
      console.error("Error while sending message", error);
    }

    res.status(201).json({
      success: true,
      message: "Match captured",
    });
  } catch (error) {
    console.error("Error while capturing match");
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

const codeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: { error: "Too many attempts. Please try again later" },
});

router.post("/verify", codeLimiter, async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const { codeInput } = req.body;
    const code = await prisma.codeInput.findFirst({
      where: { userId: req.session.userId },
      orderBy: {
        id: "desc",
      },
    });
    if (!code) {
      return res.status(404).json({ message: "No code found for user" });
    }
    const codeMatch = await compare(codeInput, code.codeInput);

    if (!codeMatch) {
      return res.status(401).json({ message: "Verification code incorrect" });
    }
    await prisma.user.update({
      where: { id: req.session.userId },
      data: { walkCount: { increment: 1 }, status: "INACTIVE" },
    });
    res.json({
      success: true,
      message: "Code verified",
    });
  } catch (error) {
    console.error("Error while verifying code", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

router.get("/pastbuddies", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const pastBuddies = await prisma.match.findMany({
      where: { userId: req.session.userId },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        createdAt: true,
        buddyPair: {
          select: {
            id: true,
            name: true,
            surname: true,
            major: true,
            classification: true,
            walkCount: true,
            profilePic: true,
          },
        },
      },
      take: 5,
    });
    res.json(
      pastBuddies.map((buddy) => ({
        ...buddy.buddyPair,
        matchedAt: buddy.createdAt,
      })),
    );
  } catch (err) {
    console.info(err);
    res.status(500).json({ message: `Internal server error ${err}` });
  }
});

export default router;
