export function getStatusStyles(status: string) {
    switch (status) {
        case "pending":
            return "bg-[var(--background-pending)] text-[var(--text-pending)] font-medium text-xs";
        case "approved":
            return "bg-[var(--background-approved)] text-[var(--text-approved)] font-medium text-xs";
        case "rejected":
            return "bg-[var(--background-rejected)] text-[var(--text-rejected)] font-medium text-xs";
        case "in-execution":
            return "bg-[var(--background-in-execution)] text-[var(--text-in-execution)] font-medium text-xs";
        case "completed":
            return "bg-[var(--background-completed)] text-[var(--text-completed)] font-medium text-xs";
    }
}
