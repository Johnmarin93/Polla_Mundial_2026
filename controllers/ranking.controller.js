import { getRanking } from "../services/ranking.service.js";

export const ranking = async (req, res) => {
  try {
    const data = await getRanking();

    res.json(data);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Error obteniendo ranking",
    });
  }
};
