import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    numeroDocumento: string;

    @Column()
    timestamp: string;

    @BeforeInsert()
    setTimestamp() {
        this.timestamp = new Date().toISOString();
    }
}

