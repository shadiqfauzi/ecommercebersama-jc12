import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';

const Example = (props) => {
  return (
    <div key={props.key}>
      <Card className='box-glow' style={{textAlign: 'center', height: '350px', marginBottom: '20px'}}>
        <CardImg top width="100%" src={props.image} alt="Card image cap" />
        <CardBody>
          <CardTitle style={{fontWeight: '900', fontSize: '15px'}}>{props.name}</CardTitle>
          <CardSubtitle style={{fontWeight: '900', fontSize: '12px'}}>{props.brand}</CardSubtitle>
          <CardText style={{fontSize: '15px'}}>{`Rp. ${props.price.toLocaleString()}`}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default Example;