import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import * as Api from "../../api";


function UserEditForm({ user, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try{
      const res = await Api.put(`user/${user.id}`, {
        name,
        email,
        description,
      });
     
      const updatedUser = res.data;
      setUser(updatedUser);
      setIsEditing(false);
      window.location.reload();
    }
    catch(error){
      console.log(error);
      if (error.response) {
       const { data } = error.response;
       console.error("data : ", data);
       alert(data);
     }
  };

  };

  return (
    <Card className="userCardEdit">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button 
               mb="10"
               style={{
                border:"none",
                backgroundColor:"#339AF0"
              }} 
              variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button 
                mb="10"
                style={{
                 border:"none",
                 backgroundColor:"#C4C4C4"
               }} 
              variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
