export interface Show {
    modal?: string
    close?: string
    onClose?: Function
    onModal?: Function
    history?: any
    onModule?: Function
    forgot?: string
    confirming?: string
    complete?: string
    otherNextMove?: Function
    nextMove?: Function
}

export interface SignUpShow {
    onModule: Function
    modules: string
    close: string
    onClose: Function
    success: boolean
    confirm: () => void
}