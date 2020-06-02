import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowdStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ]
  transform(value: any) {
    value = value.toUpperCase()
    
    if (!this.isStatusValid(value))
      throw new BadRequestException(`${value} is not valid status`)
    
    return value
  }

  private isStatusValid(status: any) {
    const idx = this.allowdStatuses.indexOf(status)
    return idx !== -1
  }
} 
