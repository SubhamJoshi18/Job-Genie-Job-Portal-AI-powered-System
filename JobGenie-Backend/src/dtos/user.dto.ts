export interface ClientDto {
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  email: string;
  role?: string;
  password: string;
}

export interface LoginClientDto {
  email: string;
  password: string;
}
