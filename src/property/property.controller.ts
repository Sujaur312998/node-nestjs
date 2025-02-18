import { Body, Controller, Get, Headers, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/IdParam.dto';
import { HeadersDto } from './dto/headers.dto';
import { ParseIdPipe } from './pipes/parseIdPipes';
import { ZodValidationPipe } from './pipes/zodValidationPipes';
import { CreatePropertySchema, CreatePropertyZodDto } from './dto/createPropertyZod.dto';
import { RequestHeader } from './pipes/request-header';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {
  }


  @Get()
  findAll() {
    return  this.propertyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id, @Query('sort', ParseBoolPipe) sort) {
    return this.propertyService.findOne();
  }

  @Post()
  // @UsePipes(new ValidationPipe({whitelist:true, forbidNonWhitelisted:true,groups:['create']}))
  @UsePipes(new ZodValidationPipe(CreatePropertySchema))
  create(@Body() body: CreatePropertyZodDto) {
    return this.propertyService.create();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIdPipe) id,
    @Body() body: CreatePropertyDto,
    // @Headers() headers : HeadersDto
    @RequestHeader(new ValidationPipe({ whitelist: true, validateCustomDecorators: true })) headers: HeadersDto
  ) {
    return this.propertyService.update();
  }
}
