export interface CreateCompanyDto {
  company_name: string;
  company_created_at: Date;
  address: {
    city: string;
    country: string;
    postal_code: number;
  };
}
