import { useState, useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef();
  const inputRef = useRef();
  const [drawing, setDrawing] = useState(false);
  
  const drawGuideText = (text) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.font = "30px Arial";
    ctx.fillStyle = "lightgray";
    ctx.fillText(text, 50, 100);
  };

  const handleInput = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGuideText(e.target.value);
  };

  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  };

  const startDrawing = (e) => {
    setDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  };

  const endDrawing = () => {
    setDrawing(false);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 현재 캔버스를 임시 캔버스에 복사합니다.
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.drawImage(canvas, 0, 0);

    // 입력한 글자를 지웁니다.
    const guideText = inputRef.current.value;
    tempCtx.save();
    tempCtx.globalCompositeOperation = "destination-out";
    tempCtx.fillStyle = 'rgba(255, 255, 255, 1)';
    tempCtx.font = '30px Arial';
    tempCtx.fillText(guideText, 50, 100);
    tempCtx.restore();

    // 다운로드 링크를 생성합니다.
    const link = document.createElement("a");
    link.href = tempCanvas.toDataURL("image/png");
    link.download = "canvasImage.png";
    link.click();
  };

  return (
    <div>
      <canvas
        id="myCanvas"
        ref={canvasRef}
        width="500"
        height="500"
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
      ></canvas>
      <input
        id="inputText"
        type="text"
        ref={inputRef}
        placeholder="여기에 글자를 입력하세요."
        onChange={handleInput}
      />
      <button onClick={saveCanvas}>다운로드</button>
    </div>
  );
}