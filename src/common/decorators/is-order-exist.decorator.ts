import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { Order } from 'src/order/order.entity'
import { getRepository } from 'typeorm'

@ValidatorConstraint({ async: true })
export class IsOrderExistConstraint implements ValidatorConstraintInterface {
  validate(orderId: any) {
    console.log('orderId', orderId)
    return getRepository(Order)
      .findOne(orderId)
      .then((order) => {
        if (!order) return false
        return true
      })
  }
}

export function IsOrderExist(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsOrderExistConstraint,
    })
  }
}
