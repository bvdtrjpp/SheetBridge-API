const express = require('express');
const app = express();
const { getSheet } = require('./utils/googleSheet.util.js');


const port = 3000;

app.get('/api/preview', async (req, res) => {

    const { page, limit } = req.query;

    try {
        const sheet = await getSheet();
        const headers = sheet[0];


        let sheetData = sheet.slice(1);

        sheetData = sheetData.map((row) => {
            while (row.length < headers.length) {
                row.push('');
            }
            return row;
        });

        const total = sheetData.length;

        const currentPage = +page || 1;
        const currentLimit = +limit || 10;
        const startIndex = (currentPage - 1) * currentLimit;
        const endIndex = startIndex + currentLimit;
        const paginatedData = sheetData.slice(startIndex, endIndex);

        res.status(200).json({
            headers,
            sheetData: paginatedData,
            total,
            page: currentPage,
            limit: currentLimit
        });
    }
    catch (error) {
        console.error('Ошибка сервера: ' + error);
        res.status(500).json({ error: 'Не удалось получить данные таблицы' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


