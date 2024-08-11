import { Company } from "../database/entities/company.entity";
import { Employee } from "../database/entities/employee.entity";
import { User } from "../database/entities/user.entity";
import { CreateCompanyDto } from "../dtos/company.dto";
import { CompanyServiceInterface } from "../interface/company/comapny.interface";
import ApiError from "../utils/errors/app.error";
import { getNames } from "country-list";

export class CompanyService implements CompanyServiceInterface {
  registerCompany: (
    clientId: number,
    createCompanyDto: CreateCompanyDto
  ) => any = async (cleintId: number, createCompanyDto: CreateCompanyDto) => {
    const user = await User.createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.id = :id", { id: cleintId as number })
      .getOne();
    const { company_name, company_created_at } = createCompanyDto;
    const sameCompanyName = await Company.findOne({
      where: {
        company_name: company_name,
      },
    });
    const allCountries = getNames();
    const checkCountry = allCountries.includes(
      createCompanyDto.address.country
    );
    if (!checkCountry) {
      throw new ApiError(`Country is not valid`, 401);
    }
    const testQuery = await Company.createQueryBuilder()
      .select("company")
      .from(Company, "company")
      .where("company.company_name = :company_name", {
        company_name: company_name,
      })
      .getMany();

    if (sameCompanyName || testQuery.length > 0) {
      throw new ApiError(
        `${company_name} is already exists,Please try another name`,
        401
      );
    }

    const createComany = Company.create({
      company_name: company_name,
      company_created_at: company_created_at,
      address: createCompanyDto.address,
      user: user,
    });
    const userCompany = await createComany.save();
    user.company = userCompany;
    await user.save();

    const findUserCompany = await User.createQueryBuilder()
      .select("user")
      .from(User, "user")
      .leftJoinAndSelect("user.company", "company")
      .where("user.id = :id", { id: cleintId as number })
      .getOne();
    const checkRole =
      (await Employee.createQueryBuilder()
        .select("employee")
        .from(Employee, "employee")
        .getCount()) === 0
        ? "manager"
        : "employee";

    const createEmployee = Employee.create({
      employee_expected_salary: 20000,
      employee_role: checkRole,
    });
    const savedEmployee = await createEmployee.save();
    user.employee = savedEmployee;
    await user.save();

    userCompany.employee = [savedEmployee];
    await userCompany.save();
    await Company.createQueryBuilder()
      .update(Company)
      .set({ company_employee: 1 })
      .where("company.id = :id", { id: findUserCompany.company.id })
      .execute();

    const message = `${user.firstName} Has Register A New Company`;
    return message;
  };

  getAllCompany: () => Promise<Company[]> = async () => {
    const comapnys = await Company.find({
      relations: {
        job: true,
      },
    });

    if (!comapnys) {
      throw new ApiError("Currently Company Are Registered", 403);
    }
    return comapnys;
  };
}
