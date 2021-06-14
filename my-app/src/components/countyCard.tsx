import React, { FC } from 'react';
import '../App.css';

interface IProps {
  name: string;
  link: string;
}

const CountyCard: FC <IProps> = (props:IProps) =>{

  const {name, link} = props;

  const handleClick = () =>{
    console.log(link)
  }

  return(
    <div className='county-card'> 
      <p onClick={handleClick}>{name}</p>
    </div>
  )
}

export default CountyCard;