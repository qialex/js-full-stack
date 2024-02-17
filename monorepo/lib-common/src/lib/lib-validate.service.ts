export class LibValidateService {

    static MIN_PASSWORD_LENGTH = 6;
    static MIN_ONE_TIME_PASSWORD_LENGTH = 4;
    
    static validateEmail(email: string): boolean {
        return !!String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }

    static validatePassword(password: string): boolean {
        return password.length >= LibValidateService.MIN_PASSWORD_LENGTH
    }
    static validateOneTimePassword(password: string): boolean {
        return password.length >= LibValidateService.MIN_ONE_TIME_PASSWORD_LENGTH
    }
    
}