import { Base } from '@dto/base';
import { RoleBase } from '../role-base';

export class UpdateRoleDto extends RoleBase implements Base {
    _id: string;
}
