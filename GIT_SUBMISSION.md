# 📦 Git Submission Guide — Team Anti Coders

Step-by-step instructions for pushing the project to GitHub.

---

## Step 1: Initialize Git Repository

Open a terminal in the project root (`TEAM_ANTI_CODERS/`) and run:

```bash
git init
git add .
git commit -m "Initial commit: Team Anti Coders - Team Management App"
```

---

## Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Sign in to your account
3. Click the **"+"** button → **"New Repository"**
4. Fill in the details:
   - **Repository name:** `TEAM_ANTI_CODERS`
   - **Description:** `Student Team Members Management Application - Full Stack (React + Node.js + MongoDB)`
   - **Visibility:** ✅ Public
   - ❌ Do NOT check "Add a README file" (we already have one)
   - ❌ Do NOT check "Add .gitignore" (we already have one)
5. Click **"Create repository"**

---

## Step 3: Link Local Repo to GitHub

```bash
git remote add origin https://github.com/YOUR-USERNAME/TEAM_ANTI_CODERS.git
git branch -M main
git push -u origin main
```

> Replace `YOUR-USERNAME` with your actual GitHub username.

---

## Step 4: Verify Submission

After pushing, verify the following on your GitHub repository page:

- [ ] All source code files are visible
- [ ] `node_modules/` is **NOT** uploaded (check .gitignore is working)
- [ ] `.env` is **NOT** uploaded
- [ ] `README.md` renders correctly on the repo homepage
- [ ] Both `backend/` and `frontend/` folders are present
- [ ] `uploads/` folder has only `.gitkeep`

---

## Step 5: Submit

1. Copy your GitHub repository URL
2. Submit the link through the Google Form
3. Verify submission before the deadline

> **⏰ Deadline: 1st May 2025, 12:00 PM**

---

## 🔧 Troubleshooting Common Git Errors

### Error: "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/TEAM_ANTI_CODERS.git
```

### Error: "failed to push some refs"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Error: "Permission denied (publickey)"
- Use HTTPS URL instead of SSH
- Or set up SSH keys: [GitHub SSH Guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

### Error: Large file warning
Make sure `node_modules/` and uploaded images are in `.gitignore`.

If you accidentally committed `node_modules/`:
```bash
git rm -r --cached node_modules
git commit -m "Remove node_modules from tracking"
git push
```

### Error: "Updates were rejected"
```bash
git fetch origin
git merge origin/main --allow-unrelated-histories
git push -u origin main
```

---

## 📝 Making Additional Changes

After the initial push, if you make changes:

```bash
git add .
git commit -m "Your descriptive commit message"
git push
```

---

**Good luck with your submission! 🚀**
