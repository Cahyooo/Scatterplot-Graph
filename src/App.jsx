import "./index.css";
import Axis from "./Axis";
import { Circle } from "./Circle";
import { fetchAPI } from "./api";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const color = {
    doping: "#1F77B4",
    noDoping: "#FF7F0E",
  }

  useEffect(() => {
    fetchAPI((fetchedData) => setData(fetchedData));
  }, []);

  const width = 1000;
  const height = 650;

  return (
    <main className="w-[1000px] h-[700px] bg-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-2xl p-[10px]">
      <h1 id="title" className="text-center text-3xl">
        Doping in Professional Bicycle Racing 
      </h1>
      <h2 className="text-center text-xl">
      35 Fastest times up Alpe d'Huez
      </h2>
      <Axis heightSVG={height} widthSVG={width}>
        <Circle data={data} color={color} width={width - 70} height={height - 70} />
        <text x="762" y="333" className="text-[12px] text-end">No doping allegations</text>
        <rect x="890" y="320" width="18" height="18" fill={color.noDoping}></rect>
        <text x="720" y="358" className="text-[12px] text-end">Riders with doping allegations</text>
        <rect x="890" y="345" width="18" height="18" fill={color.doping}></rect>
      </Axis>
    </main>
  );
}

export default App;
