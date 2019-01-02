import * as React from 'react'
import { useState } from "react";
import { Login } from '../pages/Login';
import { SignUp } from '../pages/SignUp';



export const Auth = () => {
    const [modal, onModal] = useState("modal");
    const [close, onClose] = useState("");


    const [modules, onModule] = useState("modules")
    return (
        <React.Fragment>
            <div className="link-container" >
                <div>
                    <p onClick={() => onModal("open")} >Log In</p>
                </div>
                <div>
                    <p onClick={() => onModule("openSignup")} >Sign Up</p>
                </div>
            </div>
            <div className={`${modal} ${close}`} >
                <Login
                    modal={modal} close={close} onModal={onModal} onClose={onClose} />
            </div>

            <div className={`${modules}`} >
                <SignUp
                    modules={modules}
                    onModule={onModule}
                    close={close} onClose={onClose} />
            </div>
        </React.Fragment>
    );
}