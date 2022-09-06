import React, {useState} from 'react';
import {Row, Card} from 'react-bootstrap';
import * as Api from "../../api";
import './CardStyle.css'

const CareerSkillCard = ({skill}) => {
  let putSkill;

  if(skill.career !== null){
     putSkill = skill.career + "년";
  }

  return (
    <Card.Text className='text-center'>
    <Row className="align-items-center">
      <div style={{
        marginTop: "10px",
        display: "flex"
      }}>
       <div className='cardItem'> {putSkill} </div>
         <div className='cardItem2'>
           {skill.languageList[0] } 
        </div>
        <div className='cardItem2'>
            {skill.languageList[1]} 
       </div>
       <div className='cardItem2'>
           {skill.languageList[2]}
       </div>
      </div>
    </Row>
  </Card.Text>
  )
}

export default CareerSkillCard;
