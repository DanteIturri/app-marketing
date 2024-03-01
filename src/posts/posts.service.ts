import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Post } from './schemas/posts.schemas';
import { PostDto } from './dto/post.dto';
import { Plan } from 'src/plans/schemas/plans.schema';
import { Product } from 'src/products/schemas/product.schema';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(Plan.name) private planModel: Model<Plan>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  findAll() {
    return this.postModel.find().select('-userId -productId -planId');
  }

  async getPost(id: string) {
    return await this.postModel
      .findById(id)
      .select('-userId -productId -planId');
  }
  async create(postDto: PostDto) {
    try {
      const postSave = this.postModel.create(postDto);
      // Encuentra el usuario por su ID
      const updatedUser = await this.userModel.findByIdAndUpdate(
        postDto.userId,
        {
          $push: { posts: (await postSave).id },
        },
        { new: true },
      );
      // Encuentra el plan por su ID
      const updatedPlan = await this.planModel.findByIdAndUpdate(
        postDto.planId,
        {
          $push: { posts: (await postSave).id },
        },
      );
      // Encuentra el producto por su ID
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        postDto.productId,
        {
          $push: { posts: (await postSave).id },
        },
        { new: true },
      );

      if (!updatedUser || !updatedPlan || !updatedProduct) {
        throw new NotFoundException(
          'Ninguna de las referencias fue encontrada',
        );
      }

      return { message: 'posts creado con exito' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al crear el Post');
    }
  }

  async updatePost(id: string, postDto: PostDto) {
    try {
      console.log(postDto);
      const updatePost = await this.postModel.findOneAndUpdate(
        { _id: id },
        postDto,
      );

      if (!updatePost) {
        throw new NotFoundException('No se encontro el post a actualizar');
      }

      return { message: 'Se actualizo correctamente el post' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al actualizar el Post');
    }
  }

  async deletePost(id: string) {
    try {
      // Encuentra el usuario que tiene la referencia al post y elimina la referencia
      const user = await this.userModel.findOneAndUpdate(
        { posts: id },
        { $pull: { posts: id } },
        { new: true },
      );

      // Encuentra el plan que tiene la referencia al post y elimina la referencia
      const plan = await this.planModel.findOneAndUpdate(
        { posts: id },
        { $pull: { posts: id } },
        { new: true },
      );

      // Encuentra el producto que tiene la referencia al post y elimina la referencia
      const product = await this.productModel.findOneAndUpdate(
        { posts: id },
        { $pull: { posts: id } },
        { new: true },
      );

      // Elimina el post;
      const postToDelete = await this.postModel.findByIdAndDelete(id);

      if (!postToDelete) {
        throw new NotFoundException('No se encontro el post a eliminar');
      }

      if (!user || !plan || !product) {
        throw new NotFoundException(
          'No se encontraron todas las referencias asociadas al post',
        );
      }

      return { message: 'Post y referencias eliminados con éxito' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Error al eliminar el Post y referencias',
      );
    }
  }
}
