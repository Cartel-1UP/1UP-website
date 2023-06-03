
export function dateRefactor(dateString: string) {

    const dateParts = dateString.split("-");

    // Extract year, month, and day
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    // Convert month number to month name
    const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const monthName = monthNames[parseInt(month) - 1];

    // Format the date
    const formattedDate = `${monthName} ${day}, ${year}`;
    return formattedDate
}








