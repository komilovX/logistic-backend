import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { Agent } from 'src/handbook/entities/agent.entitiy'
import { getRepository } from 'typeorm'

@ValidatorConstraint({ async: true })
export class IsAgentExistConstraint implements ValidatorConstraintInterface {
  validate(agentId: any) {
    if (typeof agentId !== 'number') return false
    return getRepository(Agent)
      .findOne(agentId)
      .then((agent) => {
        if (!agent) return false
        return true
      })
  }
}

export function IsAgentExist(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAgentExistConstraint,
    })
  }
}
