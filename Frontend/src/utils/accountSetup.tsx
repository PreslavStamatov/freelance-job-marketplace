import type { AccountSetupState } from "../models/auth";

export const handleNameStateUpdate = (event: React.FormEvent<HTMLFormElement>, stateUpdate: React.Dispatch<React.SetStateAction<AccountSetupState>>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstName: string = formData.get("first-name") as string;
    const lastName: string = formData.get("last-name") as string;

    stateUpdate({firstName, lastName, role: null})
}