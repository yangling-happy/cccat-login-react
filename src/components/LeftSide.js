import React from "react";

const LeftSide = () => {
  return (
    <div className="left-side">
      <a
        href="https://baike.baidu.com/item/cc%E7%8C%AB/1533216"
        target="_blank"
        rel="noreferrer"
        title="KNOW MORE ABOUT CCCAT"
      >
        <h1>CCcat</h1>
      </a>
      <div className="cats">
        <div className="gif-wrap">
          <img src="/imgs/1.gif" className="gif" alt="" />
          <img src="/imgs/1.png" className="static" alt="" />
        </div>
        <div className="gif-wrap">
          <img src="/imgs/2.gif" className="gif" alt="" />
          <img src="/imgs/2.png" className="static" alt="" />
        </div>
        <div className="gif-wrap">
          <img src="/imgs/3.gif" className="gif" alt="" />
          <img src="/imgs/3.png" className="static" alt="" />
        </div>
        <div className="gif-wrap">
          <img src="/imgs/4.gif" className="gif" alt="" />
          <img src="/imgs/4.png" className="static" alt="" />
        </div>
        <div className="gif-wrap">
          <img src="/imgs/5.gif" className="gif" alt="" />
          <img src="/imgs/5.png" className="static" alt="" />
        </div>
        <div className="gif-wrap">
          <img src="/imgs/6.gif" className="gif" alt="" />
          <img src="/imgs/6.png" className="static" alt="" />
        </div>
      </div>
      <p>
        CC's daily routine:
        <br />
        nap in the sun , beg for a treat
        <br />
        curl up on your lap the second you sit down
        <br />
      </p>
    </div>
  );
};

export default LeftSide;
