from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from typing import Optional
import os
from dotenv import load_dotenv
import traceback

load_dotenv()

# Configure Gemini API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY environment variable not set")

try:
    genai.configure(api_key=GOOGLE_API_KEY)
    # List available models
    # print("Available models:")
    # for m in genai.list_models():
    #     print(f"- {m.name}")
    # Initialize the model with the correct name
    model = genai.GenerativeModel("models/gemini-1.5-pro")
except Exception as e:
    print(f"Error configuring Gemini API: {str(e)}")
    print(traceback.format_exc())
    raise

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

port = int(os.environ.get("PORT", 8000))


class QuestionnaireData(BaseModel):
    birthYear: str
    definingEvent: str
    musicFormat: str
    favoriteMovie: str
    fashionFauxPas: str
    hangoutSpot: str
    slangPhrase: str
    bedroomExhibit: str
    favoriteGame: str
    wishToBringBack: str


def create_gemini_prompt(data: QuestionnaireData) -> str:
    childhood_year = int(data.birthYear) + 10  # Starting from age 10
    return f"""Create a nostalgic experience based on these memories, focusing on Indian youth culture from {childhood_year}-{childhood_year+10} (not from birth year). Birth Year: {data.birthYear} (Focus on memories from age 10-20)
Event: {data.definingEvent}
Music: {data.musicFormat}
Movie: {data.favoriteMovie}
Fashion: {data.fashionFauxPas}
Hangout: {data.hangoutSpot}
Slang: {data.slangPhrase}
Bedroom Item: {data.bedroomExhibit}
Game: {data.favoriteGame}
Wish: {data.wishToBringBack}

Please create (with Indian cultural context):
Based on the user's answers, create a nostalgic experience that will amaze them. Create the story around the time the user is 14-17 years old. All nostalgia/context should be from that period.
at the end summarise it as a poem.
"""


@app.post("/api/generate-nostalgia")
async def generate_nostalgia(data: QuestionnaireData):
    try:
        print("Received data:", data)
        prompt = create_gemini_prompt(data)
        print("Generated prompt:", prompt)

        try:
            response = model.generate_content(
                prompt,
                generation_config={
                    "temperature": 0.9,
                    "top_p": 0.8,
                    "top_k": 40,
                },
            )

            print("Generated response:", response.text)
            return {"response": response.text}
        except Exception as e:
            print("Error generating content:", str(e))
            print(traceback.format_exc())
            raise HTTPException(
                status_code=500, detail=f"Error generating content: {str(e)}"
            )

    except Exception as e:
        print("Unexpected error:", str(e))
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=port)
