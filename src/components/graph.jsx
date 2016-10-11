import React from 'react';
import { connect } from 'react-redux';
import { pie, arc } from 'd3';

const getColor = (index, length) => {
  const color = Math.floor(255 / length) * index;

  return {
    red: 255,
    green: color,
    blue: 50,
    alpha: 1
  };
};

const Graph = ({ votes }) => {
  const arcs = pie().value(d => {
    return d.votes;
  })(votes);

  const height = 300;
  const width = 300;
  const radius = (width / 2) - 10;

  return (
    <svg height={height} width={width}>
      <circle cx={width / 2} cy={height / 2} r={radius} fill="black" />
      {arcs.map((data, i, arr) => {
        const rgba = getColor(i, arr.length);
        const d = arc()
          .innerRadius(0)
          .outerRadius(radius);
        const style = {
          transform: `translate(${height / 2}px, ${width / 2}px)`,
          strokeWidth: '1px',
          stroke: 'black',
          fill: `rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, ${rgba.alpha})`,
          transition: 'all 1s ease'
        };
        return (
          <path d={d(data)} style={style} title={votes[i].title} />
        );
      })}
    </svg>
  );
};

export default connect()(Graph);
