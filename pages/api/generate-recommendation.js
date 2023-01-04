const { Configuration, OpenAIApi } = require('openai');
const { search } = require('regexp-tree');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { need, language, platform } = req.body;
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: generatePrompt(need, language, platform),
    temperature: 0.6,
    max_tokens: 2048,
  });
  res.status(200).json({ result: parseResponse(completion.data.choices[0].text) });
}

function generatePrompt(need, language, platform) {
  return `suggest a software tool that can help with ${need} and is available for ${platform} and written in ${language}.`;
}

function parseResponse(response) {
  // Extract the recommended tool from the chatbot's response
  const tool_pattern = 'recommend (.*?) for';
  const tool_match = search(tool_pattern, response);
  if (tool_match) {
    return tool_match[1];
  } else {
    return 'I could not suggest a tool for this need.';
  }
}
