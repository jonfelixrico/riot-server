import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { ModuleToRegisterDto } from '../../dto/module-to-register.request-dto'
import {
  DeviceManager,
  DEVICE_MANAGER,
} from '@app/services/generic-devices/device-manager.interface'
import {
  DeviceRegistrationQueue,
  DEVICE_REGISTRATION_QUEUE,
} from '@app/services/generic-devices/device-registration-queue.interface'
import {
  ModuleStateProvider,
  MODULE_STATE_PROVIDER,
} from '@app/services/generic-devices/module-state-provider.interface'
import {
  ApiAcceptedResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import {
  HeartbeatResponseDto,
  IHeartbeatResponseDto,
} from '../../dto/heartbeat.response-dto'
import { HeartbeatRequestDto } from '../../dto/heartbeat.request-dto'

@ApiTags('arduino')
@Controller('arduino/:deviceId/version/:version')
export class ArduinoController {
  constructor(
    @Inject(DEVICE_MANAGER) private deviceSvc: DeviceManager,
    @Inject(DEVICE_REGISTRATION_QUEUE) private regSvc: DeviceRegistrationQueue,
    @Inject(MODULE_STATE_PROVIDER) private mStateSvc: ModuleStateProvider,
  ) {}

  @Post()
  @HttpCode(202)
  @ApiBody({
    type: [ModuleToRegisterDto],
    description: 'List of modules to be registerd with the device.',
  })
  @ApiForbiddenResponse({ description: 'Device has already been registered.' })
  @ApiAcceptedResponse({
    description:
      'Queued for registration. Need to be approved in the admin API.',
  })
  @ApiOperation({
    description: 'Queues up a device for registration.',
    operationId: 'queueDeviceForRegistration',
  })
  async queueForRegistration(
    @Param('deviceId') deviceId: string,
    @Param('version') firmwareVersion: string,
    @Body() toRegister: ModuleToRegisterDto[],
  ) {
    if (await this.deviceSvc.doesDeviceExist({ deviceId, firmwareVersion })) {
      throw new ForbiddenException('Device has already been registered.')
    }

    await this.regSvc.flagForQueue({
      deviceId,
      firmwareVersion,
      modules: toRegister,
    })
  }

  @Put()
  @ApiOkResponse({
    type: HeartbeatResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'The device is not yet registered.',
  })
  @ApiOperation({
    description:
      'This is the main endpoint that devices call. This allows them to receive states and/or send sensor readings.',
  })
  @ApiBody({
    description:
      'The data sent by the device into the server. May contain sensor readings.',
    type: HeartbeatRequestDto,
  })
  async heartbeat(
    @Param('deviceId') deviceId: string,
    @Param('version') firmwareVersion: string,
    @Body() payload: HeartbeatRequestDto,
  ): Promise<IHeartbeatResponseDto> {
    const query = {
      deviceId,
      firmwareVersion,
    }

    if (!(await this.deviceSvc.doesDeviceExist(query))) {
      throw new NotFoundException('Device is not registered in the system.')
    }

    // not very relevant to the process; we can afford having it fail unexpectedly
    void this.deviceSvc.bumpHeartbeat(query).catch((e) => {
      console.error(e)
    })

    return {
      states: await this.mStateSvc.getStates(query),
    }
  }
}
