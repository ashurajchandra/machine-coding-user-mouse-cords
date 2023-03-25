import { useState } from "react";
import "./App.css";

function App() {
  const [mouseCordinates, setMouseCordinates] = useState([]);
  const [popPoint, setPopPoint] = useState([]);

  const handleClick = (e) => {
    const { clientX, clientY } = e;
    setMouseCordinates([...mouseCordinates, { x: clientX, y: clientY }]);
  };

  const handleUndo = () => {
    const cords = [...mouseCordinates];
    const poppedPoint = cords.pop();

    if (!poppedPoint) {
      return;
    }
    setPopPoint([...popPoint, poppedPoint]);
    setMouseCordinates(cords);
  };

  const handleRedo = () => {
    const points = [...mouseCordinates];
    const prevPopPoints = [...popPoint];
    const redoPopPoint = prevPopPoints.pop();
    if (!redoPopPoint) return;
    setPopPoint(prevPopPoints);
    setMouseCordinates([...mouseCordinates, redoPopPoint]);
  };

  return (
    <>
      <button
        disabled={popPoint.length === 0}
        style={{ cursor: popPoint.length > 0 ? "pointer" : "not-allowed" }}
        className='redo'
        onClick={handleRedo}>
        Redo
      </button>
      <button
        disabled={mouseCordinates.length === 0}
        style={{
          cursor: mouseCordinates.length > 0 ? "pointer" : "not-allowed",
        }}
        className='undo'
        onClick={handleUndo}>
        Undo
      </button>

      <div className='App' onClick={handleClick}>
        {mouseCordinates.length > 0 &&
          mouseCordinates.map((point, index) => (
            <div
              className='point'
              key={index}
              style={{
                left: `${point.x - 10}px`,
                top: `${point.y - 10}px`,
              }}></div>
          ))}
      </div>
    </>
  );
}

export default App;
