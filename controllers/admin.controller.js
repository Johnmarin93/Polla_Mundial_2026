import {
  getAdminStats,
  getUsers,
  updateUserRole,
  toggleUserStatus,
  getTopUsers,
  getRecentPredictions,
  getRecentResults,
} from "../services/admin.service.js";

export const getStats = async (req, res) => {
  try {
    const stats = await getAdminStats();

    res.json(stats);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const changeUserRole = async (req, res) => {
  try {
    const { id } = req.params;

    const { rol_id } = req.body;

    const updatedUser = await updateUserRole(id, rol_id);

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const { is_active } = req.body;

    const user = await toggleUserStatus(id, is_active);

    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const topUsers = async (req, res) => {
  try {
    const users = await getTopUsers();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const recentPredictions = async (req, res) => {
  try {
    const predictions = await getRecentPredictions();

    res.json(predictions);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const recentResults = async (req, res) => {
  try {
    const results = await getRecentResults();

    res.json(results);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
