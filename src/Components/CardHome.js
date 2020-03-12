import React from 'react';
import { Card, CardTitle, CardImg, CardImgOverlay } from 'reactstrap';

const CardHome = (props) => {
  return (
    <div className='card-home'>
      <Card inverse>
        <CardImg width="100%" src={props.image} alt="Card image cap" style={{ height: '28em', objectFit: 'cover' }}/>
        <CardImgOverlay>
            <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CardTitle className='card-text'>{props.name}</CardTitle>
            </div>
        </CardImgOverlay>
      </Card>
    </div>
  );
};

export default CardHome;