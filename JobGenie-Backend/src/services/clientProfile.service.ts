import { User } from '../database/entities/user.entity';
import { UserProfile } from '../database/entities/userProfile.entity';
import { ClientDto } from '../dtos/user.dto';
import { ClientProfileDto } from '../dtos/userProfile.dto';
import { IClientProfileInterface } from '../interface/userProfile/userProfile.interface';
import redis from '../config/redis.config';
import ApiError from '../utils/errors/app.error';

export class ClientProfileService implements IClientProfileInterface {
  createClientSetting: (
    clientId: number,
    clientProfileDto: ClientProfileDto
  ) => any = async (clientId: number, clientProfileDto: ClientProfileDto) => {
    const checkClient = await User.createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .leftJoinAndSelect('user.userProfile', 'profile')
      .where('user.id = :id', { id: clientId as number })
      .getOne();

    if (
      checkClient.userProfile.receivedEmails ||
      checkClient.userProfile.receivedMessages ||
      checkClient.userProfile.receivedNotifications ||
      checkClient.userProfile.is_active
    ) {
      await UserProfile.createQueryBuilder()
        .update(UserProfile)
        .set({ ...clientProfileDto })
        .where('user_id = :user_id', { user_id: checkClient.id as number })
        .execute();

      const message = `User Profile Updated Successfully`;
      return message;
    }
    const redisClient: any = await redis.hget(`user:${checkClient.id}`, 'id');
    console.log(redisClient);
    const checkRedisClient = redisClient
      .toString()
      .startsWith(`${checkClient.hasId ? checkClient.id : null}`);
    if (!checkRedisClient || !checkClient) {
      throw new ApiError(
        'Redis id and client id does not match or Client is not authorized',
        403
      );
    }
    const result = await UserProfile.createQueryBuilder()
      .insert()
      .into(UserProfile)
      .values([{ ...clientProfileDto, user: checkClient }])
      .execute();

    console.log(result);
    if (result.generatedMaps[0].id === 0) {
      throw new ApiError(`Updated Profile is not successfully updated`, 409);
    }
    const message = `${checkClient.firstName}, Has Updated Successfully`;
    return message;
  };

  activateAccount: (clientId: number, status: boolean) => any = async (
    clientId: number,
    status: boolean
  ) => {
    const checkUser = await User.createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .leftJoinAndSelect('user.userProfile', 'profile')
      .where('user.id = :id', { id: clientId as number })
      .getOne();

    if (checkUser.userProfile.is_active !== status) {
      await UserProfile.createQueryBuilder()
        .update(UserProfile)
        .set({
          is_active: status,
        })
        .where('user_id = :user_id', { user_id: clientId as number })
        .execute();

      const message = `User Activated Successfully`;
      return message;
    }
  };

  viewProfile = async (clientId: number) => {
    const user = await User.createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .leftJoinAndSelect('user.userProfile', 'profiles')
      .where('user.id = :id', { id: clientId as number })
      .getOne();
    const user_profile = user['userProfile'];
    return user_profile;
  };
}
