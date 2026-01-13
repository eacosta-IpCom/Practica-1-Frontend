export interface IGenericResponse <T> {
    status: number,
    message: string,
    payload:T
}
