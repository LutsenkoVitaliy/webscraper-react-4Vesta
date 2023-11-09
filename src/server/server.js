const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const port = 5000;
const BASE_URL = 'https://library.kiwix.org/wikipedia_uk_all_maxi_2023-07/A/4_Веста'; 

app.get('/4Vesta', async (_req, res) => {
  try {
    const url = BASE_URL;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const title = $('span.mw-page-title-main').text();
    const description = $('div.mf-section-0').text();
    const imageUrl = $('[src="../I/Vesta_in_natural_color.jpg.webp"]').attr('src');
    const moreInformation = $('details[data-level="2"]:first').text();

    const data = {
      title,
      description,
      imageUrl,
      moreInformation,
    };
    res.json(data);

    require('fs').writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


