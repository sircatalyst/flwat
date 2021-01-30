import { HttpException, HttpStatus } from '@nestjs/common';
import { PostRuleValidationDTO } from './app.dto';

/**
 * @description validates update user details
 */
export const customValidator = (payload: PostRuleValidationDTO): void => {
  //Ensure the type for payload.data object is right and handle error message
  if (typeof payload.data !== 'string' && typeof payload.data !== 'object') {
    throw new HttpException(
      'data should be an object, array or string.',
      HttpStatus.BAD_REQUEST,
    );
  }

  //Ensure the type for payload.rule object is right and handle error message
  if (typeof payload.rule !== 'object') {
    throw new HttpException(
      'rule should be an object.',
      HttpStatus.BAD_REQUEST,
    );
  }

  //Ensure the type for payload.rule object is right and handle error message
  if (typeof payload.rule.field === 'undefined') {
    throw new HttpException(
      'rule.field is required.',
      HttpStatus.BAD_REQUEST,
    );
  }

  // Check if payload.rule.field is a string and its value is in payload.data
  if (
    typeof payload.rule.field === 'string' &&
    typeof payload.data === 'object'
  ) {

    // Check if payload.rule.field value point to a value of object type and validate
    if (payload.rule.field.includes('.')) {
      const ruleFieldObjectKey = payload.rule.field.split('.')[0];
      const ruleFieldNestedObjectKey = payload.rule.field.split('.')[1];

      if (!Object.keys(payload.data).includes(ruleFieldObjectKey)) {
        throw new HttpException(
          `field ${ruleFieldObjectKey} is missing from data.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (
        !Object.keys(payload.data[ruleFieldObjectKey]).includes(
          ruleFieldNestedObjectKey,
        )
      ) {
        throw new HttpException(
          `field ${ruleFieldNestedObjectKey} is missing from data.${ruleFieldObjectKey}.`,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return;
      }
    }
    if (!Object.keys(payload.data).includes(payload.rule.field)) {
      throw new HttpException(
        `field ${payload.rule.field} is missing from data.`,
        HttpStatus.BAD_REQUEST,
      );
    }

  }
};
