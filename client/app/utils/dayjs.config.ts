import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.locale("ru", {
  relativeTime: {
    future: "Через %s",
    past: "%s назад",
    s: "Несколько секунд",
    m: "Минута",
    mm: "%d минут",
    h: "Час",
    hh: "%d часов",
    d: "День",
    dd: "%d дней",
    M: "Месяц",
    MM: "%d месяцев",
    y: "Год",
    yy: "%d лет",
  },
});

export const CustomDayJS = dayjs();
