interface DeviceInfo {
  typ: String;
  location: String;
  des: String;
  lastChecked: Number;
  price: Number;
  state: Number;
  usingTime: Number;
  key: String;
  installedDate?: String;
  startOn?: String;
}

interface DeviceState {
  state: Number;
  key: String;
}

export {DeviceInfo, DeviceState};
