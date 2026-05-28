export const calculatePoints = (
  prediction,

  match,
) => {
  const exactScore =
    prediction.predicted_home_score === match.home_score &&
    prediction.predicted_away_score === match.away_score;

  if (exactScore) {
    return 3;
  }

  const realWinner =
    match.home_score > match.away_score
      ? "home"
      : match.home_score < match.away_score
        ? "away"
        : "draw";

  const predictedWinner =
    prediction.predicted_home_score > prediction.predicted_away_score
      ? "home"
      : prediction.predicted_home_score < prediction.predicted_away_score
        ? "away"
        : "draw";

  if (realWinner === predictedWinner) {
    return 1;
  }

  return 0;
};
