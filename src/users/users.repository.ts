import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) { }

    async create(userData: Partial<User>): Promise<User> {
        const user = this.repository.create(userData);
        return await this.repository.save(user);
    }

    async findAll(page: number, limit: number): Promise<{ users: User[]; total: number }> {
        const skip = (page - 1) * limit;

        const [users, total] = await this.repository.findAndCount({
            skip,
            take: limit,
            order: {
                timestamp: 'DESC',
            },
        });

        return { users, total };
    }

    async findByDate(date: string): Promise<User[]> {
        return await this.repository
            .createQueryBuilder('user')
            .where('DATE(user.timestamp) = :date', { date })
            .orderBy('user.timestamp', 'DESC')
            .getMany();
    }

    async findOne(id: string): Promise<User | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
