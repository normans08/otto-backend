const { Configuration, OpenAIApi } = require("openai");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const transcribeGpt = async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.GPT_TOKEN,
  });
  try {
    const openai = new OpenAIApi(configuration);
    let options = {
      model: "gpt-3.5-turbo",
      temperature: 0,
      max_tokens: 1000,
      top_p: 0.1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      // stop: ["^"],
    };

    let completeOptions = {
      ...options,

      messages: [
        {
          role: "user",
          content: req.body.body.first + " " + req.body.body.second,
        },
      ],
    };
    const completion = await openai.createChatCompletion(completeOptions);

    return completion.data.choices[0].message;
  } catch (error) {
    res.status(401).send(error);
  }
};

const uploadAudio = async (req, res) => {
  // Get the file name and extension with multer
  const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const fileExt = file.originalname.split(".")?.pop();
      const filename = `${new Date().getTime()}.${fileExt}`;
      cb(null, filename);
    },
  });

  // Filter the file to validate if it meets the required audio extension
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "audio/mp3" ||
      file.mimetype === "audio/wave" ||
      file.mimetype === "audio/mpeg"
    ) {
      cb(null, true);
    } else {
      cb(
        {
          message: "Unsupported File Format",
        },
        false
      );
    }
  };

  // Set the storage, file filter and file size with multer
  const upload = multer({
    storage,
    limits: {
      fieldNameSize: 2000000,
      fileSize: 5 * 1024 * 1024 * 1024 * 1024,
    },
    fileFilter,
  }).single("audio");

  // upload to cloudinary
  upload(req, res, (err) => {
    console.log("reqqqqq======>", req, res);
    if (err) {
      return res.send(err);
    }

    // SEND FILE TO CLOUDINARY
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const { path } = req.file; // file becomes available in req at this point
    console.log("paarr", path);
    const fName = req.file.originalname.split(".")[0];
    cloudinary.uploader.upload(
      path,
      {
        resource_type: "raw",
        public_id: `AudioUploads/${fName}`,
      },

      // Send cloudinary response or catch error
      (err, audio) => {
        if (err) return res.send(err);

        fs.unlinkSync(path);
        console.log("ofefe", audio);
        res.send(audio);
      }
    );
  });
};

module.exports = {
  transcribeGpt,
  uploadAudio,
};
