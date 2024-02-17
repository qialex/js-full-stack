export class SaltHashEncrypted {
    hash: string;
    salt: string;

    constructor(hash: string, salt: string) {
        this.hash = hash;
        this.salt = salt;
    }
}