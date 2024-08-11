import { NextFunction, Request, Response } from "express";
import { CompanyService } from "../services/company.service";
import { CreateCompanyDto } from "../dtos/company.dto";
import ApiError from "../utils/errors/app.error";

export class CompanyController {
  private companyService: CompanyService;

  constructor(companyService: CompanyService) {
    this.companyService = companyService;
  }

  private async sendResponse(
    res: Response,
    message: string,
    statusCode: number,
    data: any
  ) {
    return res.status(201).json({
      data: data,
      message: message,
      statusCode: statusCode,
    });
  }

  registerCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientId = req.user.user_id;
      const createCompanyDto: Required<CreateCompanyDto> = req.body;
      const data = await this.companyService.registerCompany(
        clientId,
        createCompanyDto
      );
      return this.sendResponse(res, "Company Register Successfully", 201, data);
    } catch (err: any | unknown) {
      next(err);
    }
  };

  getAllCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.companyService.getAllCompany();
      return this.sendResponse(
        res,
        "All Company Fetches Successfully",
        201,
        response
      );
    } catch (err: any | unknown) {
      next(err);
    }
  };
}
