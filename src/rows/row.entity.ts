import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('rows')
export class Row {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    sheetName: string;

    @Column({ nullable: false })
    row: number;

    @Column({ nullable: false })
    column: number;

    @Column({ nullable: false })
    value: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
