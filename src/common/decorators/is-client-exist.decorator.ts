import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { Client } from 'src/handbook/entities/client.entity'
import { getRepository } from 'typeorm'

@ValidatorConstraint({ async: true })
export class IsClientExistConstraint implements ValidatorConstraintInterface {
  validate(clientId: any) {
    if (typeof clientId !== 'number') return false
    return getRepository(Client)
      .findOne(clientId)
      .then((client) => {
        if (!client) return false
        return true
      })
  }
}

export function IsClientExist(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsClientExistConstraint,
    })
  }
}
