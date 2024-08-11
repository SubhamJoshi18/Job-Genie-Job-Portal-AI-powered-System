import { Router } from "express";
import { validateToken } from "../middleware/auth.middleware";
import { checkActiveMiddleware } from "../middleware/activate.middleware";
import { CompanyService } from "../services/company.service";
import { CompanyController } from "../controller/company.controller";
import { checkPermission } from "../middleware/rbac.middleware";
const companyRouter: Router = Router();
const companyService = new CompanyService();
const companyController = new CompanyController(companyService);

companyRouter.post(
  "/company",
  validateToken,
  checkActiveMiddleware,
  checkPermission("create_company"),
  companyController.registerCompany
);

companyRouter.get("/company", companyController.getAllCompany);

companyRouter;

export default companyRouter;
