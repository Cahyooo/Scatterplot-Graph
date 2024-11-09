  import React, { useEffect, useRef, useState } from "react";
  import * as d3 from "d3";
  import { fetchAPI } from "./api.jsx";

  const Axis = ({ scale, orient, transform, id }) => {
    const axisRef = useRef();

    useEffect(() => {
      if (scale) {
        const axisGenerator =
          orient === "bottom"
            ? d3.axisBottom(scale)
            : d3
                .axisLeft(scale)
                .ticks(d3.timeSecond.every(15))
                .tickFormat(d3.timeFormat("%M:%S"));
        d3.select(axisRef.current).call(axisGenerator);
      }
    }, [scale, orient]);

    return <g id={id} ref={axisRef} transform={transform} />;
  };

  const BarAxis = ({ heightSVG, widthSVG, children }) => {
    const width = widthSVG;
    const height = heightSVG;
    const margin = { top: 20, right: 30, bottom: 50, left: 40 };
    const [data, setData] = useState([]);

    useEffect(() => {
      fetchAPI((fetchedData) => {
        const parsedData = fetchedData.map((d) => ({
          ...d,
          Time: d3.timeParse("%M:%S")(d.Time),
        }));
        setData(parsedData);
      });
    }, []);

    console.log(data);
    

    const xAxisMin = d3.min(data, (d) => d.Year);
    const xAxisMax = d3.max(data, (d) => d.Year);
    const yAxisMin = d3.min(data, (d) => d.Time);
    const yAxisMax = d3.max(data, (d) => d.Time);

    const xScale = d3
      .scaleTime()
      .domain([new Date(xAxisMin, 0, 1), new Date(xAxisMax, 11, 31)])
      .range([0, width - margin.left - margin.right]);

    const yScale = d3
      .scaleTime()
      .domain([yAxisMax, yAxisMin])
      .range([height - margin.top - margin.bottom, 0]);

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <Axis
            id="x-axis"
            scale={xScale}
            orient="bottom"
            transform={`translate(0,${height - margin.top - margin.bottom})`}
          />
          {children}
          <Axis
            id="y-axis"
            scale={yScale}
            orient="left"
            transform="translate(0,0)"
          />
        </g>
      </svg>
    );
  };

  export default BarAxis;
