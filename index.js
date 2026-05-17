const express = require('express');
const app = express();
const { getSheet } = require('./utils/googleSheet.util.js');

const port = 3000;

app.get('/api/preview', async (req, res) => {

    const { page, limit } = req.query;
    
    try {
        const sheet = await getSheet();
        const headers = sheet[0];
        const sheetData = sheet.slice(1);
        const total = sheetData.length;

        

        res.status(200).send({headers: headers, sheetData: sheetData });
    }
    catch (_) {
        console.error('Ошибка сервера');
        res.status(500).json({ error: 'Не удалось получить данные таблицы' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


