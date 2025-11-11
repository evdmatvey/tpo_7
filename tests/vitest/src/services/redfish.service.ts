import {
  AuthResponse,
  ProcessorsInfoResponse,
  SystemInfoResponse,
  ThermalInfoResponse,
} from '../types/responses.types.js';
import { requester } from '../utils/requester.js';

class RedfishService {
  public async auth(login: string, password: string) {
    const response = await requester.post<AuthResponse>('redfish/v1/SessionService/Sessions', {
      UserName: login,
      Password: password,
    });

    return response;
  }

  public async getSystemInfo() {
    const response = await requester.get<SystemInfoResponse>('/redfish/v1/Systems/system');

    return response;
  }

  public async getThermalInfo() {
    const response = await requester.get<ThermalInfoResponse>(
      '/redfish/v1/Chassis/chassis/Thermal',
    );

    return response;
  }

  public async getProcessors() {
    const response = await requester.get<ProcessorsInfoResponse>(
      '/redfish/v1/Systems/system/Processors',
    );
    return response;
  }

  public async toggleServerStatus(resetType: 'On' | 'Off' | 'ForceOff' | 'ForceOn') {
    const response = await requester.post(
      '/redfish/v1/Systems/system/Actions/ComputerSystem.Reset',
      {
        ResetType: resetType,
      },
    );

    return response;
  }
}

export const redfishService = new RedfishService();
