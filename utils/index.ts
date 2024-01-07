export const extractEmailToUserId = (str: string) => {
  return str.substring(0, str.indexOf("@"));
};
