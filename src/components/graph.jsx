import React from 'react';
import { connect } from 'react-redux';
import { pie, arc } from 'd3';

const sumOfVotes = (prev, next) => prev + next.votes;

const Graph = ({ votes }) => {
  const arcs = pie().value(d => {
    return d.votes;
  })(votes);

  const height = 200;
  const width = 200;
  const innerRadius = (width / 8);
  const outerRadius = (width / 2) - 10;

  return (
    <svg height={height} width={width}>
      {/* <circle cx={width / 2} cy={height / 2} r={outerRadius} /> */}
      {votes.reduce(sumOfVotes, 0) > 0
        ? arcs.map((data, i, arr) => {
          const d = arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);
          const style = {
            transform: `translate(${height / 2}px, ${width / 2}px)`
          };
          return (
            <path key={i} className={'pie-piece-' + (i + 1)} d={d(data)} style={style} title={votes[i].title}>
              <title>{votes[i].title}: {data.value}</title>
            </path>
          );
        })
        : <text x={width / 2} y={height / 2} style={{fill: '#444444', textAnchor: 'middle'}}>
            No data
        </text>
      }
    </svg>
  );
};

export default connect()(Graph);
