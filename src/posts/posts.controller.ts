import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postService: PostsService
    ) {}

    @Get()
    async getAllPosts() {
        return this.postService.getAllPosts();
    }

    @Get(':id')
    getPostById(@Param('id') id: string) {        
        return this.postService.getPostById(Number(id));
    }

    @Post()
    async createPost(@Body() post: CreatePostDto) {        
        return  this.postService.createPost(post);        
    }

    @Put(':id')    
    async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) { // miért kell a id param, mikor a body tartalmazza az id-t        
        return this.postService.updatePost( Number(id), post);
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        console.log("delete");
        this.postService.deletePost(Number(id))
    }
}
