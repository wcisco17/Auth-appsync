import * as React from 'react'
import { useState } from 'react';

export const Navigation = ({ children }: any) => {
    const [modal, onModal] = useState("modal");
    const [close, onClose] = useState("");


    const [modules, onModule] = useState("modules")
    return (
        <React.Fragment>
            <nav className="nav-container" >
                <div>
                    <p style={{ color: "white" }} >logo</p>
                </div>
                {children}
            </nav>
        </React.Fragment>
    );
}