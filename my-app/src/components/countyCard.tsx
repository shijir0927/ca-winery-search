import React, { FC } from 'react';
import '../App.css';

interface IProps {
  name: string;
  path: string;
  handleClick?: any;
}

const CountyCard: FC <IProps> = (props:IProps) =>{

  const {name, path, handleClick} = props;


  return(
    <div className='county-card' onClick={handleClick}> 
      <p>{name}</p>
    </div>
  )
}

export default CountyCard;