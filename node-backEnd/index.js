const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
const e = require("express");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database connection
// Update the username and password as per your MySQL credentials
const sequelize = new Sequelize("coach_student_db", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

const Coach = sequelize.define(
  "coaches",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Disable automatic timestamps
  }
);

const Student = sequelize.define(
  "students",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Disable automatic timestamps
  }
);

const Slot = sequelize.define(
  "slots",
  {
    coach_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false, // Disable automatic timestamps
  }
);

const Review = sequelize.define(
  "reviews",
  {
    slot_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    satisfaction: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: false, // Disable automatic timestamps
  }
);

Coach.hasMany(Slot, { foreignKey: "coach_id" });
Student.hasMany(Slot, { foreignKey: "student_id" });
Slot.belongsTo(Coach, { foreignKey: "coach_id" });
Slot.belongsTo(Student, { foreignKey: "student_id" });
Slot.hasOne(Review, { foreignKey: "slot_id" });

sequelize.sync();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Create availability slot
app.post("/slots", async (req, res) => {
  const { coach_id, start_time } = req.body;
  // End time is 2 hours after start time
  const end_time = new Date(
    new Date(start_time).getTime() + 2 * 60 * 60 * 1000
  );

  try {
    let slot = await Slot.create({ coach_id, start_time, end_time });
    slot.student_id = null;
    slot.student = null;
    res.status(201).json(slot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get available slots
app.get("/slots", async (req, res) => {
  try {
    var slots = await Slot.findAll({
      where: { student_id: null },
      include: [Coach],
    });
    slots = slots.filter((slot) => slot.start_time > new Date());
    // Sorting by start time
    slots = slots.sort((a, b) => a.start_time - b.start_time);
    res.status(200).json(slots);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Book a slot
app.post("/slots/:id/book", async (req, res) => {
  const slotId = req.params.id;
  const { student_id } = req.body;
  try {
    const slot = await Slot.findByPk(slotId);
    if (slot) {
      slot.student_id = student_id;
      // fetch coach details
      const coach = await Coach.findByPk(slot.coach_id);
      let newSlot = {
        id: slot.id,
        coach_id: slot.coach_id,
        start_time: slot.start_time,
        end_time: slot.end_time,
        student_id: student_id,
        coach: coach,
      };
      await slot.save();
      res.status(200).json(newSlot);
    } else {
      res.status(404).json({ error: "Slot not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get coach's upcoming slots
app.get("/coaches/:id/slots", async (req, res) => {
  const coachId = req.params.id;

  try {
    var slots = await Slot.findAll({
      where: { coach_id: coachId },
      // where: { coach_id: coachId, student_id: { [Sequelize.Op.not]: null } },
      include: [Student],
    });
    slots = slots.filter((slot) => slot.start_time > new Date());
    // Sorting by start time
    slots = slots.sort((a, b) => a.start_time - b.start_time);
    res.status(200).json(slots);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get coach's past reviews
app.get("/coaches/:id/reviews", async (req, res) => {
  const coachId = req.params.id;

  try {
    let slots = await Slot.findAll({
      where: { coach_id: coachId },
      include: [Review],
    });
    slots = slots.filter((slot) => slot.review !== null);
    slots = slots.filter((slot) => slot.student_id !== null);
    res.status(200).json(slots);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add review
app.post("/slots/:id/review", async (req, res) => {
  const slotId = req.params.id;
  const { satisfaction, notes } = req.body;
  try {
    let review = await Review.create({ slot_id: slotId, satisfaction, notes });
    const slot = await Slot.findByPk(slotId);
    let newReview = {
      id: review.id,
      start_time: slot.start_time,
      end_time: slot.end_time,
      coach_id: slot.coach_id,
      student_id: slot.student_id,
      review: review,
    };
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all upcoming slots for a student
app.get("/students/:id/slots", async (req, res) => {
  const studentId = req.params.id;

  try {
    var slots = await Slot.findAll({
      where: { student_id: studentId },
      include: [Coach],
    });
    slots = slots.filter((slot) => slot.start_time > new Date());
    // Sorting by start time
    slots = slots.sort((a, b) => a.start_time - b.start_time);
    res.status(200).json(slots);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all past slots for a coach
app.get("/coaches/:id/pastSlots", async (req, res) => {
  const coachId = req.params.id;

  try {
    var slots = await Slot.findAll({
      where: { coach_id: coachId },
      include: [Student],
    });
    slots = slots.filter((slot) => slot.start_time < new Date());
    slots = slots.filter((slot) => slot.student_id !== null);
    let reviews = await Review.findAll();
    reviews = reviews.map((review) => review.slot_id);
    slots = slots.filter((slot) => !reviews.includes(slot.id));
    // Sorting by start time
    slots = slots.sort((a, b) => a.start_time - b.start_time);
    res.status(200).json(slots);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
