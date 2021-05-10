import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import Post from './post.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
    ) { }

    private lastPostId = 0;
    private posts: Post[] = [];

    async getAllPosts() {
        // return this.posts;
        console.log('service get all');
        this.postsRepository.find();
    }

    async createPost(post: CreatePostDto) {
        const newPost = await this.postsRepository.create(post);
        await this.postsRepository.save(newPost);
        return newPost;

        /* const newPost = {
            id: ++this.lastPostId,
            ...post
        }

        this.posts.push(newPost); */
        return newPost;
    }

    async getPostById(id: number) {
        const post = await this.postsRepository.findOne(id);
        // const post = this.posts.find(post => post.id === id);

        if (post) {
            return post;
        }
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    replacePost(id: number, post: UpdatePostDto) {
        const postIndex = this.posts.findIndex(post => post.id === id);
        if (postIndex > -1) {
            this.posts[postIndex] = post;
            return post;
        }
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    async updatePost(id: number, post: UpdatePostDto) {
        await this.postsRepository.update(id, post);
        const updatedPost = await this.postsRepository.findOne(id);
        if(updatedPost) {
            return updatedPost;
        }
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    async deletePost(id: number) {
        /* const postIndex = this.posts.findIndex(post => post.id === id);
        if (postIndex > -1) {
            this.posts.splice(postIndex, 1);
        } else {
            throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
        } */

        const deleteResponse = await this.postsRepository.delete(id);
        if(!deleteResponse.affected) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
        
    }
}
