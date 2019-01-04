import * as React from 'react'

export const Navigation = ({ children, contentChildren }: any) => {
    return (
        <React.Fragment>
            <nav className="nav-container" >
                <div>
                    <p style={{ color: "white" }} >logo</p>
                </div>
                <div>

                    {children}
                </div>
            </nav>
            {contentChildren}
        </React.Fragment>
    );
}