import { Company } from "../../database/entities/company.entity";
import { CreateCompanyDto } from "../../dtos/company.dto";

export interface CompanyServiceInterface {
  registerCompany: (clientId: number, createCompany: CreateCompanyDto) => any;
  getAllCompany: () => Promise<Company[]>;
}
