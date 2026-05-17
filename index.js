const express = require('express');
const app = express();

const port = 3000;

app.get('/api/preview', async (req, res) => {
    const result = await getSheet();
    res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


