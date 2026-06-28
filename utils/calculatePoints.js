export const calculatePoints = (prediction, match) => {
  const predictedHome = prediction.predicted_home_score;
  const predictedAway = prediction.predicted_away_score;

  const realHome = match.home_score;
  const realAway = match.away_score;

  // 5 puntos → marcador exacto
  if (predictedHome === realHome && predictedAway === realAway) {
    return 10;
  }

  const realWinner =
    realHome > realAway ? "home" : realHome < realAway ? "away" : "draw";

  const predictedWinner =
    predictedHome > predictedAway
      ? "home"
      : predictedHome < predictedAway
        ? "away"
        : "draw";

  // Empate no exacto = 2 puntos
  if (realWinner === "draw" && predictedWinner === "draw") {
    return 4;
  }

  const realDifference = realHome - realAway;

  const predictedDifference = predictedHome - predictedAway;

  // 3 puntos → ganador + diferencia exacta
  if (
    realWinner === predictedWinner &&
    realDifference === predictedDifference
  ) {
    return 6;
  }

  // 2 puntos → solo ganador
  if (realWinner === predictedWinner) {
    return 4;
  }

  // 0 puntos
  return 0;
};
