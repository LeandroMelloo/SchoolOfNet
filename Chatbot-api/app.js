const express = require('express');
const bodyParser = require('body-parser');
const AssistantV1 = require('watson-developer-cloud/assistant/v1');

const app = express();

app.use(bodyParser.json());
app.use(express.static('./public'));

const port = 3000;

app.get('/conversation/:text*?', (req, res) => {
  const { text } = req.params;

  res.json(text);
});

const assistant = new AssistantV1({
    username: '<username>',
    password: '<password>',
    url: 'https://gateway.watsonplatform.net/assistant/api/',
    version: '2018-02-16',
  });
  
  app.post('/conversation/', (req, res) => {
    const { text, context = {} } = req.body;
  
    const params = {
      input: { text },
      workspace_id:'<workspace_id>',
      context,
    };
  
    assistant.message(params, (err, response) => {
      if (err) {
        console.error(err);
        res.status(500).json(err);
      } else {
        res.json(response);
      }
    });
});


app.listen(port, () => console.log(`Running on port ${port}`));