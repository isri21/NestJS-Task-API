import { Column, Entity, PrimaryGeneratedColumn } from "typeorm/browser";

@Entity()
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column({default: "Todo"})
    status: string
}
