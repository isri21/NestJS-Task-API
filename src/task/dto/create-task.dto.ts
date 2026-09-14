import { MinLength } from 'class-validator'
export class CreateTaskDto {    
    @MinLength(5)
    name: string
    status: string
}
