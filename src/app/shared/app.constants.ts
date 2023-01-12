export const prodEnv = false;

class API_CONSTANTS {
  ENV: string = prodEnv ? 'PROD' : 'DEV';
  BASE_URL: string = prodEnv
    ? 'production AWS url to go here...'
    : 'http://localhost:8080';

  TFR: string = '/projects';
  MILESTONES: string = '/milestone';
  ADD_TRACKER: string = '/milestone/tracker';
  TRACKER: string = '/tracker';
}

export class APPCONSTANTS {
  static readonly APICONSTANTS = new API_CONSTANTS();
}
