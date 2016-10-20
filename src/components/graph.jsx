import React from 'react';
import { connect } from 'react-redux';
import { pie, arc } from 'd3';

const sumOfVotes = (prev, next) => prev + next.votes;

const Graph = ({ params, polls }) => {
  if (!polls) return <div>Loading...</div>;

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
    <div className="graph">
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
            .map((option, i) => {
              return (
                <tr key={i} className="legend-row">
                  <td className="legend-cell">
                    <div className={`legend-square pie-piece-${(i + 1)}`} />
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
