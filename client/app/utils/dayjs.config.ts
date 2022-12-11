import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.locale("ru", {
  relativeTime: {
    future: "Через %s",
    past: "%s назад",
    s: "несколько секунд",
    m: "минута",
    mm: "%d минут",
    h: "час",
    hh: "%d часов",
    d: "день",
    dd: "%d дней",
    M: "месяц",
    MM: "%d месяцев",
    y: "год",
    yy: "%d лет",
  },
});

export const RelativeTime = (date: Date | undefined) =>
  dayjs(new Date(date as Date)).fromNow();
