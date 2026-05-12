import { db } from './database';

export const getSetting = async (key: string, defaultValue: any = null): Promise<any> => {
  try {
    const setting = await (db as any).setting.findUnique({
      where: { key }
    });
    return setting ? setting.value : defaultValue;
  } catch (error) {
    console.error(`Error getting setting ${key}:`, error);
    return defaultValue;
  }
};

export const getSettingsGroup = async (group: string): Promise<Record<string, string>> => {
  try {
    const settings = await (db as any).setting.findMany({
      where: { group }
    });
    return settings.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
  } catch (error) {
    console.error(`Error getting settings group ${group}:`, error);
    return {};
  }
};
