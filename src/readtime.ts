import { getWPMSetting } from "./configuration";

export function getReadingTime(textToRead: string) {
  const wordsPerMinute = getWPMSetting();
  const words = textToRead.split(" ");
  const wordCount = words.length;
  const minutes = wordCount / wordsPerMinute;
  const roundedMinutes = Math.floor(minutes);
  const roundedSeconds = Math.floor((minutes - roundedMinutes) * 60);
  return {
    minutes: roundedMinutes,
    seconds: roundedSeconds,
  };
}
