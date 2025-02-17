import { Body, Controller, Get, Headers, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/IdParam.dto';
import { HeadersDto } from './dto/headers.dto';
import { ParseIdPipe } from './pipes/parseIdPipes';
import { ZodValidationPipe } from './pipes/zodValidationPipes';
import { CreatePropertySchema, CreatePropertyZodDto } from './dto/createPropertyZod.dto';

@Controller('property')
export class PropertyController {
  @Get()
  findAll() {
    return 'This action returns all properties';
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id, @Query('sort', ParseBoolPipe) sort) {
    console.log(typeof id, id);
    console.log(typeof sort, sort);
    return id;
  }

  @Post()
  // @UsePipes(new ValidationPipe({whitelist:true, forbidNonWhitelisted:true,groups:['create']}))
  @UsePipes(new ZodValidationPipe(CreatePropertySchema))
  create(@Body() body: CreatePropertyZodDto) {
    return body;
  }

  @Patch(':id')
  update(
    @Param('id', ParseIdPipe)id,
    @Body() body: CreatePropertyDto,
    @Headers('host') headers : HeadersDto
  ) {
    return body;
  }
}
