import React from "react";
import Layout from "../Componenets/Layout";
import Img from "../Images/front.png";
import Youtubecard from "../Componenets/Youtubecard";

const Home = () => {
  const data = [
    {
      id: 1,
      title: "https://www.youtube.com/embed/XTKgvVcqnNQ?si=0LbZBp5yvi17me94",
    },
    {
      id: 2,
      title: "https://www.youtube.com/embed/OJiXG4Pnwhc?si=kIuNhr7UolkV85Ky",
    },
    {
      id: 3,
      title: "https://www.youtube.com/embed/3g61afhXcQg?si=gQ6lIJHh9zM-2XQu",
    },
    {
      id: 4,
      title: "https://www.youtube.com/embed/JTpDt9HpO5E?si=Jn2-9WDKMQ3GtcXu",
    },
    {
      id: 5,
      title: "https://www.youtube.com/embed/ElBuWNVXxSQ?si=PIGlUsH-ufJEVxXu" ,
    },
    {
      id: 6,
      title: "https://www.youtube.com/embed/mJc5stZ1NvM?si=rTSUy41GL5y9F8-E",
    },
    {
      id: 7,
      title: "https://www.youtube.com/embed/qQgPrWaC9FU?si=_8izNUOMZEVcVdfe",
    },
    {
      id: 8,
      title: "https://www.youtube.com/embed/iwpHQH4bkMA?si=My1K-zL5EZKxcNBy",
    },
  ];

  return (
    <Layout>
      <div className="main">
        <div className="text-slider">
          <marquee>
            We have revolutionized the tax filing process in India, not only
            ensuring the swift completion of your tax return but also securing
            the highest possible refunds for you in record time.
          </marquee>
        </div>

        <div
          className="bg"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div>
            <img src={Img} alt="bg" />
          </div>

          <div className="youtube">
            {data.map((ele) => (
              <Youtubecard key={ele.id} cardDetail={ele} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
