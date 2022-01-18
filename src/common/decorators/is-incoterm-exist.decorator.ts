import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { Incoterm } from 'src/handbook/entities/incoterm.entity'
import { getRepository } from 'typeorm'

@ValidatorConstraint({ async: true })
export class IsIncotermExistConstraint implements ValidatorConstraintInterface {
  validate(incotermId: any) {
    if (typeof incotermId !== 'number') return false
    return getRepository(Incoterm)
      .findOne(incotermId)
      .then((incoterm) => {
        if (!incoterm) return false
        return true
      })
  }
}

export function IsIncotermExist(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsIncotermExistConstraint,
    })
  }
}
