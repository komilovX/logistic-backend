import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator'
import { ContainerType } from 'src/handbook/entities/container-type.entity'
import { getRepository } from 'typeorm'
  
  @ValidatorConstraint({ async: true })
  export class IsContainerTypeExistConstraint implements ValidatorConstraintInterface {
    validate(containerTypeId: any) {
      if (typeof containerTypeId !== 'number') return false
      return getRepository(ContainerType)
        .findOne(containerTypeId)
        .then((containerType) => {
          if (!containerType) return false
          return true
        })
    }
  }
  
  export function IsContainerTypeExist(validationOptions?: ValidationOptions) {
    return function (object: unknown, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsContainerTypeExistConstraint,
      })
    }
  }
  