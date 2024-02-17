import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm'
import { User } from './user.entity';
import { EncryptService, SaltHashEncrypted } from './../../../encrypt'


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
    private encryptService: EncryptService,
  ) {}

  async addOne(user: User): Promise<User|Error> {
    let result: User|Error
    let queryRunner
    try {
      // Encrypt password
      const saltHashEncrypted: SaltHashEncrypted = this.encryptService.encryptPassword(user.password)
      user.password = saltHashEncrypted.hash
      user.salt = saltHashEncrypted.salt

      const queryRunner = this.dataSource.createQueryRunner()
      await queryRunner.connect()
      await queryRunner.startTransaction()

      result = await this.usersRepository.save({ ...user })
      result = {id: result.id, email: result.email} as User
      
      await queryRunner.commitTransaction()
    } catch (e) {
      if (queryRunner) {
        await queryRunner.rollbackTransaction()
      }

      if (e.driverError.code == 23505) {
        result = {name: 'DB_23505', message: 'email_already_exist'}
      } else {
        result = e
      }
    } finally {
      if (queryRunner) {
        await queryRunner.release()
      }
    }

    return result
  }  

  async findOne(email: string, password: string): Promise<User|Error> {
    const user: User = await this.usersRepository.findOneBy({ email })
    if (!user) {
      return {id: 0, email: ''} as User
    }
    const isPasswordMatch = this.encryptService.checkPassword(password, user.salt, user.password)

    return isPasswordMatch ? {id: user.id, email: user.email} as User : {name: 'AUTH_1', message: 'wrong_password'} as Error
  }

  // findAll(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }
  // async remove(id: number): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}