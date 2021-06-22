import React, { FC, useState, useEffect } from 'react';
import './App.css';
import {getAxiosCall} from './utils/apiCalls';
import * as cheerio from 'cheerio';
import CountyCard from './components/countyCard';
import RegionCard from './components/regionCard';
import {REGIONS} from './constants/regions';
interface IProps {
}

const App: FC<IProps> = (props: IProps)=>  {

  const [regionData, setRegionData] = useState('');

  useEffect(()=>{
  },[])

  const handleCountyClick = async(path:any)=>{
    const responseData = await getAxiosCall('/getWinery/'+regionData + '/' + path);
    // console.log(responseData)

    let $ = cheerio.load(responseData);
    let resultArray:any[] = [];
    $("#posts_countable_list li").each(function(i, element) {
      let result:any = {name: '', link: ''};

      result.name = $(this).children("a").text();
      result.link = $(this).children("a").attr("href")
      
      resultArray.push(result);
    });

    console.log(resultArray)
  }

  const getRegionCounties = () =>{
    let counties:any = [];
    REGIONS.forEach((item)=>{
      if(item.path === regionData){
        counties = item.counties;
      }
    })

    return counties.map((item:any, index:number)=>{
      return (<CountyCard name={item.name} path={item.path} handleClick={()=>handleCountyClick(item.path)} key={index}/>)
    })
  }

  return (
    <div>
      <header>
        <p>Search CA Wines</p>
      </header>
      <div className="container">
        <div className='regions-container'>
          {REGIONS.map((item:any, index: number)=>{
            return (<RegionCard name={item.name} path={item.path} handleClick={()=>setRegionData(item.path)} selected={regionData===item.path} key={index}/>)
          })}
        </div>
        <div className='counties-container'>
          {getRegionCounties()}
        </div>
      </div>
    </div>
  );
}

export default App;
