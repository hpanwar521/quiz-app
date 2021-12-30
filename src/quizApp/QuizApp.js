import React from 'react'
import './quizApp.css';
import {Container, Row, Col} from 'react-bootstrap';
import Svg from './result.svg';
import LandingQuizApp from './LandingQuizApp';

import 'bootstrap/dist/css/bootstrap.min.css';

const QuizApp = () => {
    return (
        <div className='mainContainer'>
            <Container fluid>
                <Row className='quizAppHeading'><h1>Quiz App</h1></Row>
                <Row className='justify-content-between rowOfInputs'>
                   
                <Col xs={6} md={6} lg={4}><img src={Svg} className='svgCol'/></Col>
                   
                   <Col xs={12} md={12} lg={6} className='landingInputs'>
                        <LandingQuizApp/>
                    </Col>
                    
                </Row>
            </Container>
        </div>
    )
}

export default QuizApp
