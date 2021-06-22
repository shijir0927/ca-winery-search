import React, { FC } from 'react';
import '../App.css';

interface IProps {
  name: string;
  path: string;
  handleClick?: ()=>any;
  selected: boolean;
}

const RegionCard: FC <IProps> = (props:IProps) =>{

  const {name, path, handleClick, selected} = props;
  
  return(
    <div className={`region-card ${selected && 'selected-region'}`}> 
      <p onClick={handleClick}>{name}</p>
    </div>
  )
}

export default RegionCard;