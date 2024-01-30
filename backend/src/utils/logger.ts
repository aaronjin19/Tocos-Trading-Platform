export const info = (...param: any[]) => {
    console.log(...param)
}

export const error = (...param: any[]) => {
    console.error(...param)
}

const Logger = {
    info, error
}

export default Logger;