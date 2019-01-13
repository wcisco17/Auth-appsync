import * as React from 'react'
import { Show } from '../types/Interface';
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button';


import { Auth } from 'aws-amplify'

import { Formik } from 'formik'


interface ForgotPassword {
    username: string
}

interface ForgotPasswordSubmit {
    username: string
    code: string
    new_password: string
}
interface CompleteNewPassword {
    username: string
    password: string
}



const ForgotPassword = (props: Show) => {

    return (
        <React.Fragment>
            <div className={`modal__content ${props.forgot}`}>
                <div className="modules_login">
                    <h4>Forgot Password Page</h4>
                    <Formik<ForgotPassword>
                        initialValues={{
                            username: "",
                        }}
                        onSubmit={async ({ username }, { resetForm }) => {
                            try {
                                const response = await Auth.forgotPassword(username)
                                if (response) {
                                    console.log("Changed Passoword : )")
                                    if (props.nextMove === undefined) {
                                        return null
                                    }
                                    props.nextMove()
                                }
                            } catch (err) {
                                console.log('Error: ', err)
                            }
                            resetForm()
                        }}
                    >
                        {({ values, handleChange, handleSubmit }) => {
                            return (
                                <React.Fragment>
                                    <form onSubmit={handleSubmit} className="form-container" >
                                        <div>
                                            <TextField name="username"
                                                value={values.username} label="Email ..."
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="btn-login" >
                                            <Button
                                                type="submit" variant="contained" color="secondary">
                                                Submit
                                             </Button>
                                        </div>
                                    </form>
                                </React.Fragment>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </React.Fragment>
    );
}


const ForgotPasswordSubmit = (props: Show) => {

    return (
        <React.Fragment>
            <div className={`modal__content ${props.confirming}`}>
                <div className="modules_login">
                    <h4>Confirm Password Submit</h4>
                    <Formik<ForgotPasswordSubmit>
                        initialValues={{
                            username: "",
                            code: "",
                            new_password: ""
                        }}
                        onSubmit={async ({ username, code, new_password }, { resetForm }) => {
                            try {
                                const response = Auth.forgotPasswordSubmit(username, code, new_password)

                                if (response) {
                                    if (props.otherNextMove === undefined) {
                                        return null
                                    }
                                    props.otherNextMove()
                                }
                                console.log("Change password")
                                return response
                            } catch (err) {
                                console.log('Error: ', err)
                            }
                            resetForm()
                        }}
                    >
                        {({ values, handleChange, handleSubmit }) => {
                            return (
                                <React.Fragment>
                                    <form onSubmit={handleSubmit} className="form-container" >
                                        <div>
                                            <TextField name="username"
                                                value={values.username} label="Username ..."
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <TextField name="code"
                                                value={values.code} label="Code ..."
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <TextField name="new_password"
                                                value={values.new_password} label="Password ..."
                                                onChange={handleChange}
                                                type="password"
                                                required
                                            />
                                        </div>
                                        <div className="btn-login" >
                                            <Button
                                                type="submit" variant="contained" color="secondary">
                                                Submit
                                   </Button>
                                        </div>
                                    </form>
                                </React.Fragment>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </React.Fragment>
    );
}



const CompleteNewPassword = (props: Show) => {
    return (
        <React.Fragment>
            <div className={`modal__content ${props.complete}`}>
                <div className="modules_login">
                    <h4>Please Login with New Password</h4>
                    <Formik<CompleteNewPassword>
                        initialValues={{
                            username: "",
                            password: "",
                        }}
                        onSubmit={async ({ username, password }, { resetForm }) => {
                            try {
                                const response = await Auth.signIn({
                                    username,
                                    password
                                })
                                    .then((user: any, ) => {
                                        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                                            const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
                                            Auth.completeNewPassword(
                                                user,               // the Cognito User Object
                                                user.newPassword,       // the new password
                                                {}
                                            ).then(user => {
                                                // at this time the user is logged in if no MFA required
                                                console.log(user);
                                            }).catch(e => {
                                                console.log(e);
                                            });
                                        } else {
                                            // other situations
                                        }
                                    })
                                console.log("Logged In success!")

                                props.history.push("/protected")

                                return response
                            } catch (err) {
                                console.log('Error: ', err)
                            }
                            resetForm()
                        }}
                    >
                        {({ values, handleChange, handleSubmit }) => {
                            return (
                                <React.Fragment>
                                    <form onSubmit={handleSubmit} className="form-container" >
                                        <div>
                                            <TextField name="username"
                                                value={values.username} label="Username ..."
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <TextField name="password"
                                                value={values.password} label="Password ..."
                                                onChange={handleChange}
                                                type="password"
                                                required
                                            />
                                        </div>
                                        <div className="btn-login" >
                                            <Button
                                                type="submit" variant="contained" color="secondary">
                                                Submit
                                   </Button>
                                        </div>
                                    </form>
                                </React.Fragment>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </React.Fragment>
    );
}


export default class Forgot extends React.PureComponent<Show> {
    state = {
        forgot: "",
        confirming: "confirming",
        complete: "complete"
    }

    nextMove = () => this.setState({ forgot: "none", confirming: "" })



    otherNextMove = () => this.setState({ confirming: "confirming", complete: "" })


    render() {
        return (
            <React.Fragment>
                <ForgotPassword
                    forgot={this.state.forgot}
                    nextMove={this.nextMove}
                    history={this.props.history}
                />
                <ForgotPasswordSubmit
                    history={this.props.history}
                    confirming={this.state.confirming}
                    otherNextMove={this.otherNextMove}
                />

                <CompleteNewPassword
                    history={this.props.history}
                    complete={this.state.complete}
                />
            </React.Fragment>
        )
    }
}