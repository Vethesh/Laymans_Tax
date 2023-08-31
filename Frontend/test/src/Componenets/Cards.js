import React from "react";
import { Button, Card } from "antd";
const Cards = () => {
  return (
    <div>
      <Card
        title="Card title"
        hoverable
        bordered={true}
        style={{ width: 300, marginTop: 16, background: "black",color:"white" }}>
        <p>Card content</p>
        <Button>Click here</Button>
      </Card>
    </div>
  );
};

export default Cards;
