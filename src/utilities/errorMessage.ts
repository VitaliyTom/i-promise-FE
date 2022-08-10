import { errorMessages } from '@/utilities/errorMessages';

export const errorMessage = (key: string): string => {
  return errorMessages[key] ? errorMessages[key] : errorMessages.undefinedError;
};
