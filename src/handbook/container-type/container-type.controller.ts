import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { CreateContainerTypeDto } from '../dto/container-type.dto';
import { ContainerType } from '../entities/container-type.entity';
import { ContainerTypeService } from './container-type.service';

@ApiBearerAuth()
@ApiTags('ContainerType')
@Crud({
  model: {
    type: ContainerType,
  },
  dto: {
    create: CreateContainerTypeDto,
    update: CreateContainerTypeDto,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@Controller('handbook/container-type')
export class ContainerTypeController implements CrudController<ContainerType> {
  constructor(public service: ContainerTypeService) {}
}