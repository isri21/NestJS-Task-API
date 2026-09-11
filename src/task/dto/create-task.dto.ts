import { IsEmail, Min } from 'class-validator'
export class CreateTaskDto {    
    @Min(5)
    name: string
    status: string
}
