/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

const PlayerTips = ({ hitsByPlayer, surrenderFn, playerName, turn }) => {
  const numberOfHits = hitsByPlayer.length;
  const numberOfSuccessfulHits = hitsByPlayer.filter(
    (hit) => hit.type === 'hit'
  ).length;

  const accuracyScore = Math.round(
    100 * (numberOfSuccessfulHits / numberOfHits)
  );

  const tipsPanel = (
    <div>
      <div className="tip-box-title">Stats</div>
      <div id="firing-info">
        <ul>
          <li>{numberOfSuccessfulHits} successful hits</li>
          <li>{accuracyScore > 0 ? `${accuracyScore}%` : `0%`} accuracy </li>
        </ul>
        <p className="player-tip">
          The first to sink all 5 opponent ships wins.
        </p>
        <p className="player-tip">
          Turn: {turn === 'player-turn' ? playerName : 'Computer'}
        </p>
        <p className="restart" onClick={surrenderFn}>
          Surrender
        </p>
      </div>
    </div>
  );

  return <div id="player-tips">{tipsPanel}</div>;
};

PlayerTips.propTypes = {
  hitsByPlayer: PropTypes.array.isRequired,
  surrenderFn: PropTypes.func.isRequired,
  playerName: PropTypes.string.isRequired,
  turn: PropTypes.string.isRequired,
};
export default PlayerTips;
