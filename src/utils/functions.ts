

const monthToString = (montNumber: number) => {
    switch (montNumber){
        case 0: return "Jan"
        case 1: return "Feb"
        case 2: return "Mar"
        case 3: return "Apr"
        case 4: return "May"
        case 5: return "Jun"
        case 6: return "Jul"
        case 7: return "Aug"
        case 8: return "Sep"
        case 9: return "Oct"
        case 10: return "Nov"
        case 11: return "Dec"
    }
}

export const formatDate = (date: Date) => {
    const month = monthToString(date.getMonth())
    const day = date.getDate()
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    return `${month} ${day}, ${year}, ${hours}:${minutes}`
}
