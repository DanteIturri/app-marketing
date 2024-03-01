import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Plan } from './schemas/plans.schema';
import { PlanDto } from './dto/plan.dto';
import { User } from 'src/users/schemas/user.schema';
import { Product } from 'src/products/schemas/product.schema';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlanService {
  constructor(
    @InjectModel(Plan.name) private planModel: Model<Plan>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async findAll() {
    return await this.planModel
      .find()
      .populate({ path: 'posts', select: '-userId -productId -planId' })
      .select('-userId -productId');
  }

  async getPlan(id: string) {
    return await this.planModel
      .findById(id)
      .populate({ path: 'posts', select: '-userId -productId -planId' })
      .select('-userId -productId');
  }
  async create(planCreateDto: PlanDto) {
    try {
      const planSave = this.planModel.create(planCreateDto);
      // Encuentra el usuario por su ID y actualiza el array de plan
      const updatedUserPlan = await this.userModel.findByIdAndUpdate(
        planCreateDto.userId,
        { $push: { plans: (await planSave).id } },
        { new: true },
      );
      // Encuentra el producto por su ID
      const updatedProductPlan = await this.productModel.findByIdAndUpdate(
        planCreateDto.productId,
        { $push: { plans: (await planSave).id } },
        { new: true },
      );
      if (!updatedUserPlan || !updatedProductPlan) {
        throw new NotFoundException(
          'Ninguna de las referencias fue encontrada',
        );
      }
      return await planSave;
    } catch (error) {
      // Manejar errores según tus necesidades
      console.error(error);
      throw new InternalServerErrorException('Error al crear el plan');
    }
  }

  async deletePlan(id: string) {
    try {
      const deletePlan = await this.planModel.findOneAndDelete({ _id: id });
      if (!deletePlan) {
        throw new NotFoundException('lo que intentas borrar no existe');
      }
      return { message: 'plan eliminado con exito' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al borrar el plan');
    }
  }
  async update(id: string, planDto: UpdatePlanDto) {
    try {
      const updatePlan = await this.planModel.findOneAndUpdate(
        { _id: id },
        planDto,
      );
      if (!updatePlan) {
        throw new NotFoundException('update not found');
      }

      return { message: 'update found' };
    } catch (error) {
      throw new InternalServerErrorException('error al actualizar plan');
    }
  }
}
