import { ClientDto, LoginClientDto } from '../../dtos/user.dto';

export interface IClientServiceInterface {
  registerClient: (clientDto: ClientDto) => any;
  loginClient: (loginClientDto: LoginClientDto) => any;
  logoutClient: (clientId: number, token: string) => any;
}
