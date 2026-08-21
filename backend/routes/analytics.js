const express = require('express');
const Task = require('../models/Task');
const protect = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/analytics
// @desc    Get task analytics for logged-in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get total tasks
    const totalTasks = await Task.countDocuments({ user: userId });

    // Get completed tasks
    const completedTasks = await Task.countDocuments({ 
      user: userId, 
      status: 'Done' 
    });

    // Get pending tasks (Todo + In Progress)
    const pendingTasks = await Task.countDocuments({ 
      user: userId, 
      status: { $in: ['Todo', 'In Progress'] } 
    });

    // Get tasks by status
    const tasksByStatus = await Task.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Get tasks by priority
    const tasksByPriority = await Task.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    // Calculate completion percentage
    const completionPercentage = totalTasks > 0 
      ? Math.round((completedTasks / totalTasks) * 100) 
      : 0;

    res.json({
      success: true,
      analytics: {
        totalTasks,
        completedTasks,
        pendingTasks,
        completionPercentage,
        tasksByStatus: tasksByStatus.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        tasksByPriority: tasksByPriority.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
