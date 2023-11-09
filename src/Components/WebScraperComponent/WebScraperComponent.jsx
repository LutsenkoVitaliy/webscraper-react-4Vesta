import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {Summary, Title, Paragraph, Image} from './WebScraperComponent.styled'
import data from '../../server/data.json'

const IMG_URL = "https://library.kiwix.org/content/wikipedia_uk_all_maxi_2023-07";

function WebScraperComponent() {
  const [jsonData, setJsonData] = useState({});
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const toggleInfo = useCallback(() => {
    setIsInfoVisible(prev => !prev);
  }, []);

  const imgSource = useMemo(() => jsonData.imageUrl?.replace("..",IMG_URL), [jsonData.imageUrl]);

  const label = useMemo(() => isInfoVisible ? 'Приховати інформацію' : 'Більше інформації', [isInfoVisible]);

  useEffect(() => {
    const fetchData = () => {
      fetch('/4Vesta')
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch((error) => console.error('Ошибка загрузки данных из файла JSON:', error));
    };
    
    fetchData();
  }, []);

  return (
    <div>
      {jsonData ? (
        <div>
          <Title>{jsonData.title}</Title>
          {jsonData.imageUrl && (
          <Image src={imgSource} alt={jsonData.title} /> 
          )}
          <Paragraph>{jsonData.description}</Paragraph>
    
          <details>
          <Summary onClick={toggleInfo}>
            {label}
          </Summary>
            <Paragraph>{jsonData.moreInformation}</Paragraph>
          </details>
          </div>
        ) : (
          <div>
          <Title>{data.title}</Title>
          {data.imageUrl && (
          <Image src={data.imageUrl?.replace("..",IMG_URL)} alt={data.title} /> 
          )}
          <Paragraph>{data.description}</Paragraph>
    
          <details>
          <Summary onClick={toggleInfo}>
            {label}
          </Summary>
            <Paragraph>{data.moreInformation}</Paragraph>
          </details>
          </div>
        )}
    </div>
  );
}

export default WebScraperComponent;



// export default function WebScraperComponent() {
//   const [scrapedData, setScrapedData] = useState({
//     title: '',
//     description: '',
//     imageUrl: '',
//     moreInformation : '',
//   });
//   const [isInfoVisible, setIsInfoVisible] = useState(false);

  
//   useEffect(() => {
//     axios.get(BASE_URL)
//     .then((response) => {
//       const html = response.data;
//       const $ = cheerio.load(html, { 
//         xml : { 
//           normalizeWhitespace : true , 
//         } , 
//       });
      
//       const title = $('span.mw-page-title-main').text();
//       const description = $('div.mf-section-0').text();
//       const imageUrl = $('[src="../I/Vesta_in_natural_color.jpg.webp"]').attr('src');
//       const moreInformation = $('details[data-level="2"]:first').text();
     

//       setScrapedData({ 
//           title,
//           description,
//           imageUrl,
//           moreInformation
//       });
//     })
//     .catch((error) => {
//       console.error(`Ошибка при загрузке страницы: ${error}`);
//     });
//     }, []);
    

//   const toggleInfo = () => {
//     setIsInfoVisible(!isInfoVisible);
//   };

//   return (
//     <div>
//     {scrapedData ? (
//       <div>
//         <Title>{scrapedData.title}</Title>
//         {scrapedData.imageUrl && (
//         <Image src={scrapedData.imageUrl.replace("..",IMG_URL)} alt={scrapedData.title} /> 
//       )}
//         <Paragraph>{scrapedData.description}</Paragraph>

//         <details>
//         <Summary onClick={toggleInfo}>
//           {isInfoVisible ? 'Скрити інформацію' : 'Більше інформації'}
//         </Summary>
//           <Paragraph>{scrapedData.moreInformation}</Paragraph>
//         </details>
//       </div>
//     ) : (
//       <p>Загрузка сторінки...</p>
//     )}
//   </div>
//   );
// }


// class WebScraperComponent extends Component {
//   constructor() {
//     super();
//     this.state = {
//       scrapedData: {
//         title: '',
//         description: '',
//         imageUrl: '',
//         moreInformation : '',
//       },
//       isInfoVisible: false,
//     };
//   }

//   componentDidMount() {
//     axios.get(BASE_URL)
//       .then((response) => {
//         const html = response.data;
//         const $ = cheerio.load(html, { 
//           xml : { 
//             normalizeWhitespace : true , 
//           } , 
//         });
  
//         const title = $('span.mw-page-title-main').text();
//         const description = $('div.mf-section-0').text();
//         const imageUrl = $('[src="../I/Vesta_in_natural_color.jpg.webp"]').attr('src');
//         const moreInformation = $('details[data-level="2"]').text();
       

//         this.setState({ 
//           scrapedData: { 
//             title,
//             description,
//             imageUrl,
//             moreInformation
//            } 
//         });
//       })
//       .catch((error) => {
//         console.error(`Ошибка при загрузке страницы: ${error}`);
//       });
//   }

//   toggleInfo = () => {
//     this.setState((prevState) => ({
//       isInfoVisible: !prevState.isInfoVisible,
//     }));
//   };

//   render() {
//     const { scrapedData, isInfoVisible  } = this.state;

//     return (
      // <div>
      //   {scrapedData ? (
      //     <div>
      //       <Title>{scrapedData.title}</Title>
      //       {scrapedData.imageUrl && (
      //       <Image src={scrapedData.imageUrl.replace("..",IMG_URL)} alt={scrapedData.title} /> 
      //     )}
      //       <Paragraph>{scrapedData.description}</Paragraph>

      //       <details>
      //       <Summary onClick={this.toggleInfo}>
      //         {isInfoVisible ? 'Скрити інформацію' : 'Більше інформації'}
      //       </Summary>
      //         <Paragraph>{scrapedData.moreInformation}</Paragraph>
      //       </details>
      //     </div>
      //   ) : (
      //     <p>Загрузка сторінки...</p>
      //   )}
      // </div>
//     );
//   }
// }

// export default WebScraperComponent;