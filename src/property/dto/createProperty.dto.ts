import { IsPositive, IsString, Length } from "class-validator";

export class CreatePropertyDto {
  @IsString()
  @Length(3, 10)
  name: string;

  @IsString()
  @Length(1, 10, { groups: ['create'] })
  @Length(1, 15, { groups: ['update'] })
  description: string;

  @IsPositive()
  price: number;
}