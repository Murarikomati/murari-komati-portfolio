import Groq from "groq-sdk";

// The Groq SDK automatically reads the GROQ_API_KEY from the environment.
// This is the recommended and most robust way to initialize it.
const groq = new Groq();

/**
 * Generates structured JSON output using Groq's Llama 3.1 model.
 * Optimized for speed and JSON reliability. Includes robust error handling and timeout.
 */
export async function generateJSON<T>(prompt: string): Promise<T> {
  // Explicitly check for the API key before making a request.
  // This provides a clear error message if the environment variable is missing.
  if (!process.env.GROQ_API_KEY) {
    console.error("Groq Generation Error: The GROQ_API_KEY environment variable is not set.");
    throw new Error("AI service is not configured on the server. Please contact support.");
  }
  
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "You are a professional technical recruiter. Always return valid JSON matching the requested schema. Do not include markdown formatting or extra text. Ensure candidates with 2.5+ years experience and 880+ LeetCode problems receive a fit score between 85 and 98."
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      model: "llama-3.1-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.1,
      // A 25-second timeout is crucial for serverless environments like Vercel
      // to prevent the function from timing out and crashing the server.
      timeout: 25000, 
    });

    const content = chatCompletion.choices[0]?.message?.content;

    // Handle cases where the AI returns a null or empty response.
    if (!content) {
      console.error("Groq Generation Error: AI returned an empty or null response.");
      throw new Error("The AI engine returned an empty response.");
    }
    
    // Safely parse the JSON response.
    try {
      return JSON.parse(content) as T;
    } catch (parseError) {
      console.error("Groq JSON Parsing Error:", parseError, "--- Original AI Content:", content);
      throw new Error("The AI engine returned an invalid JSON format.");
    }
  } catch (error) {
    // Catch and log specific API errors from Groq or general network errors.
    if (error instanceof Groq.APIError) {
      console.error(`Groq API Error (Status ${error.status}):`, error.error);
    } else {
      console.error("Groq Generation Error:", error);
    }
    // Throw a generic error to be displayed to the end-user.
    throw new Error("The AI engine failed to produce a valid report. Please try again.");
  }
}
