import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/en"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("en")

export { dayjs }

export const WEDDING_DATE = dayjs.tz("2024-12-29 11:00", "Asia/Phnom_Penh")
export const HOLIDAYS = [15]

export const BRIDE = "ស៊ឹម ពិសី"
export const BRIDE_TITLE = "កូនស្រីនាម"
export const BRIDE_FATHER = "ឃុន សារី"
export const BRIDE_MOTHER = "នាង សុខា"
export const BRIDE_INFO = [
  {
    relation: "Bride",
    name: BRIDE,
    phone: "010-8024-2203",
    account: "Woori Bank 1002553000729",
  },
  {
    relation: "Bride's Father",
    name: BRIDE_FATHER,
    phone: "010-8080-7980",
    account: "Hana Bank 07719079916",
  },
  {
    relation: "Bride's Mother",
    name: BRIDE_MOTHER,
    phone: "010-5719-2203",
    account: "Hana Bank 28091012542707",
  },
]

export const GROOM = "គង់ វរៈសម្បត្តិ"
export const GROOM_TITLE = "កូនប្រុសនាម"
export const GROOM_FATHER = "គង់ ទីតូ"
export const GROOM_MOTHER = "លុយ ហេង"
export const GROOM_INFO = [
  {
    relation: "Groom",
    name: GROOM,
    phone: "010-5065-6815",
    account: "Hana Bank 37891016958607",
  },
  {
    relation: "Groom's Father",
    name: GROOM_FATHER,
    phone: "010-4590-0313",
    account: "Shinhan Bank 110016485908",
  },
  {
    relation: "Groom's Mother",
    name: GROOM_MOTHER,
    phone: "010-5410-0313",
    account: "Kookmin Bank 819210137793",
  },
]
