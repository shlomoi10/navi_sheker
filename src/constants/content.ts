export const MAGIC_TEXT = 'נביא השקר האם תוכל לענות לי בבקשה?'
export const SHORT_CALL = 'נביא השקר'
export const MAGIC_END_CHAR = ']'
export const ALWAYS_MAGIC_CHAR = '.'

export const PASTE_ERROR =
  'אם יש משהו שאני בטוח יודע זה שניסיתם להדביק, אפילו להקליד אין לכם כח? אני עלול להיפגע'

export const CALL_ERRORS = {
  disrespect: 'אתה מזלזל בי',
  manners: 'יש צורה איך מבקשים',
} as const

export type CallError = keyof typeof CALL_ERRORS

export const RANDOM_RESPONSES = [
  'מה אתה רוצה ממני?',
  'לך אני לא עונה',
  'אני נביא שקר, אתם רוצים לשמוע את האמת?',
  'אני עסוק מדי בשבילך',
  'אני באמצע לאכול, למה להפריע?',
  'אני נביא שקר, לא אמת. תחפש מישהו אחר',
  'אין לי כח לשאלות מיותרות',
  'אני עסוק בלרמות אנשים, אין לי זמן לעזור לך.',
  'עזוב אותי בשקט, יש לי נבואות לחזות.',
  'תגידו, אני נראה לכם משועמם?',
]

export const OVERLAY_MESSAGES = [
  'הנביא בפעולה...',
  'ביקשת כל כך יפה...',
  'בלי לחץ...',
  'הנביא ממציא תשובות',
  'שניה נכנס למאגר נתונים',
]

export const ANSWER_BEGINNINGS = ['אתם חושבים ', 'אני מבין ', 'נראה לך ', 'למה נראה לך ']
export const ANSWER_MIDDLES = [
  'שיש לי כח,',
  'שאני לא עייף עכשיו,',
  'שאני לא רעב,',
  'שאני כל הזמן פעיל',
  'שאין לי חיים חוץ מלענות תשובות',
]
export const ANSWER_ENDINGS = ['אז אתם טועים', 'אז תחשבו שוב', 'נראה לכם???', 'אז תדעו שאני ממש עסוק']

export const COMMUNITY_LINKS = [
  'https://mitmachim.top/post/808044',
  'https://www.prog.co.il/threads/%D7%9E%D7%A9%D7%97%D7%A7-%D7%A0%D7%91%D7%99%D7%90-%D7%94%D7%A9%D7%A7%D7%A8-%D7%A0%D7%95%D7%A6%D7%A8-%D7%9B%D7%95%D7%9C%D7%95-%D7%A2-%D7%99-ai.980179/',
]

export const TIMINGS = {
  loadingOverlay: 3000,
  beforeAnswer: 500,
  typingSpeed: 120,
  tryAgainDelay: 2500,
  resetScrollDelay: 2700,
  mouseTrailLifetime: 1000,
  fallingLogoInterval: 100,
  fallingLogoLifetime: 4500,
} as const

export const FALLING_LOGO_COUNT = 100
