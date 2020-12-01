import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import  api, { ApiResponse } from '../../api/api';

interface UserRegistrationPageState {
    formData: {
        email: string;
        password: string;
        name: string;
        surname: string;
        username: string;
        number: string;
    };

    message?: string;

    isRegistrationComplete: boolean;
}

export class UserRegistrationPage extends React.Component {
    state: UserRegistrationPageState;

    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            isRegistrationComplete: false,
            formData: {
                email: '',
                password: '',
                name: '',
                surname: '',
                username: '',
                number: '',
            }
        };
    }

    private formInputChanged(event: React.ChangeEvent<HTMLInputElement>){
        const newFormData = Object.assign(this.state.formData, {
            [ event.target.id ]: event.target.value,
        });

        const newState = Object.assign(this.state, {
            formData: newFormData,
        });

        this.setState(newState);
    }

    render() {
        return (
        <Container>
            <Col md= { { span: 8, offset: 2} }>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={ faUserPlus }/>  User Registration
                        </Card.Title>
                        {
                            (this.state.isRegistrationComplete === false) ? 
                            this.renderForm() :
                            this.renderRegistrationCompleteMessage()
                        }
                    </Card.Body>
                </Card> 
            </Col>
        </Container>
        );

    }

    private renderForm() {
        return (
            <>
                <Form>
                    <Row>
                        <Col md="6">
                            <Form.Group>
                                <Form.Label htmlFor="email">E-mail:</Form.Label>
                                <Form.Control type="email" id="email" 
                                            value={this.state.formData.email}
                                            onChange = { event => this.formInputChanged(event as any) } />
                            </Form.Group>
                        </Col>

                        <Col md="6">
                            <Form.Group>
                                <Form.Label htmlFor="password">Password:</Form.Label>
                                <Form.Control type="password" id="password" 
                                            value={this.state.formData.password}
                                            onChange = { event => this.formInputChanged(event as any) } />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="6">
                            <Form.Group>
                                <Form.Label htmlFor="name">Name:</Form.Label>
                                <Form.Control type="text" id="name" 
                                            value={this.state.formData.name}
                                            onChange = { event => this.formInputChanged(event as any) } />
                            </Form.Group>
                        </Col>
                        <Col md="6">
                            <Form.Group>
                                <Form.Label htmlFor="surname">Surname:</Form.Label>
                                <Form.Control type="text" id="surname" 
                                            value={this.state.formData.surname}
                                            onChange = { event => this.formInputChanged(event as any) } />
                            </Form.Group>
                        </Col>
                    </Row>


                    <Form.Group>
                        <Form.Label htmlFor="username">Username:</Form.Label>
                        <Form.Control type="text" id="username" 
                                    value={this.state.formData.username}
                                    onChange = { event => this.formInputChanged(event as any) } />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="number">Number:</Form.Label>
                        <Form.Control type="phone" id="number" 
                                    value={this.state.formData.number}
                                    onChange = { event => this.formInputChanged(event as any) } />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary"
                                onClick= { () => this.doRegister() }>
                            Register
                        </Button>
                    </Form.Group>`
                </Form>
                <Alert variant="danger"
                    className={ this.state.message ? '' : 'd-none'}>
                    { this.state.message }
                </Alert>
            </>
        );
    }

    private renderRegistrationCompleteMessage() {
        return (
            <p>
                The account has been registered. <br />
                <Link to="/user/login">Click Here</Link> to go to the login page.
            </p>
        );
    }

    private doRegister() {
        const data = {
            email: this.state.formData.email,
            username: this.state.formData.username,
            password: this.state.formData.password,
            name: this.state.formData.name,
            surname: this.state.formData.surname,
            number: this.state.formData.number,
        };

        api('auth/user/register', 'post',  data)
            .then((res: ApiResponse) => {
                console.log(res);

                 if(res.status === 'error'){
                    this.setErrorMessage('System error... try again!');
                    return;
                 }

                 if (res.data.statusCode !== undefined) {
                     this.handleErrors(res.data);
                     return;
                 }

                 this.registrationComplete();
            })
    }

    private setErrorMessage(message: string) {
        const newState = Object.assign(this.state, {
            message: message
        });

        this.setState(newState);
    }

    private handleErrors(data: any) {
        let message = '';

        switch (data.statusCode) {
            case -6001: message = 'This account already exists!'; break;
        }

        this.setErrorMessage(message);
    }

    private registrationComplete() {
        const newState = Object.assign(this.state, {
            isRegistrationComplete: true,
        });
        this.setState(newState);
    }
}