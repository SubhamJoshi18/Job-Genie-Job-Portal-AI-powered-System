import { NextFunction, Request, Response } from 'express';
import { IClientProfileInterface } from '../interface/userProfile/userProfile.interface';
import { ClientProfileService } from '../services/clientProfile.service';
import { ClientProfileDto } from '../dtos/userProfile.dto';

type errorType = any | unknown;

export class ClientProfileController {
  private clientProfileService: ClientProfileService;

  constructor(clientProfileService: IClientProfileInterface) {
    this.clientProfileService = clientProfileService;
  }

  private async sendResponse(
    res: Response,
    message: string,
    statusCode: number,
    data: any
  ) {
    return res.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      data: data,
    });
  }

  createClientSetting = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const clientId = req.user.user_id;
      const clientSettingDto: Partial<ClientProfileDto> = req.body;
      const data = await this.clientProfileService.createClientSetting(
        clientId,
        clientSettingDto
      );
      return this.sendResponse(
        res,
        'Client Profile Setting Updated',
        201,
        data
      );
    } catch (err: errorType) {
      next(err);
    }
  };

  viewUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientId = req.user.user_id;
      const data = await this.clientProfileService.viewProfile(clientId);
      return this.sendResponse(res, 'Client Profile fetches', 201, data);
    } catch (err: any | unknown) {
      next(err);
    }
  };
  activateAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientId = req.user.user_id;
      const active_status: boolean | any = req.query.status;
      const data = await this.clientProfileService.activateAccount(
        clientId,
        active_status
      );
      return this.sendResponse(
        res,
        'Updated Operation Successfully',
        201,
        data
      );
    } catch (err: any | unknown) {
      next(err);
    }
  };
}
