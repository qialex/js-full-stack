import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SaltHashEncrypted } from './salt-hash-encrypted'
import { createHash, randomBytes } from "crypto";

@Injectable()
export class EncryptService {

  private PFEFFER: string = this.configService.get('ENCRYPT_PASSWORD_PFEFER') || ''

  constructor(
    private configService: ConfigService,
  ) {}

  encryptPassword(password: string): SaltHashEncrypted {

    const salt = randomBytes(128).toString('base64');

    const passhash: string = this.convertToHash(password, salt)

    return new SaltHashEncrypted(passhash, salt)
  }

  checkPassword(password: string, dbSalt: string, dbHash: string): boolean {
    
    return this.convertToHash(password, dbSalt) === dbHash
  }

  private convertToHash(password: string, salt: string): string {

    return createHash('sha256')
      .update(`${password}${this.PFEFFER}`)
      .update(createHash('sha256').update(salt, 'utf8').digest('hex'))
      .digest('hex')
  }
}
