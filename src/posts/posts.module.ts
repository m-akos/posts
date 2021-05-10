import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Post from './post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { InjectRepository } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule {}
