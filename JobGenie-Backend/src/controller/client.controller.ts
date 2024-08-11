import { NextFunction, Request, Response } from 'express';
import { ClientService } from '../services/client.service';

import { ClientDto, LoginClientDto } from '../dtos/user.dto';
import HttpStatusCode from 'http-status-codes';
import ApiError from '../utils/errors/app.error';
import { AuthError } from '../utils/errors/auth.error';
export class ClientController {
  private clientService: ClientService;

  constructor(clientService: ClientService) {
    this.clientService = clientService;
  }

  private async sendResponse(
    res: Response,
    message: string,
    statusCode: number,
    data: any,
    extra_data = null
  ): Promise<any> {
    return res.status(statusCode).json({
      message: message,
      data: data,
      extra_data: extra_data,
    });
  }

  registerClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientDto: Partial<ClientDto> = req.body;
      const data = await this.clientService.registerClient(
        clientDto as ClientDto
      );
      return this.sendResponse(
        res,
        'Client Register Successfully',
        HttpStatusCode.OK,
        data
      );
    } catch (err) {
      next(err);
    }
  };

  loginClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginClientDto: ClientDto = req.body;
      const data = await this.clientService.loginClient(
        loginClientDto as LoginClientDto
      );
      return this.sendResponse(res, 'Client Login Successfully', 201, data);
    } catch (err) {
      next(err);
    }
  };

  logoutClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientId = req.user.user_id;
      const token = req.token;
      const data = await this.clientService.logoutClient(clientId, token);
      return this.sendResponse(res, 'Logout Successfully', 200, data);
    } catch (err: any | unknown) {
      if (err instanceof ApiError) {
        next(err);
      } else if (err instanceof AuthError) {
        next(err);
      }
      next(err);
    }
  };
}
