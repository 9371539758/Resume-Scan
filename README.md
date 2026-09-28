# 🚀 ATS-Insights – AI Resume Analyzer (MERN + Groq API)

Resume Scan is a full-stack AI-powered web application that analyzes resumes using ATS (Applicant Tracking System) principles. Users can upload a PDF or DOCX resume, optionally provide a job description, and receive a detailed AI-generated evaluation including ATS score, keyword analysis, strengths, weaknesses, formatting suggestions, and actionable improvements.

The project is built using the MERN stack and uses the Groq API with Llama 3.3 70B for resume analysis.

---

# ✨ Features

- 📄 Upload resumes in **PDF** or **DOCX** format
- 🤖 AI-powered resume analysis using **Llama 3.3 70B via Groq**
- 📊 Overall resume score
- 🎯 ATS compatibility score
- 🔍 Matched & missing keyword analysis
- 📑 Resume section detection
- ⚠️ Formatting issue detection
- 💡 Personalized improvement suggestions
- 📚 Resume history stored in MongoDB
- 🗑 Delete previous analyses
- 🌐 Fully deployable using Render + Vercel

---

# 🛠 Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Multer
- pdf-parse
- Mammoth

### AI

- Groq API

---

# 📂 Project Structure

```
resume-analyser-mern/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ How It Works

## Step 1 — Upload Resume

The user uploads a PDF or DOCX resume through the React frontend.

The file is sent to the Express backend using multipart/form-data.

---

## Step 2 — Text Extraction

The backend extracts text from the uploaded file.

Libraries used:

- pdf-parse (PDF)
- mammoth (DOCX)

If the uploaded document is scanned or contains insufficient text, the application returns an appropriate error message.

---

## Step 3 — AI Analysis

The extracted resume text, along with an optional job description, is sent to Groq's Llama 3.3 70B model.

The model evaluates the resume and returns:

- Overall Score
- ATS Compatibility
- Matched Keywords
- Missing Keywords
- Resume Sections
- Formatting Issues
- Strengths
- Improvements
- Summary

---

## Step 4 — Database Storage

Every analysis is stored in MongoDB Atlas.

Stored information includes:

- Resume filename
- Extracted text
- Job description
- AI analysis
- Timestamp

Users can later view or delete previous analyses.

---

## Step 5 — Display Results

The frontend displays the AI analysis in a clean interface with separate sections for:

- ATS Score
- Keyword Match
- Strengths
- Improvements
- Formatting Issues
- Overall Summary

---

# 🚀 Local Installation

## Clone Repository

```bash
git clone <your-repository-url>
cd resume-analyser-mern
```

---

## Backend Setup

```bash
cd server

npm install
```

Create a `.env` file inside the server folder.

```env
PORT=5001

MONGO_URI=YOUR_MONGODB_URI

GROQ_API_KEY=YOUR_GROQ_API_KEY

CLIENT_URL=http://localhost:5173
```

Run backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install
```

Create a `.env` file.

```env
VITE_API_URL=http://localhost:5001
```

Run frontend:

```bash
npm run dev
```

---

# 📡 API Endpoints

## Analyze Resume

```
POST /api/resumes/analyze
```

Uploads a resume, performs AI analysis, stores the result, and returns the complete analysis.

---

## Get Resume History

```
GET /api/resumes
```

Returns all previously analyzed resumes.

---

## Get Resume Details

```
GET /api/resumes/:id
```

Returns detailed analysis of a single resume.

---

## Delete Resume

```
DELETE /api/resumes/:id
```

Deletes a stored resume analysis.

---

## Health Check

```
GET /api/health
```

Returns server status.

---

# 🌍 Deployment

## Backend (Render)

1. Push project to GitHub
2. Create a new Web Service on Render
3. Set Root Directory to `server`
4. Add environment variables:
   - MONGO_URI
   - GROQ_API_KEY
   - CLIENT_URL
5. Deploy

---

## Frontend (Vercel)

1. Import GitHub repository
2. Set Root Directory to `client`
3. Add environment variable:

```
VITE_API_URL=https://your-render-backend-url.onrender.com
```

4. Deploy

---

# 💡 Future Improvements

- User authentication
- Resume comparison
- OCR support for scanned PDFs
- Download AI-generated report as PDF
- Resume version tracking
- AI-generated optimized resume
- Cover letter generation
- Multi-language resume support

---



# 👨‍💻 Author

**Aditya Pandey**

B.Tech Information Technology

Passionate about Full Stack Development, Artificial Intelligence, and Building Scalable Web Applications.

---

