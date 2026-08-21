# 🚀 Deployment Guide

This guide will help you deploy the Task Management System to production using free cloud platforms.

## 📋 Prerequisites

- GitHub account (already have your repo there)
- MongoDB Atlas account (free tier)
- Render account (free tier for backend)
- Vercel account (free tier for frontend)

---

## 🗄️ Step 1: Set Up MongoDB Atlas

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new project

### 1.2 Create a Cluster
1. Click "Build a Database"
2. Choose "M0 Sandbox" (free tier)
3. Select a region closest to your users
4. Name your cluster (e.g., "taskmanager-cluster")
5. Click "Create"

### 1.3 Create Database User
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password Authentication"
4. Username: `taskmanager` (or your choice)
5. Password: Generate a strong password (save this!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### 1.4 Whitelist IP Addresses
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 1.5 Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select Node.js version
5. Copy the connection string
6. Replace `<password>` with your actual password
7. Save this connection string for later

**Example connection string:**
```
mongodb+srv://taskmanager:your_password@taskmanager-cluster.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
```

---

## 🔧 Step 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to [Render](https://render.com)
2. Sign up with GitHub

### 2.2 Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select `task-management-system` repository
4. Configure the service:

**Build & Deploy Settings:**
- **Root Directory:** `backend`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Environment Variables:**
- `PORT`: `5000`
- `MONGODB_URI`: (paste your MongoDB Atlas connection string)
- `JWT_SECRET`: (generate a strong random string)
- `NODE_ENV`: `production`

5. Click "Create Web Service"
6. Wait for deployment (2-3 minutes)
7. Copy the deployed URL (e.g., `https://taskmanager-backend.onrender.com`)

### 2.3 Test Backend
1. Open your deployed backend URL
2. Try accessing `https://your-backend-url.onrender.com/api/auth/me`
3. Should return: `{"success": false, "message": "No token provided"}`

---

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account
1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub

### 3.2 Update Frontend API URL
Before deploying, update the frontend to use the production backend URL:

**Option 1: Update vite.config.js**
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://your-backend-url.onrender.com',
        changeOrigin: true,
      }
    }
  }
})
```

**Option 2: Use environment variable (recommended)**

Create `frontend/.env.production`:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

Then update `frontend/src/context/AuthContext.jsx` to use:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

### 3.3 Deploy to Vercel
1. Click "Add New Project"
2. Import your GitHub repository
3. Configure the project:

**Framework Preset:** Vite
**Root Directory:** `frontend`
**Build Command:** `npm run build`
**Output Directory:** `dist`

4. Click "Deploy"
5. Wait for deployment (1-2 minutes)
6. Copy the deployed URL (e.g., `https://task-manager.vercel.app`)

---

## ✅ Step 4: Test the Deployed Application

1. Open your Vercel URL
2. Try signing up for a new account
3. Create some tasks
4. Test all features:
   - Task CRUD operations
   - Search and filtering
   - Pagination
   - Analytics dashboard
   - Dark mode toggle

---

## 🔐 Step 5: Security Best Practices

### 5.1 Environment Variables
- Never commit `.env` files to GitHub
- Use strong, random passwords
- Rotate secrets periodically
- Use different secrets for development and production

### 5.2 MongoDB Atlas
- Enable IP whitelisting (restrict to specific IPs if possible)
- Use strong database user passwords
- Enable MongoDB Atlas security features
- Monitor database access logs

### 5.3 Backend Security
- Keep dependencies updated (`npm audit fix`)
- Enable HTTPS (Render does this automatically)
- Implement rate limiting
- Add CORS restrictions
- Use helmet.js for security headers

---

## 📊 Step 6: Monitor and Maintain

### Render Dashboard
- Monitor backend logs
- Check resource usage
- Set up alerts for errors
- Review deployment history

### Vercel Dashboard
- Monitor frontend analytics
- Check build logs
- Review deployment history
- Set up custom domain (optional)

### MongoDB Atlas
- Monitor database performance
- Check storage usage
- Review slow queries
- Set up alerts

---

## 🐛 Troubleshooting

### Backend Issues

**Problem: Backend won't start**
- Check Render logs for errors
- Verify environment variables are set correctly
- Ensure MongoDB connection string is valid

**Problem: Database connection fails**
- Verify MongoDB Atlas IP whitelist
- Check database user credentials
- Ensure cluster is running

**Problem: API returns 500 errors**
- Check backend logs
- Verify all dependencies are installed
- Check for missing environment variables

### Frontend Issues

**Problem: Frontend can't connect to backend**
- Verify backend URL is correct
- Check CORS settings
- Ensure backend is running

**Problem: Build fails**
- Check Vercel build logs
- Verify all dependencies are in package.json
- Ensure build command is correct

**Problem: White screen after deployment**
- Check browser console for errors
- Verify build output directory
- Check for missing assets

---

## 🔄 Continuous Deployment

Both Render and Vercel support continuous deployment:

- **Render:** Automatically deploys when you push to GitHub main branch
- **Vercel:** Automatically deploys when you push to GitHub

To enable:
1. Connect your GitHub repository to both platforms
2. Set the main branch as the deployment branch
3. Push changes to trigger automatic deployments

---

## 📝 Post-Deployment Checklist

- [ ] Backend deployed successfully
- [ ] Frontend deployed successfully
- [ ] Database connection working
- [ ] All API endpoints tested
- [ ] Authentication working
- [ ] Task CRUD operations working
- [ ] Search and filtering working
- [ ] Analytics dashboard working
- [ ] Dark mode working
- [ ] Responsive design verified
- [ ] Environment variables secured
- [ ] Monitoring set up
- [ ] Error tracking configured

---

## 🎉 Congratulations!

Your Task Management System is now live! Share your deployed application with others and showcase your full-stack development skills.

**Your URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com`
- GitHub: `https://github.com/anushaazmeera006-create/task-management-system`

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [MERN Stack Deployment Guide](https://www.mongodb.com/mern-stack)

---

**Need help?** Check the platform documentation or create an issue on GitHub.
