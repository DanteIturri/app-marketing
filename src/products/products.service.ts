import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { ProductDto } from './dto/products.dto';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(productDto: ProductDto) {
    try {
      const productSave = this.productModel.create(productDto);
      // Encuentra el usuario por su ID
      const updatedUser = await this.userModel.findByIdAndUpdate(
        productDto.userId,
        {
          $push: { products: (await productSave).id },
        },
        { new: true },
      );
      if (!updatedUser) {
        throw new NotFoundException(
          'Usuario no encontrado para relacionar el producto',
        );
      }
      return await productSave;
    } catch (error) {
      // Manejar errores según tus necesidades
      console.error(error);
      throw new InternalServerErrorException('Error al actualizar el Producto');
    }
  }

  async findAll() {
    const products = await this.productModel
      .find()
      .select('-userId')
      .populate({ path: 'posts', select: '-__v -userId -productId -planId' })
      .populate({ path: 'plans', select: '-__v -userId -productId -posts' })
      .exec();
    if (!products) {
      throw new NotFoundException('No se encontraron productos');
    }
    return products;
  }
  async getproduct(id: string) {
    const product = await this.productModel
      .findById(id)
      .select('-userId')
      .populate({ path: 'posts', select: '-__v -userId -productId -planId' })
      .populate({ path: 'plans', select: '-__v -userId -productId -posts' })
      .exec();

    if (!product) {
      throw new NotFoundException('producto no encontado');
    }

    return product;
  }

  async deleteProduct(id: string) {
    try {
      const deleteProduct = await this.productModel.findOneAndDelete({
        _id: id,
      });

      if (!deleteProduct) {
        throw new NotFoundException('no se encontro el producto para eliminar');
      }
      return {
        message: 'el producto fue borrado exitosamente',
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('error al borrar el productor');
    }
  }
  async update(id: string, productDto: ProductDto) {
    try {
      const updateProduct = await this.productModel.findOneAndUpdate(
        { _id: id },
        productDto,
      );
      if (!updateProduct) {
        throw new NotFoundException('Products not found');
      }
      return { message: 'producto actualizado' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Error interno del servidor a actualizar',
      );
    }
  }
}
