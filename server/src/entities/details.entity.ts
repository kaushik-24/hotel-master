import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import Base from './base.entity'
// import Media from '../med'
import { Auth } from './auth.entity'

@Entity('auth_details')
export class AuthDetails extends Base {

    @Column({ name: 'name', type: 'json' })
    name: 'name'

    // @Column({ name: 'first_name', type: 'json' })
    // firstName: 'first name' 

    // @Column({ name: 'middle_name', type: 'json', nullable: true })
    // middleName: IMultiLanguage | null

    // @Column({ name: 'last_name', type: 'json' })
    // lastName: IMultiLanguage

    @Column({ name: 'phone_number', nullable: true })
    phoneNumber: string

    @OneToOne(() => Auth, (auth: Auth) => auth.details, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'auth_id' })
    auth: Auth

}
