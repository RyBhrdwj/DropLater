const Note = require("./shared/models/noteModel");
const { z } = require("zod");
const { Queue } = require("bullmq");

const NoteFormat = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  webhookUrl: z.url(),
  releaseAt: z.iso.datetime() // check for iso date
});

const redisConnection = {
  host: "redis",
  port: 6379,
};

const noteQueue = new Queue("notes", {
  connection: redisConnection,
});

const pushToQueue = async (data) => {
  const time = new Date(data.releaseAt);
  const delay = time - Date.now();

  await noteQueue.add("notes", data, { delay });
};

const fetchNotes = async (req, res) => {
  try {
    const notes = await Note.find({});

    res.json(notes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postNote = async (req, res) => {
  try {
    const payload = NoteFormat.parse(req.body);

    const note = await Note.create(payload);

    await pushToQueue(note);

    res.json(note);
  } catch (error) {
    console.log("Error in creating note : ", error);

    res.json(...error);
  }
};

const replayNote = async (req, res) => {
  try {
    const { id } = req.params;

    res.json(id);
  } catch (error) {
    console.log("Error in replaying note : ", error);
    
    res.json(...error);
  }
};

module.exports = { fetchNotes, postNote, replayNote };
