import React, { FC, useState, useEffect } from 'react';
import './App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import {getAxiosCall} from './utils/apiCalls';
import * as cheerio from 'cheerio';
import CountyCard from './components/countyCard';

interface IProps {
}

interface Region{
  name: string;
  address: string | any;
  link: string | undefined;
}

const App: FC<IProps> = (props: IProps)=>  {

  const [regionData, setRegionData] = useState<any>([]);

  useEffect(()=>{
    // getRegionData('north-coast');
  },[])

  const getRegionData = async(region:string) =>{
    const responseData = await getAxiosCall(region);
    // console.log(responseData)
    let $ = cheerio.load(responseData);
    let resultArray:any[] = [];
    $("#posts_countable_list li").each(function(i, element) {
      let result:any = {name: '', link: ''};

      result.name = $(this).children("a").text();
      result.link = $(this).children("a").attr("href")
      
      resultArray.push(result);
    });

    let half = Math.floor(resultArray.length/2);
    let uniqueArray = resultArray.slice(0, half);
    console.log(uniqueArray)
    setRegionData(resultArray)
  }


  return (
    <div>
      <header>
        <p>Search CA Wines</p>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Select Region
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={()=>getRegionData('/north-coast')}>North Coast</Dropdown.Item>
            <Dropdown.Item onClick={()=>getRegionData('/central-coast')}>Central Coast</Dropdown.Item>
            <Dropdown.Item onClick={()=>getRegionData('/sierra-foothills')}>Sierra Foothills</Dropdown.Item>
            <Dropdown.Item onClick={()=>getRegionData('/inland-valleys')}>Inland valleys</Dropdown.Item>
            <Dropdown.Item onClick={()=>getRegionData('/southern-california')}>Southern California</Dropdown.Item>
            <Dropdown.Item onClick={()=>getRegionData('/far-north-california')}>Far North California</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </header>
      <div className="container">
        <p>{regionData.length}</p>
        <div className='counties'>
        {regionData && regionData.map((item:any, index:number)=>{
          return (<CountyCard name={item.name} link={item.link} key={index}/>)
        })}
        </div>
      </div>
    </div>
  );
}

export default App;
