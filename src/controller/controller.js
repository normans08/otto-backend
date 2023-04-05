const { Configuration, OpenAIApi } = require("openai");

const transcribeGpt = async (req, res) => {
  console.log("req", req.body);
  const configuration = new Configuration({
    apiKey: process.env.GPT_TOKEN,
  });
  try {
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `${req.body.first}
      ${req.body.second}`,
        },
      ],
    });
    console.log("result====>", completion.data.choices[0].message);

    return completion.data.choices[0].message;
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = {
  transcribeGpt,
};
