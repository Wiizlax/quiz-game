import axios from "axios";

const API_URL = "https://opentdb.com/api.php?amount=10";

export const fetchTriviaQuestions = async () => {
  const response = await axios.get(API_URL);
  return response.data.results; 
};