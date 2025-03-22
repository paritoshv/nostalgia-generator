export interface QuestionnaireData {
  birthYear: string;
  definingEvent: string;
  musicFormat: string;
  favoriteMovie: string;
  fashionFauxPas: string;
  hangoutSpot: string;
  slangPhrase: string;
  bedroomExhibit: string;
  favoriteGame: string;
  wishToBringBack: string;
}

export interface Question {
  id: keyof QuestionnaireData;
  type: 'text' | 'multiple-choice';
  question: string;
  placeholder?: string;
  options?: string[];
  allowWriteIn?: boolean;
} 