import * as d3 from "d3";
import { useState } from "react";

export const Circle = ({ data, color, width, height }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [infoPosition, setInfoPosition] = useState({ x: 0, y: 0 });
  const [dataForHover, setDataForHover] = useState();

  const handleMouseEnter = (x, y, d) => {
    setIsHovered(true);
    // Mengatur posisi kotak kecil berdasarkan posisi lingkaran (event.x, event.y)
    setInfoPosition({ x: x + 10, y: y + 10 }); // Memberikan offset agar tidak menutupi lingkaran
    setDataForHover(d);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const timeToSeconds = (time) => {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const minYear = d3.min(data, (d) => d.Year);
  const maxYear = d3.max(data, (d) => d.Year);
  const minTime = d3.min(data, (d) => timeToSeconds(d.Time));
  const maxTime = d3.max(data, (d) => timeToSeconds(d.Time));

  const yearDiferrence = maxYear - minYear;
  const timeDifference = maxTime - minTime;

  return data.map((d, i) => {
    const xFormula = ((d.Year - minYear) / yearDiferrence) * width;

    const timeInSeconds = timeToSeconds(d.Time);
    const yFormula = ((timeInSeconds - minTime) / timeDifference) * height;

    return (
      <>
        <circle
          className="bar"
          key={i}
          cx={xFormula}
          cy={yFormula}
          r={7}
          fill={d.Doping ? color.doping : color.noDoping}
          onMouseEnter={() => handleMouseEnter(xFormula, yFormula, d)}
          onMouseLeave={handleMouseLeave}
        />

        {isHovered && (
          <g transform={`translate(${infoPosition.x}, ${infoPosition.y})`}>
            <rect width={dataForHover.Doping ? `${dataForHover.Doping.length * 6}px` : "200px"} height={dataForHover.Doping ? "70px" : "50px"} fill="lightgray" stroke="black" />
            <text x="10" y="20" fill="black" fontSize="14px">
              {dataForHover.Name} : {dataForHover.Nationality}
              <tspan x="10" dy="20">{`Year: ${dataForHover.Year}`}, {`Time: ${dataForHover.Time}`}</tspan>
              <tspan fontSize="12px" x="10" dy="20">{dataForHover.Doping}</tspan>
            </text>
          </g>
        )}
      </>
    );
  });
};
