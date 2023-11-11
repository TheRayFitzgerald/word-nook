export default async function handler(req, res) {
  // get the word from the request
  const { word } = req.query;

  try {
    const response = await fetch(
      `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "660b3b15f0mshf7cc69a307d53aap122c2bjsnc1fb5233e0b5",
          "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        },
      }
    );

    if (!response.ok) {
      res.status(response.status).json({ message: "Word not found" });
      return;
    }

    const data = await response.json();

    // get the definition from the response
    const definition = data.definitions[0].definition;
    res.status(200).json(definition);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
