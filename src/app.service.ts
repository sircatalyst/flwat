import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostRuleValidationDTO } from './app.dto';
import { _responseType } from './app.interface';

@Injectable()
export class AppService {
  getHello(): _responseType {
    const data: _responseType = {
      message: 'My Rule-Validation API',
      status: 'success',
      data: {
        name: 'Temitope Bamidele',
        github: '@sircatalyst',
        email: 'temibami@gmail.com',
        mobile: '08134849551',
        twitter: '@sircatalyst',
      },
    };
    return data;
  }

  handlePostValidateRule(payload): _responseType {
    const isRuleFieldNested = payload.rule.field.includes('.');
    let payloadCondition: boolean = false;
    let firstNestedDataObject: string;
    let secondNestedDataObject: string;

    if (isRuleFieldNested) {
      firstNestedDataObject = payload.rule.field.split('.')[0];
      secondNestedDataObject = payload.rule.field.split('.')[1];
    }

    switch (payload.rule.condition) {
      case 'eq':
        payloadCondition = isRuleFieldNested
          ? payload.data[firstNestedDataObject][secondNestedDataObject] ===
            payload.rule.condition_value
          : payload.data[payload.rule.field] === payload.rule.condition_value;
        break;
      case 'neq':
        payloadCondition = isRuleFieldNested
          ? payload.data[firstNestedDataObject][secondNestedDataObject] !==
            payload.rule.condition_value
          : payload.data[payload.rule.field] !== payload.rule.condition_value;
        break;
      case 'gt':
        payloadCondition = isRuleFieldNested
          ? payload.data[firstNestedDataObject][secondNestedDataObject] >
            payload.rule.condition_value
          : payload.data[payload.rule.field] > payload.rule.condition_value;
        break;
      case 'gte':
        payloadCondition = isRuleFieldNested
          ? payload.data[firstNestedDataObject][secondNestedDataObject] >=
            payload.rule.condition_value
          : payload.data[payload.rule.field] >= payload.rule.condition_value;
        break;
      case 'contains':
        payloadCondition = isRuleFieldNested
          ? payload.data[firstNestedDataObject][
              secondNestedDataObject
            ].includes(payload.rule.condition_value)
          : Object.keys(payload.data[payload.rule.field]).includes(
              payload.rule.condition_value,
            );
        break;
      default:
        break;
    }

    const response: _responseType = {
      message: payloadCondition
        ? `field ${payload.rule.field} successfully validated.`
        : `field ${payload.rule.field} failed validation.`,
      status: payloadCondition ? 'success' : 'error',
      data: {
        validation: {
          error: payloadCondition ? false : true,
          field: payload.rule.field,
          field_value: isRuleFieldNested
            ? payload.data[firstNestedDataObject][secondNestedDataObject]
            : payload.data[payload.rule.field],
          condition: payload.rule.condition,
          condition_value: payload.rule.condition_value,
        },
      },
    };
    if (!payloadCondition) {
      throw new HttpException(response, HttpStatus.BAD_REQUEST);
    } else {
      return response;
    }
  }
}
