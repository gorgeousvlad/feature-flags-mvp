import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { FeatureFlagsService } from './feature-flags.service';
import { CreateFeatureFlagDto } from './dto/create-feature-flag.dto';
import { UpdateFeatureFlagDto } from './dto/update-feature-flag.dto';

@Controller('api/feature-flags')
export class FeatureFlagsController {
  constructor(private readonly featureFlagsService: FeatureFlagsService) {}

  @Post()
  create(@Body() createFeatureFlagDto: CreateFeatureFlagDto) {
    return this.featureFlagsService.create(createFeatureFlagDto);
  }

  @Get()
  findAll(
    @Query('services') services: string[] | undefined,
    @Query('take') take: number | undefined,
    @Query('skip') skip: number | undefined,
  ) {
    return this.featureFlagsService.findAll({ services, take, skip });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.featureFlagsService.findOne(+id);

    if (!result) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFeatureFlagDto: UpdateFeatureFlagDto,
  ) {
    return this.featureFlagsService.update(+id, updateFeatureFlagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.featureFlagsService.remove(+id);
  }
}
