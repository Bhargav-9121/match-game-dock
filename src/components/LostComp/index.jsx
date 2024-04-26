import "./index.css";

const LostComp = (props) => {
  const { score, reset } = props;
  return (
    <div className="winLoseCard">
      <img
        className="trophyImg"
        src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
        alt="trophy"
      />
      <p className="yourScorePara">YOUR SCORE</p>
      <p className="pointsPara">{score}</p>
      <button className="playAgainBtn" onClick={() => reset()} type="button">
        <img
          className="resetImg"
          src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
          alt="reset"
        />
        Play Again
      </button>
    </div>
  );
};

export default LostComp;
