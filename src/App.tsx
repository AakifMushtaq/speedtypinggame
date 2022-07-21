import { Component } from 'react';
import parse from 'html-react-parser';
import {
  Container,
  Row,
  Col,
  Button,
  Input,
  CardBody,
  Card,
  CardTitle,
  Label,
  FormGroup,
  Alert,
  Dropdown,
  DropdownItem
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { ITypingGameStore } from './stores/ITypingGameStore';

import { observer } from "mobx-react";

interface AppState {
  startTimer: boolean
  seconds: number
  showAlert: boolean
  alertText: string
  selectedOption: string,
}

interface IAppProps {
  typingGameStore: ITypingGameStore
}


@observer
class App extends Component<IAppProps, AppState> {

  timer: any;
  constructor(props: any) {
    super(props);

    this.state = {
      startTimer: false,
      seconds: 60,
      showAlert: false,
      alertText: '',
      selectedOption: 'Easy',
    };
  }

  insert = function (str: string, index: any, value: any) {
    return str.substring(0, index) + value + str.substring(index);
  }

  startInterval = async () => {
    var element = document.getElementById('userInput');
    await this.setState({ ...this.state, startTimer: true });
    element?.focus();
    this.timer = setInterval(async () => {
      await this.setState({ ...this.state, seconds: this.state.seconds - 1 });

    }, 1000);
  }

  resetInterval = () => {
    clearInterval(this.timer);
    this.props.typingGameStore.setStoreTypingText(this.props.typingGameStore.originalText);
    this.props.typingGameStore.setStoreUserInput('');
    this.setState({ ...this.state, seconds: 60, startTimer: false, alertText: '', showAlert: false });
  }

  toggleAlert = () => {
    this.setState({ ...this.state, showAlert: !this.state.showAlert })
    return false
  }

  showResult = () => {
    clearInterval(this.timer);
    this.setState({ ...this.state, startTimer: false })
    let timeTaken = 60 - this.state.seconds
    let userTyped = this.props.typingGameStore.userInput.split(' ').length
    let wordCount = this.props.typingGameStore.originalText.split(' ').length
    let wpm = userTyped / timeTaken * 60

    let words = this.props.typingGameStore.originalText.split(' ')
    let correctWords = 0;
    words.forEach(x => {
      correctWords += this.props.typingGameStore.userInput.indexOf(x) >= 0 ? 1 : 0;
    })

    let accuracy = correctWords / wordCount * 100

    let result = `GREAT JOB!! \n You typed ${userTyped} out of ${wordCount}. Your typing speed is ${Math.round(wpm)} WPM.
    Your accuracy is ${Math.round(accuracy)}%`
    this.setState({ ...this.state, alertText: result, showAlert: true })
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <h1>Welcome to Speed Typing Game</h1>            
            <Alert
              color="info"
              hidden={!this.state.showAlert}
              toggle={this.toggleAlert}
            >
              {this.state.alertText}
            </Alert>
            <Col>
              <Card>
                <CardBody>Count Down Timer <h2>{this.state.seconds}</h2>
                </CardBody>
              </Card></Col>
          </Row>
          <Row><Col>
          <Card>
          <div className="select">
            <select className='dropdown' name="country" 
            onChange={(val) => 
              {
                this.setState({...this.state, selectedOption: val.target.value})
                this.props.typingGameStore.updateTextDifficulty(val.target.value)
              }
          } 
            value={this.state.selectedOption}>
              {this.props.typingGameStore.difficulty.map((e, key) => {
                return <option key={key} value={e}>{e}</option>;
              })}
            </select>
            </div>
            </Card>
            </Col>
          </Row>
          <Row className='margin-top'>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle tag="h5">
                    Paragraph
                  </CardTitle>
                  {parse(this.props.typingGameStore.typingText)}
                </CardBody>
              </Card>
              <Input
                onPaste={(e) => {
                  e.preventDefault()
                  return false;
                }}
                type="textarea"
                id='userInput'
                disabled={!this.state.startTimer}
                value={this.props.typingGameStore.userInput}
                placeholder="Type the above content here..."
                onChange={(e) => {
                  this.props.typingGameStore.setStoreUserInput(e.target.value)
                  console.log(this.props.typingGameStore.userInput)
                  this.props.typingGameStore.userInputReceived(e.target.value)
                  if (this.props.typingGameStore.userInput.length >= this.props.typingGameStore.originalText.length) {
                    this.showResult()
                  }
                }
                }
              ></Input>
            </Col>
          </Row>
          <Row className='margin-top'>
            <Col>
              <Card>
                <CardBody>

                  <Button disabled={this.state.startTimer} onClick={this.startInterval}>Start</Button> {' '}
                  <Button onClick={this.resetInterval}>Reset</Button>

                </CardBody>
              </Card>
            </Col>

          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
