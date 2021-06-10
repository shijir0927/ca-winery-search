import React, { FC, useState, useEffect } from 'react';
import './App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import {getAxiosCall} from './utils/apiCalls';

const URL = 'https://discovercaliforniawines.com/discover-california/';
interface IProps {
}

const App: FC<IProps> = (props: IProps)=>  {

  const [regionData, setRegionData] = useState();

  const getRegionData = async(region:string) =>{
    const responseData = await getAxiosCall(region);
    console.log(responseData)
    setRegionData(responseData);
  }


  return (
    <div>
      <header>
        <p>Search CA Wines</p>
      </header>
      <div className="container">
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

        <div>{regionData && regionData}</div>
      </div>
    </div>
  );
}

export default App;
