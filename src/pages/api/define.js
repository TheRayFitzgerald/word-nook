// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// use the wordsAPI to define a word
export default async function handler(req, res) {
  
  // get the word from the request
  const { word } = req.query;

  const response = await fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '660b3b15f0mshf7cc69a307d53aap122c2bjsnc1fb5233e0b5',
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
    }
  })

  const data = await response.json()
  // get the definition from the response
  console.log(data)
  const definition = data.definitions[0].definition
  res.status(200).json(definition)
}
