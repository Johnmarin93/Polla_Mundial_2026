export const calculatePoints = (prediction, match) => {
  const predictedHome = prediction.predicted_home_score;
  const predictedAway = prediction.predicted_away_score;

  const realHome = match.home_score;
  const realAway = match.away_score;

  // 5 puntos → Marcador exacto
  if (predictedHome === realHome && predictedAway === realAway) {
    return 5;
  }

  const realWinner =
    realHome > realAway ? "home" : realHome < realAway ? "away" : "draw";

  const predictedWinner =
    predictedHome > predictedAway
      ? "home"
      : predictedHome < predictedAway
        ? "away"
        : "draw";

  const realDifference = realHome - realAway;

  const predictedDifference = predictedHome - predictedAway;

  // 3 puntos → ganador + diferencia exacta
  if (
    realWinner === predictedWinner &&
    realDifference === predictedDifference
  ) {
    return 3;
  }

  // 2 puntos → solo tendencia
  if (realWinner === predictedWinner) {
    return 2;
  }

  // 0 puntos → error total
  return 0;
};
