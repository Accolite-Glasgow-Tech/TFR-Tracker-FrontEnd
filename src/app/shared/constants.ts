import { environment } from 'src/environments/environment';

const backendURL = environment.backendURL;

export const tasksURL = `${backendURL}/tasks`;
export const taskResourcesURL = `${backendURL}/tasks/resources`;
export const allProjectsURL = `${backendURL}/search/project/all`;
export const TFRLocationCountURL = `${backendURL}/tfrLocationCount`;
export const TFRStatusCountURL = `${backendURL}/projects/statusCount`;
export const clientsURL = `${backendURL}/vendors`;
export const clientsURLdupe = `${backendURL}/search/clients/all`;
export const projectSearchURL = `${backendURL}/search/project`;
export const registrationURL = `${backendURL}/users/register`;
export const loginURL = `${backendURL}/users/login`;
export const TFRCreationResourceURL = `${backendURL}/resources/all/tfr-creation-resource`;
export const projectsURL = `${backendURL}/projects`;
export const approachingProjectsURL = `${backendURL}/UpcomingProjects`;
export const clientProjectCountURL = `${backendURL}/VendorProjectCount`;
export const seniorityLevelsURL = `${backendURL}/resources/seniorityLevels`;
export const errorsURL = `${backendURL}/errors`;

export const dateFormat = 'MM/dd/YY';
export const statusList = [
  'DRAFT',
  'AGREED',
  'IN PROGRESS',
  'ARCHIVED',
  'DELIVERED',
];

export const daysOfWeek: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const HttpInformationalCodes = new Map([
  [100, 'Continue'],
  [101, 'Switching Protocols'],
  [102, 'Processing'],
  [103, 'Early Hints'],
  [200, 'OK'],
  [201, 'Created'],
  [202, 'Accepted'],
  [203, 'Non-Authoritative Information'],
  [204, 'No Content'],
  [205, 'Reset Content'],
  [206, 'Partial Content'],
  [207, 'Multi-Status'],
  [208, 'Already Reported'],
  [226, 'IM Used'],
  [300, 'Multiple Choices'],
  [301, 'Moved Permanently'],
  [302, 'Found'],
  [303, 'See Other'],
  [304, 'Not Modified'],
  [305, 'Use Proxy'],
  [306, 'unused'],
  [307, 'Temporary Redirect'],
  [308, 'Permanent Redirect'],
]);

export const HttpErrorCodes = new Map([
  [400, 'Bad Request'],
  [401, 'Unauthorized'],
  [402, 'Payment Required'],
  [403, 'Forbidden'],
  [404, 'Not Found'],
  [405, 'Method Not Allowed'],
  [406, 'Not Acceptable'],
  [407, 'Proxy Authentication Required'],
  [408, 'Request Timeout'],
  [409, 'Conflict'],
  [410, 'Gone'],
  [411, 'Length Required'],
  [412, 'Precondition Failed'],
  [413, 'Payload Too Large'],
  [414, 'URI Too Long'],
  [415, 'Unsupported Media Type'],
  [416, 'Range Not Satisfiable'],
  [417, 'Expectation Failed'],
  [418, "I'm a teapot"],
  [421, 'Misdirected Request'],
  [422, 'Unprocessable Entity'],
  [423, 'Locked'],
  [424, 'Failed Dependency'],
  [425, 'Too Early'],
  [426, 'Upgrade Required'],
  [428, 'Precondition Required'],
  [429, 'Too Many Requests'],
  [431, 'Request Header Fields Too Large'],
  [451, 'Unavailable For Legal Reasons'],
  [500, 'Internal Server Error'],
  [501, 'Not Implemented'],
  [502, 'Bad Gateway'],
  [503, 'Service Unavailable'],
  [504, 'Gateway Timeout'],
  [505, 'HTTP Version Not Supported'],
  [506, 'Variant Also Negotiates'],
  [507, 'Insufficient Storage'],
  [508, 'Loop Detected'],
  [510, 'Not Extended'],
  [511, 'Network Authentication Required'],
]);
