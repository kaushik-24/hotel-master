// timeAgo.ts

export const timeAgo = (dateStr: string | null): string => {
    if (!dateStr) return 'Unknown';

    const lastLoginDate = new Date(dateStr);
    const currentTime = new Date();

    const diffInMilliseconds = currentTime.getTime() - lastLoginDate.getTime();
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60)); // Calculate total minutes
    const diffInHours = Math.floor(diffInMinutes / 60); // Convert minutes to hours
    const diffInDays = Math.floor(diffInHours / 24); // Convert hours to days
    const diffInWeeks = Math.floor(diffInDays / 7); // Convert days to weeks

    // Determine whether to show minutes, hours, days, or weeks ago
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
    } else if (diffInDays < 7) {
        return `${diffInDays} days ago`;
    } else {
        return `${diffInWeeks} weeks ago`;
    }
};
