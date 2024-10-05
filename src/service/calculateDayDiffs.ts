export default function calculateDayDifference(dateString: string) {
  const givenDate = new Date(dateString)
  const currentDate = new Date()
  let timeDifference

  if (givenDate < currentDate) {
  }

  // Get the time difference in milliseconds
  if (givenDate < currentDate) {
    timeDifference = currentDate.getTime() - givenDate.getTime()
  } else {
    timeDifference = givenDate.getTime() - currentDate.getTime()
  }

  // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
  const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

  return dayDifference
}
