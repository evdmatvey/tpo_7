import { describe, expect, it } from 'vitest';
import { BmcConfig } from '../config/bmc.config';
import { redfishService } from '../services/redfish.service';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('Redfish api', () => {
  it('Should success create session', async () => {
    const { login, password } = BmcConfig.credentials;

    const response = await redfishService.auth(login, password);

    expect(response.status).toBe(201);
    expect(response.headers['x-auth-token']).toBeTypeOf('string');
    expect(response.headers['x-auth-token'].length).not.toBe(0);
  });

  it('Should get correct system info', async () => {
    const response = await redfishService.getSystemInfo();

    expect(response.status).toBe(200);
    expect(response.data.PowerState).toBeTypeOf('string');
    expect(response.data.PowerState).not.toBe('');
    expect(response.data.Status).toBeTypeOf('object');
    expect(response.data.Status.Health).toBe('OK');
  });

  it('Should correctly start server power', async () => {
    const response = await redfishService.toggleServerStatus('On');

    expect(response.status).toBe(204);

    await redfishService.toggleServerStatus('ForceOff');
  });
});
