import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// CREATE TABLE user (
//   id SERIAL PRIMARY KEY,
//   email VARCHAR(255) UNIQUE NOT NULL,
//   password VARCHAR(1024) NOT NULL DEFAULT '',
//   salt VARCHAR(1024) NOT NULL DEFAULT '',
//   is_email_confirmed INT NOT NULL DEFAULT 0,
//   ts_created TIMESTAMP DEFAULT NOW()
// );

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  salt: string;  

  @Column({ nullable: false })
  is_email_confirmed: number;

  @Column()
  ts_created: Date;
}