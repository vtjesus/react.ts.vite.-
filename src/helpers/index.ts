export function formatCurrency(amount: number){
    return new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

export function formatDate(date: string) : string {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }
    return new Intl.DateTimeFormat('en-US', options).format(newDate);
}