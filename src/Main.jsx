import React, { useState } from "react";
import "./Main.css";

function Main() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [workingCards, setWorkingCards] = useState([]);
  const [completedCards, setCompletedCards] = useState([]);

  const handleAddCard = () => {
    if (title && content) {
      const newCard = { title, content };
      setWorkingCards([...workingCards, newCard]);
      setTitle("");
      setContent("");
    }
  };

  const handleDeleteCard = (index, isWorking) => {
    if (isWorking) {
      const updatedCard = [...workingCards];
      updatedCard.splice(index, 1);
      setWorkingCards(updatedCard);
    }
  };

  const handleCompleteCard = (index) => {
    const completedCard = workingCards[index];
    handleDeleteCard(index, true);
    setCompletedCards([...completedCards, completedCard]);
  };

  const handleDeleteCompletedCard = (index, isWorking) => {
    if (isWorking) {
      const completedCard = [...completedCards];
      completedCard.splice(index, 1);
      setCompletedCards(completedCard);
    }
  };

  const handleWorkingCard = (index) => {
    const workingCard = completedCards[index];
    handleDeleteCompletedCard(index, true);
    setWorkingCards([...workingCards, workingCard]);
  };

  return (
    <div>
      <div className="inputBox">
        <span className="inputBoxContent">
          제목 :{" "}
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          내용 :{" "}
          <input
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </span>
        <span className="inputBoxButton">
          <button className="button" onClick={handleAddCard}>
            추가하기
          </button>
        </span>
      </div>
      <div>
        <h2>Working..</h2>
        {workingCards.map(function (card, index) {
          return (
            <div className="makeCard">
              <div key={index} className="card">
                <h3>{card.title}</h3>
                <p>{card.content}</p>
                <button onClick={() => handleDeleteCard(index, true)}>
                  삭제하기
                </button>
                <button onClick={() => handleCompleteCard(index)}>완료</button>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <h2>Done</h2>
        {completedCards.map((card, index) => {
          return (
            <div className="makeCard">
              <div key={index} className="card">
                <h3>{card.title}</h3>
                <p>{card.content}</p>
                <button onClick={() => handleDeleteCompletedCard(index, true)}>
                  삭제하기
                </button>
                <button onClick={() => handleWorkingCard(index)}>취소</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Main;
