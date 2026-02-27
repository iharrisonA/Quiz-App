import React, { useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap';

type Props = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: any;
    questionNumber: number;
    totalQuestions: number;
    score: number;
}

const QuestionCard: React.FC<Props> =
    ({
        question, answers, callback, userAnswer, questionNumber, totalQuestions, score
    }) => {

        const [activeEl, setActiveEl] = useState(-1);

        return (
            <>
                <Card.Header as="h5">
                    <span>Question: {questionNumber} / {totalQuestions}</span>
                    <span className="float-right">Score: {score}</span>
                </Card.Header>
                <Card.Body>
                    <h4 className="mb-4" dangerouslySetInnerHTML={{ __html: question }} />
                    <ListGroup as="ol">
                    {answers.map((item, index) => (
                        <ListGroup.Item key={index} active={index===activeEl ? true : false} action onClick={(e)=>{setActiveEl(index);callback(e);}} disabled={userAnswer}><span dangerouslySetInnerHTML={{ __html: item }}/></ListGroup.Item>
                    ))}
                    </ListGroup>
                </Card.Body>
            </>
        );
    }

export default QuestionCard;
