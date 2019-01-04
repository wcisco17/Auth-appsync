export interface Show {
    modal?: string
    close?: string
    onClose?: Function
    onModal: Function
}

export interface SignUpShow {
    onModule: Function
    modules: string
    close: string
    onClose: Function
    success: boolean
    confirm: () => void
}