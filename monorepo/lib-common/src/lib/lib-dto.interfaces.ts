// export declare namespace LibCommonDto {
    export interface EmailDto {
        email: string,    
    }
    
    export interface AuthReqDto extends EmailDto {
        email: string,    
        password: string, 
    }
    
    export interface AuthResDto extends EmailDto {
        email: string,    
        id: number,
        token: string,
    }
// }
