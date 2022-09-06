import {useState, useEffect ,useContext} from 'react';
import { Card, Row, Button, Col } from "react-bootstrap";
import ProjectAddEidtForm from './ProjectAddEditForm';
import Project from './Project';
import * as Api from "../../api";

import {UserContext} from "../common/Context";

// 제일 상위 컴포넌트! 
const Projects = () => {

  const [projects, setProjects] = useState([]);
  const {isEditable, portfolioOwnerId } = useContext(UserContext);
  const [isAdding, setIsAdding] = useState(false);

  // 삭제기능
  const deleteHandler = async (id) => {
    try {
      if (window.confirm('정말로 삭제하시겠습니까?')) {
        await Api.delete(`project/${id}`);
        await Api.get(`projectlist/${portfolioOwnerId}`).then((res) => setProjects(res.data));
        alert('삭제가 완료되었습니다.');
      }
    } 
    catch (error) {
      alert('삭제에 실패하였습니다.  다시 시도해주세요.', error)
    }
};

   useEffect(() => {
    try{
      Api.get(`projectlist/${portfolioOwnerId}`).then((res) =>
      setProjects(res.data));
    } 
    catch(error){
      console.log(error);
      if (error.response) {
       const { data } = error.response;
       console.error("data : ", data);
     }
    }
      }, [portfolioOwnerId]);

   return (
    <Card>
    <Card.Body>
        <Card.Title className='text-start'>🗂 프로젝트</Card.Title>
        { projects.map((project) => (
          <Project 
              key={project.id}
              project={project} 
              setProjects= {setProjects}
              isEditable = {isEditable}
              deleteHandler={deleteHandler}
          />         
        ))}
        {isEditable && (
        <Row className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
        <Button
         className='m-3'
         style={{
          border:"none",
          backgroundColor:"#CFD3FF",
          borderRadius:50
        }} 
        onClick={() => setIsAdding(true)}>+</Button>
        </Col>
        </Row>
        )}
          {isAdding && (
          <ProjectAddEidtForm  
           portfolioOwnerId = {portfolioOwnerId}
           setProjects = {setProjects}
           isAdding = {isAdding}
           setIsAdding = {setIsAdding}
           projects = {projects}
          />
        )}
     </Card.Body>
   </Card> 
   );
}

export default Projects;
