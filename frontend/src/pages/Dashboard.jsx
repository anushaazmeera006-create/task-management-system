import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import axios from 'axios'
import { Plus, Search, Filter, LogOut, Moon, Sun, CheckCircle, Clock, AlertCircle, MoreVertical, Edit, Trash2 } from 'lucide-react'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const [tasks, setTasks] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterPriority, setFilterPriority] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Todo',
    priority: 'Medium',
    dueDate: ''
  })

  useEffect(() => {
    fetchTasks()
    fetchAnalytics()
  }, [searchTerm, filterStatus, filterPriority, sortBy, sortOrder, currentPage])

  const fetchTasks = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        sortBy,
        sortOrder
      })
      if (searchTerm) params.append('search', searchTerm)
      if (filterStatus) params.append('status', filterStatus)
      if (filterPriority) params.append('priority', filterPriority)

      const token = localStorage.getItem('token')
      const response = await axios.get(`/api/tasks?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTasks(response.data.tasks)
      setPagination(response.data.pagination)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('/api/analytics', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAnalytics(response.data.analytics)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    
    try {
      if (editingTask) {
        await axios.put(`/api/tasks/${editingTask._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        await axios.post('/api/tasks', formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      setShowModal(false)
      setEditingTask(null)
      setFormData({ title: '', description: '', status: 'Todo', priority: 'Medium', dueDate: '' })
      fetchTasks()
      fetchAnalytics()
    } catch (error) {
      console.error('Error saving task:', error)
    }
  }

  const handleEdit = (task) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
    })
    setShowModal(true)
  }

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return
    
    const token = localStorage.getItem('token')
    try {
      await axios.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchTasks()
      fetchAnalytics()
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const handleComplete = async (taskId) => {
    const token = localStorage.getItem('token')
    try {
      await axios.patch(`/api/tasks/${taskId}/complete`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchTasks()
      fetchAnalytics()
    } catch (error) {
      console.error('Error completing task:', error)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Done': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'In Progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'Medium': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950 dark:to-violet-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-violet-950' : 'bg-gradient-to-br from-violet-50 to-violet-100'}`}>
      <nav className={`shadow-lg ${darkMode ? 'bg-violet-900' : 'bg-white'}`}>
        <div className="w-[95%] mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className={`text-7xl font-bold ${darkMode ? 'text-white' : 'text-violet-900'}`}>Task Manager</h1>
          <div className="flex items-center gap-4">
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-violet-100 dark:hover:bg-violet-800 transition">
              {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-violet-600" />}
            </button>
            <span className={`font-semibold text-2xl ${darkMode ? 'text-violet-200' : 'text-gray-700'}`}>{user?.name}</span>
            <button onClick={logout}              className={`flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg transition text-2xl`}>
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="w-[95%] mx-auto px-4 py-8">
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-violet-900' : 'bg-white'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-2xl font-medium ${darkMode ? 'text-violet-300' : 'text-gray-600'}`}>Total Tasks</p>
                  <p className={`text-7xl font-bold ${darkMode ? 'text-white' : 'text-violet-900'}`}>{analytics.totalTasks}</p>
                </div>
                <CheckCircle className="text-violet-600" size={32} />
              </div>
            </div>
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-violet-900' : 'bg-white'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-2xl font-medium ${darkMode ? 'text-violet-300' : 'text-gray-600'}`}>Completed</p>
                  <p className={`text-7xl font-bold ${darkMode ? 'text-white' : 'text-violet-900'}`}>{analytics.completedTasks}</p>
                </div>
                <CheckCircle className="text-green-600" size={32} />
              </div>
            </div>
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-violet-900' : 'bg-white'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-2xl font-medium ${darkMode ? 'text-violet-300' : 'text-gray-600'}`}>Pending</p>
                  <p className={`text-7xl font-bold ${darkMode ? 'text-white' : 'text-violet-900'}`}>{analytics.pendingTasks}</p>
                </div>
                <Clock className="text-orange-600" size={32} />
              </div>
            </div>
            <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-violet-900' : 'bg-white'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-2xl font-medium ${darkMode ? 'text-violet-300' : 'text-gray-600'}`}>Completion</p>
                  <p className={`text-7xl font-bold ${darkMode ? 'text-white' : 'text-violet-900'}`}>{analytics.completionPercentage}%</p>
                </div>
                <AlertCircle className="text-violet-600" size={32} />
              </div>
            </div>
          </div>
        )}

        <div className={`p-6 rounded-xl shadow-lg mb-6 ${darkMode ? 'bg-violet-900' : 'bg-white'}`}>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-4 rounded-lg border focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition text-2xl ${darkMode ? 'bg-violet-800 border-violet-700 text-white' : 'bg-gray-50 border-gray-300'}`}
              />
            </div>
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`px-5 py-4 rounded-lg border focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition text-2xl ${darkMode ? 'bg-violet-800 border-violet-700 text-white' : 'bg-gray-50 border-gray-300'}`}
              >
                <option value="">All Status</option>
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className={`px-5 py-4 rounded-lg border focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition text-2xl ${darkMode ? 'bg-violet-800 border-violet-700 text-white' : 'bg-gray-50 border-gray-300'}`}
              >
                <option value="">All Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [sort, order] = e.target.value.split('-')
                  setSortBy(sort)
                  setSortOrder(order)
                }}
                className={`px-5 py-4 rounded-lg border focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition text-2xl ${darkMode ? 'bg-violet-800 border-violet-700 text-white' : 'bg-gray-50 border-gray-300'}`}
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="dueDate-asc">Due Date (Earliest)</option>
                <option value="dueDate-desc">Due Date (Latest)</option>
                <option value="priority-desc">Priority (High to Low)</option>
                <option value="priority-asc">Priority (Low to High)</option>
              </select>
            </div>
            <button
              onClick={() => {
                setEditingTask(null)
                setFormData({ title: '', description: '', status: 'Todo', priority: 'Medium', dueDate: '' })
                setShowModal(true)
              }}
              className="flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg transition text-2xl"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </div>

        <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-violet-900' : 'bg-white'}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`border-b ${darkMode ? 'border-violet-700' : 'border-gray-200'}`}>
                <tr>
                  <th className={`px-6 py-4 text-left text-2xl font-semibold ${darkMode ? 'text-violet-200' : 'text-gray-700'}`}>Title</th>
                  <th className={`px-6 py-4 text-left text-2xl font-semibold ${darkMode ? 'text-violet-200' : 'text-gray-700'}`}>Status</th>
                  <th className={`px-6 py-4 text-left text-2xl font-semibold ${darkMode ? 'text-violet-200' : 'text-gray-700'}`}>Priority</th>
                  <th className={`px-6 py-4 text-left text-2xl font-semibold ${darkMode ? 'text-violet-200' : 'text-gray-700'}`}>Due Date</th>
                  <th className={`px-6 py-4 text-left text-2xl font-semibold ${darkMode ? 'text-violet-200' : 'text-gray-700'}`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id} className={`border-b ${darkMode ? 'border-violet-700 hover:bg-violet-800' : 'border-gray-100 hover:bg-gray-50'} transition`}>
                    <td className="px-6 py-4">
                      <div>
                        <p className={`font-semibold text-2xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>{task.title}</p>
                        <p className={`text-2xl ${darkMode ? 'text-violet-300' : 'text-gray-500'}`}>{task.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-4 py-2 rounded-full text-xl font-semibold ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-4 py-2 rounded-full text-xl font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-2xl ${darkMode ? 'text-violet-200' : 'text-gray-600'}`}>
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {task.status !== 'Done' && (
                          <button
                            onClick={() => handleComplete(task._id)}
                            className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900 rounded-lg transition"
                            title="Mark as complete"
                          >
                            <CheckCircle size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => handleEdit(task)}
                          className="p-2 text-violet-600 hover:bg-violet-100 dark:hover:bg-violet-800 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {tasks.length === 0 && (
                  <tr>
                    <td colSpan="5" className={`px-6 py-12 text-center ${darkMode ? 'text-violet-300' : 'text-gray-500'}`}>
                      No tasks found. Create one to get started!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className={`px-6 py-4 border-t ${darkMode ? 'border-violet-700' : 'border-gray-200'} flex justify-between items-center`}>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={!pagination.hasPrevPage}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-2xl"
              >
                Previous
              </button>
              <span className={`text-2xl ${darkMode ? 'text-violet-200' : 'text-gray-600'}`}>
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={!pagination.hasNextPage}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-2xl"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`max-w-lg w-full p-6 rounded-2xl shadow-xl ${darkMode ? 'bg-violet-900' : 'bg-white'}`}>
            <h2 className={`text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-violet-900'}`}>
              {editingTask ? 'Edit Task' : 'Create New Task'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-2xl font-medium mb-2 ${darkMode ? 'text-violet-200' : 'text-gray-700'}`}>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full px-4 py-4 rounded-lg border focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition text-2xl ${darkMode ? 'bg-violet-800 border-violet-700 text-white' : 'bg-gray-50 border-gray-300'}`}
                  required
                />
              </div>
              <div>
                <label className={`block text-2xl font-medium mb-2 ${darkMode ? 'text-violet-200' : 'text-gray-700'}`}>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full px-4 py-4 rounded-lg border focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition text-2xl ${darkMode ? 'bg-violet-800 border-violet-700 text-white' : 'bg-gray-50 border-gray-300'}`}
                  rows="3"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-2xl font-medium mb-2 ${darkMode ? 'text-violet-200' : 'text-gray-700'}`}>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className={`w-full px-4 py-4 rounded-lg border focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition text-2xl ${darkMode ? 'bg-violet-800 border-violet-700 text-white' : 'bg-gray-50 border-gray-300'}`}
                  >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-2xl font-medium mb-2 ${darkMode ? 'text-violet-200' : 'text-gray-700'}`}>Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className={`w-full px-4 py-4 rounded-lg border focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition text-2xl ${darkMode ? 'bg-violet-800 border-violet-700 text-white' : 'bg-gray-50 border-gray-300'}`}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={`block text-2xl font-medium mb-2 ${darkMode ? 'text-violet-200' : 'text-gray-700'}`}>Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className={`w-full px-4 py-4 rounded-lg border focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition text-2xl ${darkMode ? 'bg-violet-800 border-violet-700 text-white' : 'bg-gray-50 border-gray-300'}`}
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingTask(null)
                    setFormData({ title: '', description: '', status: 'Todo', priority: 'Medium', dueDate: '' })
                  }}
                  className={`flex-1 px-6 py-4 border border-violet-600 text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-800 rounded-lg transition text-2xl font-semibold`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition text-2xl font-semibold"
                >
                  {editingTask ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
