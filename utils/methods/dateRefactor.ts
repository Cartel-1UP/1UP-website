export function dateRefactor(dateString: string) {
  const dateParts = dateString.split('-')

  // Extract year, month, and day
  const year = dateParts[0]
  const month = dateParts[1]
  const day = dateParts[2]

  // Convert month number to month name
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const monthName = monthNames[parseInt(month) - 1]

  // Format the date
  const formattedDate = `${monthName} ${day}, ${year}`
  return formattedDate
}

export const getTimeAgo = (timestamp: any) => {
  const now = new Date()
  const commentDate = new Date(timestamp)
  const timeDifference = now.getTime() - commentDate.getTime()
  const minutes = Math.floor(timeDifference / (1000 * 60))
  const hours = Math.floor(timeDifference / (1000 * 60 * 60))
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years > 0) {
    return `${years} year${years === 1 ? '' : 's'} ago`
  } else if (months > 0) {
    return `${months} month${months === 1 ? '' : 's'} ago`
  } else if (weeks > 0) {
    const remainingDays = days % 7
    if (remainingDays === 0) {
      return `${weeks} week${weeks === 1 ? '' : 's'} ago`
    } else {
      return `${weeks} week${weeks === 1 ? '' : 's'} ${remainingDays} day${
        remainingDays === 1 ? '' : 's'
      } ago`
    }
  } else if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`
  } else {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
  }
}
