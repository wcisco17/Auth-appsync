import * as React from 'react'
import { Show } from '../types/Interface';
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';

import { Auth } from 'aws-amplify'

import { Formik } from 'formik'


interface LoginValues {
    username: string
    password: string
}




export const Login = (props: Show) => {
    let [message, onMessage] = React.useState("")
    console.log(props.history)
    return (
        <React.Fragment>
            <div className="modal__content">
                <div className="close-login" >
                    <Close className="cursor-close"
                        onClick={() => {
                            props.onModal === undefined ? null : props.onModal("none")
                        }}
                    />
                </div>
                <div className="modules_login">
                    <div>
                        <Button style={{ color: "white" }} >
                            Forgot Passoword ?
                    </Button>
                    </div>
                    <h4>Login Page</h4>
                    <Formik<LoginValues>
                        initialValues={{
                            username: "",
                            password: ""
                        }}
                        onSubmit={async ({ username, password }, { resetForm }) => {
                            try {
                                const response = await Auth.signIn({ username, password })
                                if (response) {
                                    console.log('Success : )', response)
                                }
                                return response
                            } catch (err) {
                                onMessage(err.message)
                            }
                            resetForm()
                        }}
                    >
                        {({ values, handleChange, handleSubmit }) => {
                            return (
                                <React.Fragment>
                                    <p className="err" style={{ fontSize: "1rem" }} >{message}</p>
                                    <form onSubmit={handleSubmit} className="form-container" >
                                        <div>
                                            <TextField name="username"
                                                value={values.username} label="Email ..."
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <TextField name="password" value={values.password} label="Password ..."
                                                type="password"
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
