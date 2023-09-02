import React from "react";
import { Button, Card } from "antd";
const Cards = ({ cardDetail }) => {
  return (
    
      <Card
        title={cardDetail.title}
        hoverable
        bordered={true}
        style={{
          width: 300,
          marginTop: 16,
  
        }}>
        <p>{cardDetail.description}</p>
        <Button>Click here</Button>
      </Card>
    
  );
};

export default Cards;
