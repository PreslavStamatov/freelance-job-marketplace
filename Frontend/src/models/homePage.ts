export type AssignedJobHomePageDto = {
    id: number;
    heading: string;
    description: string;
    deadline: string;
    firstName: string;
    lastName: string;
    image: string;
    status: "active" | "finished";
}