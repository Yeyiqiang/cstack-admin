
export function resultSuccess(result:object){
    return {
        code: 0,
        msg: 'OK',
        result
    }
}

export function resultError(err:string){
    return {
        code: -1,
        msg: err,
        result: err
    }
}

export function responseError(err:object){
    return {
        code: -1,
        msg: '请求失败',
        err: err
    }
}