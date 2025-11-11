import { BmcConfig } from './config/bmc.config.js';
import { redfishService } from './services/redfish.service.js';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const getAllResponses = async () => {
  const auth = await redfishService.auth(
    BmcConfig.credentials.login,
    BmcConfig.credentials.password,
  );

  const boot = await redfishService.toggleServerStatus('On');

  const system = await redfishService.getSystemInfo();

  const proc = await redfishService.getProcessors();

  const thermal = await redfishService.getThermalInfo();

  console.log('\nAuth Response\n');
  console.log(auth.data);

  console.log('\nBoot Response\n');
  console.log(boot.data);

  console.log('\nSystem Response\n');
  console.log(system.data);

  console.log('\nProcessors Response\n');
  console.log(proc.data);

  console.log('\nThermal Response\n');
  console.log(thermal.data);
};

getAllResponses();
