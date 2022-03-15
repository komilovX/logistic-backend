import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { Consignee } from 'src/handbook/entities/consignee.entity'
import { getRepository } from 'typeorm'

@ValidatorConstraint({ async: true })
export class IsConsigneeExistConstraint
  implements ValidatorConstraintInterface
{
  validate(consigneeId: any) {
    if (typeof consigneeId !== 'number') return false
    return getRepository(Consignee)
      .findOne(consigneeId)
      .then((consignee) => {
        if (!consignee) return false
        return true
      })
  }
}

export function IsConsigneeExist(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsConsigneeExistConstraint,
    })
  }
}
