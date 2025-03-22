import { useState } from 'react';
import { questions } from '../data/questions';
import { QuestionnaireData } from '../types/questionnaire';

const initialData: QuestionnaireData = {
  birthYear: '',
  definingEvent: '',
  musicFormat: '',
  favoriteMovie: '',
  fashionFauxPas: '',
  hangoutSpot: '',
  slangPhrase: '',
  bedroomExhibit: '',
  favoriteGame: '',
  wishToBringBack: '',
};

export default function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [data, setData] = useState<QuestionnaireData>(initialData);
  const [showWriteIn, setShowWriteIn] = useState(false);
  const [writeInValue, setWriteInValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowWriteIn(false);
      setWriteInValue('');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setShowWriteIn(false);
      setWriteInValue('');
    }
  };

  const handleInputChange = (value: string) => {
    setData(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      const backendUrl =  import.meta.env.REACT_APP_API_URL || 'http://localhost:8000/api/generate-nostalgia';
      
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to generate nostalgia response');
      }

      const result = await response.json();
      setResponse(result.response);
      setCurrentQuestion(questions.length); // Move to response view
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateAgain = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(import.meta.env.REACT_APP_API_URL || 'http://localhost:8000/api/generate-nostalgia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to generate nostalgia response');
      }

      const result = await response.json();
      setResponse(result.response);
      setCurrentQuestion(questions.length); // Move to response view
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartOver = () => {
    setData(initialData);
    setResponse(null);
    setCurrentQuestion(0);
  };

  const currentQuestionData = questions[currentQuestion];

  // If we have a response, show it instead of the questions
  if (response) {
    return (
      <div className="flex-1 w-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-primary mb-6">Your Nostalgic Experience</h2>
            <div className="prose prose-lg max-w-none">
              {response.split('\n').map((line, index) => (
                <p key={index} className="mb-4">{line}</p>
              ))}
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleStartOver}
                className="btn btn-primary"
              >
                Start Over
              </button>
              <button
                onClick={handleGenerateAgain}
                className={`btn btn-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Generating...' : 'Generate Again'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Time Capsule of Your Soul
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Prepare for a whirlwind trip down memory lane! We're about to dust off those old cassette tapes and dig up your most glorious (or hilariously awkward) moments.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <span className="question-number">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div className="progress-bar ml-4 flex-1">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <h2 className="question-title">{currentQuestionData.question}</h2>
          </div>

          <div className="space-y-4">
            {currentQuestionData.type === 'text' ? (
              <input
                type="text"
                className="input"
                placeholder={currentQuestionData.placeholder}
                value={data[currentQuestionData.id]}
                onChange={(e) => handleInputChange(e.target.value)}
              />
            ) : (
              <div className="space-y-3">
                {currentQuestionData.options?.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="radio"
                      name={currentQuestionData.id}
                      value={option}
                      checked={data[currentQuestionData.id] === option}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
                {currentQuestionData.allowWriteIn && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Or write your own:
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={writeInValue}
                      onChange={(e) => {
                        setWriteInValue(e.target.value);
                        handleInputChange(e.target.value);
                      }}
                      placeholder="Your answer here..."
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-between mt-8 pt-4 border-t">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`btn ${
                currentQuestion === 0
                  ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400'
                  : 'btn-secondary'
              }`}
            >
              Previous
            </button>
            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`btn btn-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Generating...' : 'Submit'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="btn btn-primary"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 