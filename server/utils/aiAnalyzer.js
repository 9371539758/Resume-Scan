import Groq from "groq-sdk";

const SYSTEM_PROMPT = `
You are an Expert ATS Resume Analyzer.

Return ONLY valid JSON.

Schema:
{
  "overallScore": 0,
  "atsCompatibility": 0,
  "matchedKeywords": [],
  "missingKeywords": [],
  "sections": [],
  "formattingIssues": [],
  "strengths": [],
  "improvements": [],
  "summary": ""
}
`;

function buildPrompt(resumeText, jobDescription = "") {
  return `
${SYSTEM_PROMPT}

### Resume

${resumeText}

${
  jobDescription
    ? `### Job Description
${jobDescription}`
    : "No job description provided."
}
`;
}

function safeParseJSON(text) {
  try {
    return JSON.parse(
      text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim()
    );
  } catch {
    throw new Error("Groq returned invalid JSON.");
  }
}

export async function analyzeResume(
  resumeText,
  jobDescription = ""
) {
  if (!resumeText.trim()) {
    throw new Error("Resume text is required.");
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured on the server.");
  }

  const groq = new Groq({ apiKey });

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    temperature: 0.2,
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: buildPrompt(resumeText, jobDescription),
      },
    ],
  });

  const response = completion.choices[0]?.message?.content;

  if (!response) {
    throw new Error("No response from Groq.");
  }

  return safeParseJSON(response);
}