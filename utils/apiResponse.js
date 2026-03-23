export class ApiRespose{
    constructor(status,data,message="success"){
        this.status = status,
        this.message = message,
        this.success = status < 400
        this.data = data
    }
}