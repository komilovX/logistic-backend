import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { User } from 'src/user/user.entity'
import { getRepository } from 'typeorm'

@ValidatorConstraint({ async: true })
export class IsUserExistConstraint implements ValidatorConstraintInterface {
  validate(userId: any) {
    console.log('userId', userId)
    return getRepository(User)
      .findOne(userId)
      .then((user) => {
        if (!user) return false
        return true
      })
  }
}

export function IsUserExist(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserExistConstraint,
    })
  }
}
