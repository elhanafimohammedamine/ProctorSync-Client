export const generateAcademicYear = () : string => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    if (currentMonth >= 7) {
        return String(currentYear) + "-" + String(currentYear + 1);
    } else {
        return String(currentYear - 1) + "-" + String(currentYear);
    }

};

export const generateTimeOptions = () => {
    const options = [];
    for (let hour = 8; hour <= 16; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const formattedHour = hour.toString().padStart(2, '0');
            const formattedMinute = minute.toString().padStart(2, '0');
            options.push(`${formattedHour}:${formattedMinute}`);
        }
    }
    return options;
};

export const calculateDurationInSeconds = (hours : number, minutes: number) => {
    return (hours * 3600) + (minutes * 60);
};

export const durations: {label: string, value: number}[] = [];
for (let hours = 0; hours <= 3; hours++) {
    const startMinutes = hours === 0 ? 45 : 0;

    for (let minutes = startMinutes; minutes < 60; minutes += 15) {
        const durationInSeconds = calculateDurationInSeconds(hours, minutes);
        const label = `${hours > 0 ? hours + " heure" + (hours > 1 ? "s" : "") : ""} ${minutes > 0 ? minutes + " minute" + (minutes > 1 ? "s" : "") : ""}`;

        durations.push({ label, value: durationInSeconds });
    }
}