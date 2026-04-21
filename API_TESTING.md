# 🧪 API Testing Guide — Team Anti Coders

This document provides step-by-step instructions for testing all API endpoints.

---

## Prerequisites

- Backend server running at `http://localhost:5000`
- MongoDB running locally or on Atlas
- A REST client: **Postman**, **Thunder Client** (VS Code), or a web browser

---

## Test 1: GET All Members (Browser)

**URL:** `http://localhost:5000/api/members`

### Steps:
1. Open your web browser
2. Navigate to `http://localhost:5000/api/members`
3. You should see a JSON array of all members

### Expected Response (Empty Database):
```json
[]
```

### Expected Response (With Data):
```json
[
  {
    "_id": "64a1b2c3d4e5f6a7b8c9d0e1",
    "name": "John Doe",
    "rollNumber": "21CS101",
    "year": "3rd Year",
    "degree": "B.Tech CSE",
    "aboutProject": "Building a team management app",
    "hobbies": "Coding, Reading, Gaming",
    "certificate": "AWS Certified Cloud Practitioner",
    "internship": "Google Summer Intern 2025",
    "aboutYourAim": "To become a full-stack developer",
    "image": "1714200000000-profile.jpg",
    "createdAt": "2025-04-27T10:00:00.000Z",
    "__v": 0
  }
]
```

📸 *Take a screenshot of the browser showing the JSON response*

---

## Test 2: POST Create a New Member (Postman/Thunder Client)

**URL:** `http://localhost:5000/api/members`  
**Method:** `POST`  
**Body Type:** `form-data`

### Steps:

1. Open Postman or Thunder Client
2. Set method to **POST**
3. Enter URL: `http://localhost:5000/api/members`
4. Go to **Body** tab → Select **form-data**
5. Add the following fields:

| Key            | Value                                    | Type  |
|----------------|------------------------------------------|-------|
| `name`         | `John Doe`                              | Text  |
| `rollNumber`   | `21CS101`                               | Text  |
| `year`         | `3rd Year`                              | Text  |
| `degree`       | `B.Tech CSE`                            | Text  |
| `aboutProject` | `Building a team management application`| Text  |
| `hobbies`      | `Coding, Reading, Gaming`               | Text  |
| `certificate`  | `AWS Certified Cloud Practitioner`      | Text  |
| `internship`   | `Google Summer Intern 2025`             | Text  |
| `aboutYourAim` | `To become a full-stack developer`      | Text  |
| `image`        | *(select a .jpg or .png file)*          | **File** |

6. Click **Send**

### Expected Response (201 Created):
```json
{
  "_id": "64a1b2c3d4e5f6a7b8c9d0e1",
  "name": "John Doe",
  "rollNumber": "21CS101",
  "year": "3rd Year",
  "degree": "B.Tech CSE",
  "aboutProject": "Building a team management application",
  "hobbies": "Coding, Reading, Gaming",
  "certificate": "AWS Certified Cloud Practitioner",
  "internship": "Google Summer Intern 2025",
  "aboutYourAim": "To become a full-stack developer",
  "image": "1714200000000-123456789-profile.jpg",
  "createdAt": "2025-04-27T10:00:00.000Z",
  "__v": 0
}
```

📸 *Take a screenshot of the Postman response*

---

## Test 3: GET Single Member by ID (Browser)

**URL:** `http://localhost:5000/api/members/{id}`

### Steps:
1. From the GET all members response (Test 1), copy a member's `_id`
2. Navigate to `http://localhost:5000/api/members/PASTE_ID_HERE`
3. You should see a single member JSON object

### Expected Response (200 OK):
```json
{
  "_id": "64a1b2c3d4e5f6a7b8c9d0e1",
  "name": "John Doe",
  "rollNumber": "21CS101",
  ...
}
```

### Error Response (Invalid ID — 404):
```json
{
  "message": "Member not found"
}
```

📸 *Take a screenshot of the browser showing the single member JSON*

---

## Test 4: Image Serving (Browser)

**URL:** `http://localhost:5000/uploads/{image-filename}`

### Steps:
1. From a member object, copy the `image` field value (e.g., `1714200000000-123456789-profile.jpg`)
2. Navigate to `http://localhost:5000/uploads/1714200000000-123456789-profile.jpg`
3. The image should display in the browser

📸 *Take a screenshot of the image loading in the browser*

---

## Test 5: DELETE a Member (Postman/Thunder Client)

**URL:** `http://localhost:5000/api/members/{id}`  
**Method:** `DELETE`

### Steps:
1. Copy a member's `_id` from Test 1
2. Set method to **DELETE**
3. Enter URL: `http://localhost:5000/api/members/PASTE_ID_HERE`
4. Click **Send**

### Expected Response (200 OK):
```json
{
  "message": "Member deleted successfully"
}
```

---

## Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `ECONNREFUSED` | Backend not running | Run `npm start` in backend/ |
| `MongooseError` | MongoDB not running | Start MongoDB service |
| `Cannot POST` | Wrong URL | Check URL is `/api/members` |
| `413 Payload Too Large` | Image too big | Use image under 5MB |
| `400 Bad Request` | Missing required field | Include `name` field |
| `CORS Error` | Frontend/Backend port mismatch | Backend has CORS configured for port 3000 |

---

**End of API Testing Guide**
