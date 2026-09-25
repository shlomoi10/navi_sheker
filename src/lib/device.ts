export function isAndroid(): boolean {
  return /Android/i.test(navigator.userAgent)
}

export function getMagicChar(): string {
  if (isAndroid()) {
    console.log('מכשיר אנדרואיד זוהה')
    return '.'
  }
  console.log('מחשב זוהה')
  return '['
}
