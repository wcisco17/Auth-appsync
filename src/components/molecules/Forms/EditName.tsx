import * as React from 'react'
import { Formik } from 'formik';
import { Auth } from 'aws-amplify';
import { TextField, Button } from '@material-ui/core';
interface Props {
    authenticated: any

}
interface EditNameInput {
    given_name: string
}

export const EditName = (props: Props) => {
    let user = props.authenticated
    return (
        <div>
            <Formik<EditNameInput>
                initialValues={{
                    given_name: ""
                }}
                onSubmit={async ({ given_name }, { resetForm }) => {
                    try {
                        const res = await Auth.updateUserAttributes(user, {
                            'given_name': given_name
                        })
                        if (res) {
                            console.log('Changed! ', res)
                        }
                    } catch (err) {
                        console.log("Error: ", err.message)
                    }
                    resetForm()
                }}
            >
                {({ values, handleChange, handleSubmit }) => {
                    return (
                        <React.Fragment>
                            <form onSubmit={handleSubmit} className="form-containers" >
                                <div>
                                    <TextField name="given_name"
                                        value={values.given_name} label="Change Name ..."
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="btn-login" >
                                    <Button
                                        type="submit" variant="contained" color="secondary">
                                        Edit
                                            </Button>
                                </div>
                            </form>
                        </React.Fragment>
                    )
                }}
            </Formik>
        </div>
    );
}