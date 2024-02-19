export interface Result {
  status: "success" | "error";
  data: Object;
  error: Object;
}

export enum Instruments {
  "NSE_EQ|INE669E01016",
  "NSE_EQ|INE040H01021",
  "NSE_FO|46794",
  "NSE_FO|66716",
}

export const instrument_regex: RegExp =
  /^(?:^NSE_EQ|NSE_FO|NCD_FO|BSE_EQ|BSE_FO|BCD_FO|MCX_FO|NSE_INDEX|BSE_INDEX|MCX_INDEX)\|[\w ]+(,(?:NSE_EQ|NSE_FO|NCD_FO|BSE_EQ|BSE_FO|BCD_FO|MCX_FO|NSE_INDEX|BSE_INDEX|MCX_INDEX)\|[\w ]+)*?$/;

export function validateRegex(regex: RegExp, input: string): boolean {
  return regex.test(input);
}
