import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from '../../api'

function CertificateCard({ certificate, isEditable, setIsEditing, deleteHandler }) {
    
    const stringwhenDate = ''+ certificate.whenDate;
    const whenDate = stringwhenDate.substring(0,10); 

  return (
    <Card.Text>
      <Row className="align-items-center">
      <Col>
      <div style={{
          display: "flex" ,
          marginTop: "10px"
          }}>
        <div className='mvpCardItem'>
        {certificate.title}
            </div>
        <div className='mvpCardItem1'>
        {certificate.description}
        </div>
        <div className='mvpCardItem2'>
        {whenDate}
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
              onClick={() => deleteHandler(certificate.id)}
            >
              삭제
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default CertificateCard;
