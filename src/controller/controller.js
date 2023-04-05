const { Configuration, OpenAIApi } = require("openai");

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
      // prompt: `${newQuestion}
      //  ${formatedText}`,
      messages: [
        {
          role: "user",
          content: `${req.body.first}
      ${req.body.second}`,
        },
      ],
    };
    const completion = await openai.createChatCompletion(completeOptions);

    return completion.data.choices[0].message;
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = {
  transcribeGpt,
};
