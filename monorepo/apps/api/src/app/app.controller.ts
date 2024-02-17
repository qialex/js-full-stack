import { Controller, Get, Post, Body } from '@nestjs/common';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    // private readonly appService: AppService,
  ) {}

  @Get('/users')
  getUsers() {
    return [];
  }

  @Get('/students')
  getStudents() {
    return [];
  }  
}
