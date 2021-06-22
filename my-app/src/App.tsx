import React, { FC, useState, useEffect } from 'react';
import './App.css';
import {getAxiosCall} from './utils/apiCalls';
import * as cheerio from 'cheerio';
import CountyCard from './components/countyCard';
import RegionCard from './components/regionCard';
import {REGIONS} from './constants/regions';
import Airtable from "airtable";
import { table } from 'console';
const base = new Airtable({ apiKey: 'key2NRWl08o5DUlCy' }).base('appH1XlYPbZSY2Vtg');
interface IProps {
}

const App: FC<IProps> = (props: IProps)=>  {

  const [regionData, setRegionData] = useState('');
  const [wineries, setWineries] = useState<any>([]);
  const [county, setCounty] = useState('');
  const [tableName, setTableName] = useState('Dummy');

  useEffect(()=>{

    // countyBase("Table 1")
    // .select({ view: "Grid view" })
    // .eachPage((records, fetchNextPage) => {
    //   for (var i = 0; i < records.length; i++) {
    //     console.log(records[i])
    //   }
    //   fetchNextPage();
    // });

    // console.log(countyBase.table.name)
    // getRecords();
    console.log(138/10)
  },[])

  const getRecords = (tableName:string) =>{
    base(tableName || 'Dummy').select({
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
  
      records.forEach(function(record) {
          console.log('Retrieved', record.get('Winery Name'));
      });
  
      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
  
  }, function done(err) {
      if (err) { console.error(err); return; }
  });
  }
  const dummyData = [
      {
        "fields": {
          "Winery Name" : "new name 1"
        }
      },
      {
        "fields": {
          "Winery Name" : "new name 1"
        }
      }
    ]
  const createRecords = (data:any, tableName:string) =>{
    base(tableName).create(
      data
    , function(err:any, records:any) {
      if (err) {
        console.error(err);
        alert(err)
        return;
      }
      records?.forEach(function (record:any) {
        console.log(record.getId());
      });
      alert(`Successfully created ${records.length} records!`)
    });
    
  }


  const handleCountyClick = async(path:string, name: string)=>{
    const responseData = await getAxiosCall('/getWinery/'+regionData + '/' + path);
    // console.log(responseData)
    setCounty(name);
    let $ = cheerio.load(responseData);
    let resultArray:any[] = [];
    $("#posts_countable_list li").each(function(i, element) {
      let result:any = {name: '', link: ''};

      result.name = $(this).children("a").text();
      result.link = $(this).children("a").attr("href")
      
      resultArray.push(result);
    });

    setWineries(resultArray)
    // console.log(resultArray, wineries)

  }

  const getRegionCounties = () =>{
    let counties:any = [];
    REGIONS.forEach((item)=>{
      if(item.path === regionData){
        counties = item.counties;
      }
    })

    return counties.map((item:any, index:number)=>{
      return (<CountyCard name={item.name} path={item.path} handleClick={()=>handleCountyClick(item.path, item.name)} key={index}/>)
    })
  }

  const getWineryInfo = async(link:string) =>{
    let seperated = link.split('/');
    let winery = seperated[4];//getting the winery path from the full link

    const responseData = await getAxiosCall('/winery/'+winery);
    console.log(responseData)
  }

  function chunkArrayInGroups(arr:any, size:number) {
    let result = [];
    let pos = 0;
    while (pos < arr.length) {
      result.push(arr.slice(pos, pos + size));
      pos += size;
    }
    return result;
  }

  const createCountyRecords = ()=>{
    let data = [];

    for(let i=0; i< wineries.length; i++){
      let record = {
        "fields": {
          "Winery Name" : wineries[i].name
        }
      }
      data.push(record);
    }
    if(data.length <=10){
      createRecords(data, tableName);
    }else{
      // for(let i=0; i< Math.floor(data.length/10);i++){
      //   createRecords(data.slice(i*10, i+10+9), tableName);
      // }
      console.log(data)
      console.log(chunkArrayInGroups(data, 10))
      let chunkedData = chunkArrayInGroups(data, 10);

      for(let i=0; i<chunkedData.length; i++){
        createRecords(chunkedData[i], tableName)
      }
    }
  }

  return (
    <div>
      <header>
        <p>Search CA Wineries</p>
        <input className='table-name-input' placeholder='Table Name' onChange={(e)=>setTableName(e.target.value)}/>
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
        <div className='wineries-container'>
          {county && <div className='county-title-container'>
            <h3>{`${county} wineries`}</h3>
            <button className='airtable-button' onClick={()=>createCountyRecords()}>Add all Wineries to Airtable</button>
            </div>}
          <ol>
            {wineries && wineries.map((item:any, index:number)=>{
              return <li key={index} onClick={()=>getWineryInfo(item.link)}>
                <a href={item.link} target='_blank'>{item.name}</a>
                <button className='airtable-button' onClick={()=>createRecords(
                                                                            [{
                                                                              "fields": {
                                                                                "Winery Name" : item.name
                                                                              }
                                                                            }], tableName)}>Add to Airtable</button>
              </li>
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
