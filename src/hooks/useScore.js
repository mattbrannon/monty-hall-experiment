const initialScore = { wins: 0, losses: 0, total: 0 };

export const getScore = (initialScore) => {
  let score = { ...initialScore };
  return function (playerWins) {
    if (playerWins !== null) {
      score.wins = playerWins ? score.wins + 1 : score.wins;
      score.losses = playerWins ? score.losses : score.losses + 1;
      score.total += 1;
    }
    return score;
  };
};

export const useScore = getScore(initialScore);
