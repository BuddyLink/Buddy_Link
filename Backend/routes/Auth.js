import { Router } from "express";
import { hash, compare } from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = Router();
import moment from "moment";

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
      return res.status(400).json({
        message: `Password must be at least ${minPWDLength} characters`,
      });
    }
    if (password !== passwordConfirmation) {
      return res.status(400).json({
        message: "Passwords must match!",
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
    const passwordMatch = await compare(password, user.password);
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
    console.info(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/locations", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const locations = await prisma.location.findMany();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch locations" });
  }
});

router.post("/buddyrequest", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
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
        status: "PENDING",
      },
      include: {
        destination: true,
        meetingPoint: true,
      },
    });
    const destinationId = buddyRequest.destination.id;
    const meetingPointId = buddyRequest.meetingPoint.id;
    const matched = await matchedBuddy(
      date,
      time,
      destinationId,
      meetingPointId
    );

    res.status(201).json({
      success: true,
      message: "Request created successfully",
      matched: matched,
    });
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
    console.error("Failed to get coordinates");
  }
}
function merge(leftArray, rightArray) {
  const merged = [];
  let i = 0;
  let j = 0;
  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i].distance < rightArray[j].distance) {
      merged.push(leftArray[i]);
      i++;
    } else {
      merged.push(rightArray[j]);
      j++;
    }
  }
  while (i < leftArray.length) {
    merged.push(leftArray[i]);
    i++;
  }
  while (j < rightArray.length) {
    merged.push(rightArray[j]);
    j++;
  }
  return merged;
}

function mergeSort(array) {
  if (array.length <= 1) return array;
  const half = Math.floor(array.length / 2);
  const left = array.slice(0, half);
  const right = array.slice(half);

  return merge(mergeSort(left), mergeSort(right));
}

async function matchedBuddy(date, time, destinationId, meetingPointId) {
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
      },
    });
    if (filteredBuddies.length === 0) {
      return "No Buddies Available";
    }
    const locationCoordinates = await locationCod(meetingPointId);
    const userLat = locationCoordinates.latitude;
    const userLon = locationCoordinates.longitude;

    const distances = [];
    for (let i = 0; i < filteredBuddies.length; i++) {
      const locationCoordinatesBuddy = await locationCod(
        filteredBuddies[i].locationId
      );
      const buddyLat = locationCoordinatesBuddy.latitude;
      const buddyLon = locationCoordinatesBuddy.longitude;

      const distance = haversineFormula(userLat, userLon, buddyLat, buddyLon);

      distances.push({ distance, buddy: filteredBuddies[i] });
    }
    const sorted = mergeSort(distances);
    const sortedBuddies = sorted.map((item) => item.buddy);

    return sortedBuddies;
  } catch (error) {
    console.error("Failed to match");
    return JSON.stringify({ message: error.message });
  }
}

export default router;
