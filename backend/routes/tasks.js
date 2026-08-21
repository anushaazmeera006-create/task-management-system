const express = require('express');
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const protect = require('../middleware/auth');

const router = express.Router();

// Priority order for sorting
const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };

// @route   GET /api/tasks
// @desc    Get all tasks for logged-in user with filtering, search, pagination, and sorting
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const {
      status,
      priority,
      search,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = { user: req.user.id };

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by priority
    if (priority) {
      query.priority = priority;
    }

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build sort object
    let sortObj = {};
    if (sortBy === 'priority') {
      sortObj.priority = sortOrder === 'asc' ? 1 : -1;
    } else if (sortBy === 'dueDate') {
      sortObj.dueDate = sortOrder === 'asc' ? 1 : -1;
    } else {
      sortObj[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }

    // Execute query with pagination
    const tasks = await Task.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum);

    // Get total count for pagination
    const total = await Task.countDocuments(query);

    res.json({
      success: true,
      tasks,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalTasks: total,
        hasNextPage: pageNum < Math.ceil(total / limitNum),
        hasPrevPage: pageNum > 1
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

// @route   GET /api/tasks/:id
// @desc    Get single task
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.json({
      success: true,
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', protect, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('status').optional().isIn(['Todo', 'In Progress', 'Done']).withMessage('Invalid status'),
  body('priority').optional().isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      status: status || 'Todo',
      priority: priority || 'Medium',
      dueDate: dueDate || null,
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', protect, [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('status').optional().isIn(['Todo', 'In Progress', 'Done']).withMessage('Invalid status'),
  body('priority').optional().isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { title, description, status, priority, dueDate } = req.body;

    let task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Update fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;

    await task.save();

    res.json({
      success: true,
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PATCH /api/tasks/:id/complete
// @desc    Mark task as completed
// @access  Private
router.patch('/:id/complete', protect, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    task.status = 'Done';
    await task.save();

    res.json({
      success: true,
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.json({
      success: true,
      message: 'Task deleted successfully'
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
