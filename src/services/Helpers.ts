export function convertSecondsToDateString(seconds: number): string {
    let days: number = Math.floor(seconds / (24 * 60 * 60));
    seconds %= (24 * 60 * 60);

    let hours: number = Math.floor(seconds / (60 * 60));
    seconds %= (60 * 60);

    let minutes: number = Math.floor(seconds / 60);
    seconds %= 60;

    let result: string = days > 0 ? days + (days > 1 ? " days, " : " day, ") : "";
    result += hours > 0 ? hours + (hours > 1 ? " hours, " : " hour, ") : "";
    result += minutes > 0 ? minutes + (minutes > 1 ? " minutes, " : " minute, ") : "";
    result += seconds + (seconds > 1 ? " seconds" : " second");

    return result;
}