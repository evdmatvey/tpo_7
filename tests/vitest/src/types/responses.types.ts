export type AuthResponse = {
  '@odata.id': string;
  '@odata.type': string;
  ClientOriginIPAddress: string;
  Description: string;
  Id: string;
  Name: string;
  Roles: string[];
  UserName: string;
};

export type SystemInfoResponse = {
  Status: {
    Health: string;
    State: string;
  };
  PowerState: string;
};

export type ProcessorsInfoResponse = {
  '@odata.id': string;
  '@odata.type': string;
  Members: any[];
  'Members@odata.count': number;
  Name: string;
};

export type ThermalInfoResponse = {
  '@odata.id': string;
  '@odata.type': string;
  Fans: any[];
  Id: string;
  Name: string;
  Redundancy: any[];
  Temperatures: any[];
};
