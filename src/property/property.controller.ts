import { Body, Controller, Delete, Get, Headers, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/IdParam.dto';
import { HeadersDto } from './dto/headers.dto';
import { ParseIdPipe } from './pipes/parseIdPipes';
import { ZodValidationPipe } from './pipes/zodValidationPipes';
import { CreatePropertySchema, CreatePropertyZodDto } from './dto/createPropertyZod.dto';
import { RequestHeader } from './pipes/request-header';
import { PropertyService } from './property.service';
import { UpdatePropertyDto } from './dto/updateProperty.sto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}


  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return  this.propertyService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.propertyService.findOne(id);
  }

  @Post()
  // @UsePipes(new ValidationPipe({whitelist:true, forbidNonWhitelisted:true,groups:['create']}))
  @UsePipes(new ZodValidationPipe(CreatePropertySchema))
  create(@Body() dto: CreatePropertyZodDto) {
    return this.propertyService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIdPipe) id,
    @Body() body: UpdatePropertyDto,
    // @Headers() headers : HeadersDto
    @RequestHeader(new ValidationPipe({ whitelist: true, validateCustomDecorators: true })) headers: HeadersDto
  ) {
    return this.propertyService.update(id, body);
  }

  @Delete(':id')
  delete(
    @Param('id', ParseIdPipe) id,
  ) {
    return this.propertyService.delete(id);
  }
}
