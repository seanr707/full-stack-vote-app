import React from 'react';
import { connect } from 'react-redux';
import { pie, arc } from 'd3';

const sumOfVotes = (prev, next) => prev + next.votes;

// Keeps color change of chart gradual
const makeColorForGraph = (index, total) => {
  const increment = Math.floor(255 / total);
  return `rgba(${index * increment}, 110, 200, 0.8)`;
};

const Graph = ({ params, polls }) => {
  const votes = polls
    .find(poll => poll._id === params.pollId).options;

  const arcs = pie().value(d => {
    return d.votes;
  })(votes);

  const height = 200;
  const width = 200;
  const innerRadius = (width / 8);
  const outerRadius = (width / 2) - 10;

  return (
    <div className="poll-info graph">
      <svg height={height} width={width}>
        {/* <circle cx={width / 2} cy={height / 2} r={outerRadius} /> */}
        {votes.reduce(sumOfVotes, 0) > 0
          ? arcs.map((data, i, arr) => {
            const d = arc()
              .innerRadius(innerRadius)
              .outerRadius(outerRadius);
            const fill = {
              transform: `translate(${height / 2}px, ${width / 2}px)`,
              fill: makeColorForGraph(i, arr.length)
            };
            return (
              <path key={i} className="pie-piece" d={d(data)} style={fill}>
                <title>{votes[i].title}: {data.value}</title>
              </path>
            );
          })
          : <text x={width / 2} y={height / 2} style={{fill: '#444444', textAnchor: 'middle'}}>
              No data
          </text>
        }
      </svg>
      <table className="legend">
        <thead>
          <tr>
            <th />
            <th>Option</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {votes
            .map((option, i, arr) => {
              const squareColor = {
                background: makeColorForGraph(i, arr.length)
              };
              return (
                <tr key={i} className="legend-row">
                  <td className="legend-cell">
                    <div style={squareColor} className="legend-square pie-piece" />
                  </td>
                  <td className="legend-cell legend-title">
                    {option.title}
                  </td>
                  <td className="legend-cell">
                    {option.votes}
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    polls: state.reducer.get('polls')
  };
};

export default connect(mapStateToProps)(Graph);
