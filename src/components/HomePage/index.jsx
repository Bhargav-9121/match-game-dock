import { useState, useEffect } from "react";
import LostComp from "../LostComp";
import "./index.css";

const HomePage = (props) => {
  const { tabsList, imagesList } = props;

  const [imgList, changeList] = useState(
    imagesList.filter((each) => each.category === "FRUIT")
  );
  const [timer, changeTimer] = useState(60);
  const [lost, changeLost] = useState(false);
  const [randomImg, changeRandomImg] = useState(imagesList[0].imageUrl);
  const [score, changeScore] = useState(0);
  const [activeTab, changeActiveTab] = useState(tabsList[0].tabId);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      changeTimer((prev) => (prev > 0 ? prev - 1 : changeLost(true)));
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [timer, lost]);

  const tabChange = (tabId) => {
    changeList(imagesList.filter((each) => each.category === tabId));
    changeActiveTab(tabId);
  };

  const reset = () => {
    changeList(imagesList.filter((each) => each.category === "FRUIT"));
    changeTimer(60);
    changeLost(false);
    changeRandomImg(imagesList[0].imageUrl);
    changeScore(0);
    changeActiveTab(tabsList[0].tabId);
  };

  const handleClick = (imgUrl) => {
    if (imgUrl === randomImg) {
      changeScore((prev) => prev + 1);
      changeRandomImg(
        imagesList[Math.floor(Math.random() * imagesList.length)].imageUrl
      );
    } else {
      changeLost(true);
    }
  };

  return (
    <>
      <nav>
        <img
          className="logoImg"
          src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
          alt="website logo"
        />

        <div className="navDiv">
          <p className="scorePara">
            Score: <span>{score}</span>
          </p>

          <img
            className="timerImg"
            src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
            alt="timer"
          />

          {lost ? (
            <p className="secPara">0 sec</p>
          ) : (
            <p className="secPara">{timer} sec</p>
          )}
        </div>
      </nav>

      <div className="bgThing">
        {lost ? (
          <LostComp reset={reset} score={score} />
        ) : (
          <>
            <img className="matchImg" src={randomImg} alt="match" />
            <ul className="tabsUl">
              {tabsList.map((each) => (
                <li
                  className={activeTab === each.tabId ? "active" : ""}
                  onClick={() => tabChange(each.tabId)}
                  key={each.tabId}
                >
                  {each.displayText}
                </li>
              ))}
            </ul>

            <ul className="thumbUl">
              {imgList.map((each) => (
                <li onClick={() => handleClick(each.imageUrl)} key={each.id}>
                  <img
                    className="thumbImg"
                    src={each.thumbnailUrl}
                    alt="thumbnail"
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
