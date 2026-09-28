import Resume from "../models/Resume.js";
import { extractText } from "../utils/extractText.js";
import { analyzeResume } from "../utils/aiAnalyzer.js";

// @desc Upload a resume, analyze with Groq, save to MongoDB
// @route POST /api/resumes/analyze
export const analyzeResumeUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No resume file uploaded",
      });
    }

    const jobDescription = req.body.jobDescription || "";

    const rawText = await extractText(
      req.file.buffer,
      req.file.mimetype
    );

    if (!rawText || rawText.length < 50) {
      return res.status(422).json({
        message:
          "Could not extract enough text from this file. Please upload a text-based PDF or DOCX.",
      });
    }

    const analysis = await analyzeResume(
      rawText,
      jobDescription
    );
    // Convert model section strings into objects expected by MongoDB
if (Array.isArray(analysis.sections)) {
  analysis.sections = analysis.sections.map((section) => {
    if (typeof section === "string") {
      return {
        name: section,
        present: true,
        feedback: "",
      };
    }
    return section;
  });
}
    console.log("========== GROQ RESPONSE ==========");
console.log(JSON.stringify(analysis, null, 2));
console.log("====================================");

    const resume = await Resume.create({
      fileName: req.file.originalname,
      rawText,
      jobDescription,
      overallScore: analysis.overallScore,
      atsCompatibility: analysis.atsCompatibility,
      matchedKeywords: analysis.matchedKeywords || [],
      missingKeywords: analysis.missingKeywords || [],
      sections: analysis.sections || [],
      formattingIssues: analysis.formattingIssues || [],
      strengths: analysis.strengths || [],
      improvements: analysis.improvements || [],
      summary: analysis.summary || "",
    });
    console.log("Saved Resume:", resume._id);

    res.status(201).json(resume);
  } catch (error) {
    console.error("Analyze Resume Error:", error);
    res.status(500).json({
      message: error.message || "Analysis failed",
    });
  }
};

// @desc Get all resumes
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find()
      .select("-rawText")
      .sort({ createdAt: -1 });

    res.json(resumes);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// @desc Get resume by id
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.json(resume);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// @desc Delete resume
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(
      req.params.id
    );

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.json({
      message: "Resume deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};