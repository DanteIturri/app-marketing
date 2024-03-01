import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postsService.getPost(id);
  }

  @Post('create')
  createPost(@Body() postDto: PostDto) {
    return this.postsService.create(postDto);
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() postDto: PostDto) {
    return this.postsService.updatePost(id, postDto);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }
}
