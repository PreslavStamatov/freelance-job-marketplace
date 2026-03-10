export const formatDate = (input: string) => {
    const date = new Date(input.replace(" ", "T"));

    const formatted = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
    });

    return formatted;
}