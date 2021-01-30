import {
  IsString,
  IsNotEmpty,
  IsObject,
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum Conditions {
  eq,
  neq,
  gt,
  gte,
  contains,
}

class ruleDTO {
  @IsDefined({ message: 'field is required.' })
  @IsNotEmpty({ message: 'field is required.' })
  field: string | object;

  @IsNotEmpty({ message: 'field is required.' })
  @IsDefined({ message: 'field is required.' })
  @IsString({ message: 'field should be a string.' })
  @IsEnum(Conditions)
  condition: string;

  @IsNotEmpty()
  @IsDefined()
  condition_value: number | string;
}

export class PostRuleValidationDTO {
  @Type(() => ruleDTO)
  @IsDefined({ message: 'rule is required.' })
  @IsNotEmptyObject()
  @IsNotEmpty({ message: 'rule is required.' })
  @IsObject({ message: 'rule should be an object.' })
  rule: ruleDTO;

  @IsNotEmpty({ message: 'data is required.' })
  @IsDefined({ message: 'data is required.' })
  data: string | object;
}
