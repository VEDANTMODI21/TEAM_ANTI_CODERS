# 🚀 TEAM ANTI CODERS — Student Team Members Management Application

A full-stack web application for managing student team members. Built with React.js, Node.js, Express, and MongoDB.

---

## ✨ Features

- 🏠 **Landing Page** — Beautiful dark-themed home page with team stats
- ➕ **Add Member** — Comprehensive form with image upload and validation
- 👥 **View Members** — Responsive grid layout with member cards
- 🔍 **Member Details** — Detailed profile view with hobbies as tags
- 🗑️ **Delete Member** — Remove members with confirmation dialog
- 📱 **Responsive Design** — Works on desktop, tablet, and mobile
- 🎨 **Modern UI** — Dark theme with blue accents, animations, and glassmorphism

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React.js, React Router, Axios       |
| Backend    | Node.js, Express.js                 |
| Database   | MongoDB with Mongoose               |
| File Upload| Multer                              |
| Styling    | Vanilla CSS with CSS Custom Properties |

---

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or Atlas)
- npm (comes with Node.js)

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/TEAM_ANTI_CODERS.git
cd TEAM_ANTI_CODERS
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
MONGODB_URI=mongodb://localhost:27017/team-management
PORT=5000
```

Start the backend server:

```bash
npm start
```

The server will run at `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

The React app will open at `http://localhost:3000`

---

## 🔌 API Endpoints

| Method   | Endpoint              | Description              |
|----------|-----------------------|--------------------------|
| `GET`    | `/api/members`        | Fetch all team members   |
| `GET`    | `/api/members/:id`    | Fetch a single member    |
| `POST`   | `/api/members`        | Create a new member      |
| `DELETE` | `/api/members/:id`    | Delete a member          |

### POST /api/members — Example Request

**Content-Type:** `multipart/form-data`

| Field          | Type   | Required | Description                     |
|----------------|--------|----------|---------------------------------|
| `name`         | String | ✅ Yes    | Full name of the member         |
| `rollNumber`   | String | No       | Roll/enrollment number          |
| `year`         | String | No       | Academic year (e.g., "3rd Year")|
| `degree`       | String | No       | Degree (e.g., "B.Tech CSE")     |
| `aboutProject` | String | No       | Description of current project  |
| `hobbies`      | String | No       | Comma-separated hobbies         |
| `certificate`  | String | No       | Certifications earned           |
| `internship`   | String | No       | Internship experience           |
| `aboutYourAim` | String | No       | Career goals and aspirations    |
| `image`        | File   | No       | Profile image (JPG/PNG, max 5MB)|

---

## 📁 Project Structure

```
TEAM_ANTI_CODERS/
├── backend/
│   ├── models/
│   │   └── Member.js          # MongoDB schema
│   ├── routes/
│   │   └── members.js         # API route handlers
│   ├── uploads/
│   │   └── .gitkeep           # Keeps uploads dir in git
│   ├── server.js              # Express server entry point
│   ├── package.json
│   ├── .env                   # Environment variables (not committed)
│   ├── .env.example           # Example env file
│   └── .gitignore
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js      # Navigation header
│   │   │   ├── Home.js        # Landing page
│   │   │   ├── AddMember.js   # Add member form
│   │   │   ├── ViewMembers.js # Members grid view
│   │   │   └── MemberDetails.js # Individual member view
│   │   ├── App.js             # Main app with routing
│   │   ├── App.css            # Complete design system
│   │   └── index.js           # React entry point
│   ├── package.json
│   └── .gitignore
├── API_TESTING.md             # API testing guide
├── GIT_SUBMISSION.md          # Git submission instructions
├── README.md                  # This file
└── .gitignore
```

---

## 🌐 Environment Variables

| Variable       | Description                    | Default                                      |
|----------------|--------------------------------|----------------------------------------------|
| `MONGODB_URI`  | MongoDB connection string      | `mongodb://localhost:27017/team-management`  |
| `PORT`         | Backend server port            | `5000`                                       |

---

## 👥 Team Members

| Name              | Role                |
|-------------------|---------------------|
| Member 1          | Full Stack Developer|
| Member 2          | Frontend Developer  |
| Member 3          | Backend Developer   |
| Member 4          | Database & Testing  |

---

## 📄 License

This project is licensed under the MIT License.

---

**Made with ❤️ by Team Anti Coders(
    VEDANT MODI(RA2311027010090)
        KRISH SATI(RA2311027010094)
            PRASAD PATIL(RA2311027010104))**
