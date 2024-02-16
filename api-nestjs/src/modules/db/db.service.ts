import { Injectable } from '@nestjs/common'
// import { DataSource } from 'typeorm'
// import { User } from './entities/user.entity'

@Injectable()
export class DbService {

  constructor(
    // private dataSource: DataSource,
  ) {}
  
  // async addUser(email: string, password: string) {
  //   const queryRunner = this.dataSource.createQueryRunner()
  //   await queryRunner.connect()
  //   await queryRunner.startTransaction()
  //   try {
  //     await queryRunner.manager.save(Users, {
  //       email, password
  //     })
  //     await queryRunner.commitTransaction()
  //   } catch (e) {
  //     await queryRunner.rollbackTransaction()
  //     throw e
  //   } finally {
  //     await queryRunner.release()
  //   }

  //   return true
  // }

  // get() { 
  //   return this.dataSource.query('SELECT * FROM ""')
  // }  
}
