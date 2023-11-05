import React, { Component } from 'react';
import axios from 'axios';
// import PropTypes from "prop-types";
import {Summary, Title, Paragraph, Image} from './WebScraperComponent.styled'

const BASE_URL = "https://library.kiwix.org/content/wikipedia_uk_all_maxi_2023-07"

class WebScraperComponent extends Component {
  constructor() {
    super();
    this.state = {
      scrapedData: {
        title: '',
        description: '',
        imageUrl: '',
        moreInformation : '',
      },
      isInfoVisible: false,
    };
  }

  componentDidMount() {
    const url = 'https://library.kiwix.org/wikipedia_uk_all_maxi_2023-07/A/4_Веста'; 
    const cheerio = require('cheerio');
   
    axios.get(url)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html, { 
          xml : { 
            normalizeWhitespace : true , 
          } , 
        });
  
        const title = $('span.mw-page-title-main').text();
        const description = $('div.mf-section-0').text();
        const imageUrl = $('[src="../I/Vesta_in_natural_color.jpg.webp"]').attr('src');
        const moreInformation = $('details[data-level="2"]').text();
       

        this.setState({ 
          scrapedData: { 
            title,
            description,
            imageUrl,
            moreInformation
           } 
        });
      })
      .catch((error) => {
        console.error(`Ошибка при загрузке страницы: ${error}`);
      });
  }

  toggleInfo = () => {
    this.setState((prevState) => ({
      isInfoVisible: !prevState.isInfoVisible,
    }));
  };

  render() {
    const { scrapedData, isInfoVisible  } = this.state;

    return (
      <div>
        {scrapedData ? (
          <div>
            <Title>{scrapedData.title}</Title>
            {scrapedData.imageUrl && (
            <Image src={scrapedData.imageUrl.replace("..",BASE_URL)} alt={scrapedData.title} /> 
          )}
            <Paragraph>{scrapedData.description}</Paragraph>

            <details>
            <Summary onClick={this.toggleInfo}>
              {isInfoVisible ? 'Скрити інформацію' : 'Більше інформації'}
            </Summary>
              <Paragraph>{scrapedData.moreInformation}</Paragraph>
            </details>
          </div>
        ) : (
          <p>Загрузка данных...</p>
        )}
      </div>
    );
  }
}

export default WebScraperComponent;