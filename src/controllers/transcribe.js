const { Configuration, OpenAIApi } = require("openai");

export const transcribe = async (req, res) => {
  // const db = await connect();
  const mySecret = "98fa4787dbdaaccedafff617490ad5470b893e32";
  const { url } = JSON.parse(req.body);
  try {
    const response = await fetch(
      "https://api.deepgram.com/v1/listen?tier=enhanced&punctuate=true&paragraphs=true&diarize=true&keywords=Bekah:2&keywords=Hacktoberfest:2",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${mySecret}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
        }),
      }
    );
    const json = await response.json();
    res.status(200).json(JSON.stringify(json));
  } catch (err) {
    res.status(500).json(err);
  }
};

export const transcribeGpt = async (req, res) => {
  console.log("req", req);
  // const db = await connect();
  const configuration = new Configuration({
    apiKey: "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",
  });
  try {
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hii" }],
    });
    res.status(200).json(completion.data.choices[0].message);
  } catch (err) {
    res.status(500).json(err);
  }
};
