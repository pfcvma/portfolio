import React from 'react'
import { Card, Row, Col, Button} from "react-bootstrap";
import * as Api from '../../api'

const ProjectCard = ({project, isEditable, setIsEditing, setProjects, deleteHandler}) => {

  const stringFromDate = ''+project.fromDate;
  const stringToDate= ''+project.toDate;

  const fromDate = stringFromDate.substring(0,10);
  const toDate = stringToDate.substring(0,10);

  return (
    <Card.Text>
    <Row className="justify-content-between align-items-center mb-2">
    <Col>
        <div style={{
          display: "flex" ,
          marginTop: "10px",
          marginBottom: "10px"}}>
        <div className='mvpCardItem'>
        {project.title}
            </div>
        <div className='mvpCardItem1'>
        {project.content}
            </div>
        <div className='mvpCardItem2'>
        {`${fromDate} ~ ${toDate}`}
        </div>
        </div>
        </Col>
      {isEditable && (
        <Col xs lg="1">
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => setIsEditing((prev) => !prev)}
            className="mr-3 mb-1"
          >
            편집
          </Button>
          <Button
              className="mr-3"
              variant="outline-danger"
              size="sm"
              onClick={() => deleteHandler(project.id)}
            >
              삭제
            </Button>
        </Col>
      )}
    </Row>
  </Card.Text>
  );

}

export default ProjectCard;
