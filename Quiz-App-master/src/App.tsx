import React, { useState } from 'react';
import { Alert, Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import { Difficulty, fetchQuizQuestions, QuestionState } from './API';
import "./App.css";
import QuestionCard from './components/QuestionCard';

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [totalQues, setTotalQues] = useState(10);
  const [difficulty, setDifficulty] = useState(Difficulty.ANY);
  const [buttonText, setButtonText] = useState("Next Question");
  const [category, setCategory] = useState<any>("any");
  const [error, setError] = useState(false);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    setError(false);

    const newQuestions = await fetchQuizQuestions(totalQues, difficulty, category);

    if (newQuestions) {
      setTimeout(() => {
        setError(false);
        setGameOver(false);
        setQuestions(newQuestions);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
      }, 800);
        setButtonText("Next Question");
    }
    else {
      setCategory("any");
      setDifficulty(Difficulty.ANY);
      setError(true);
      setLoading(false);
      setGameOver(true);
    }
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.firstChild?.textContent as string;
      const correct = questions[number].correct_answer === answer;

      if (correct) {
        setScore(prev => prev + 1);
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObject]);
      if (number + 1 === totalQues)
        setButtonText("Restart");
    }
  }

  const nextQuestion = () => {
    const NEXT_QUESTION = number + 1;
    if (NEXT_QUESTION === totalQues) {
      setGameOver(true);
    }
    else {
      setNumber(NEXT_QUESTION);
    }
  }

  return (

    <Container className={`mt-5 ${!gameOver && !loading && !questions ? "" : "new"}`}>
      <h1 className={`text-center display-4 ${!gameOver && !loading && !questions ? "text-white" : ""}`}>Quiz</h1>
      <hr />
      {error ? <Alert variant="danger">Sorry! No Questions Found!</Alert> : null}
      { gameOver ?
        <Form onSubmit={(e)=>{e.preventDefault();startTrivia();}}>
          <Form.Group controlId="totalNumber">
            <Form.Label>Total Questions: </Form.Label>
            <Form.Control type="number" value={totalQues} max="50" min="1" onChange={(e) => setTotalQues(+e.currentTarget.value)} />
          </Form.Group>
          <Form.Group controlId="difficult">
            <Form.Label>Difficulty: </Form.Label>
            <Form.Control onChange={(e) => setDifficulty(e.currentTarget.value as Difficulty)} as="select">
              <option value={Difficulty.ANY}>Any</option>
              <option value={Difficulty.EASY}>Easy</option>
              <option value={Difficulty.MEDIUM}>Medium</option>
              <option value={Difficulty.HARD}>Hard</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="categoryId">
            <Form.Label>Difficulty: </Form.Label>
            <Form.Control as="select" onChange={(e) => setCategory(e.currentTarget.value)}>
              <option value="any">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals &amp; Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science &amp; Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
              <option value="32">Entertainment: Cartoon &amp; Animations</option>
            </Form.Control>
          </Form.Group>
          <Button type="submit" variant="dark" size="lg">&#10003; Start</Button>
        </Form>
        : null}
      {loading ? <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner><span className="lead font-weight-normal"> Loading Questions...</span></div> : null}
      {!gameOver && !loading && !error ?
        <Card bg="light">
          {<QuestionCard questionNumber={number + 1} score={score} key={number} totalQuestions={totalQues} question={questions[number].question} answers={questions[number].answers} userAnswer={userAnswers ? userAnswers[number] : undefined} callback={checkAnswer} />}
          {userAnswers[number] ? <Card.Footer><Button variant={buttonText === "Restart" ? "dark" : "primary"} onClick={nextQuestion}>{buttonText === "Restart" ? <span>&#8635;</span> : null} {buttonText} {buttonText !== "Restart" ? <span>&#8594;</span> : null}</Button></Card.Footer> : null}
        </Card> : null
      }
    </Container>
  );
}

export default App;
