import { ClientProfileDto } from '../../dtos/userProfile.dto';

export interface IClientProfileInterface {
  createClientSetting: (
    clientId: number,
    ClientProfile: ClientProfileDto
  ) => any;
  activateAccount: (clientId: number, status: boolean) => any;
  viewProfile: (clientId: number) => any;
}
