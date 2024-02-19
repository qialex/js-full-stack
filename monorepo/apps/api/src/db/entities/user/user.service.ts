import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm'
import { User } from './user.entity';
import { EncryptService, SaltHashEncrypted } from './../../../encrypt'
import { AuthUserReqDto, AuthUserDto, messagesDto, ErrorDto } from '@monorepo/lib-common'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
    private encryptService: EncryptService,
  ) {}

  async addOne(authReqDto: AuthUserReqDto): Promise<AuthUserDto|Error> {
    let result: AuthUserDto|Error
    const user: User = {...authReqDto} as User
    let queryRunner
    try {
      // Encrypt password
      const saltHashEncrypted: SaltHashEncrypted = this.encryptService.encryptPassword(authReqDto.password)
      user.password = saltHashEncrypted.hash
      user.salt = saltHashEncrypted.salt

      const queryRunner = this.dataSource.createQueryRunner()
      await queryRunner.connect()
      await queryRunner.startTransaction()

      const usersRepositorySave: User = await this.usersRepository.save(user)
      if (usersRepositorySave) {
        result = {id: usersRepositorySave.id, email: usersRepositorySave.email}
      }

      await queryRunner.commitTransaction()
    } catch (e) {
      if (queryRunner) {
        await queryRunner.rollbackTransaction()
      }
      result = e
    } finally {
      if (queryRunner) {
        await queryRunner.release()
      }
    }

    return result
  }  

  async findOne(email: string, password: string): Promise<AuthUserDto|ErrorDto> {
    const user: User = await this.usersRepository.findOneBy({ email })
    if (!user) {
      return messagesDto.USER_NOT_FOUNT
    }
    const isPasswordMatch = this.encryptService.checkPassword(password, user.salt, user.password)

    return isPasswordMatch ? {id: user.id, email: user.email} as AuthUserDto : messagesDto.WRONG_PASSWORD
  }


  // findAll(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }
  // async remove(id: number): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}