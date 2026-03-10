import type { LoginSuccess } from "../models/auth";
import { loginSuccess } from "../store/slices/userSlice";
import type { AppDispatch } from "../store/store";

export const fetchWithAuth = async (
    url: string,
    options: RequestInit,
    accessToken: string | null
): Promise<{ response: Response; newAccessToken?: string }> => {

    let response = await fetch(url, {
        ...options,
        credentials: "include",
        headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });
    if (response.status !== 401) {
        return { response };
    }

    const newAccessToken = await refreshAccessToken();

    if (!newAccessToken) {
        return { response };
    }

    response = await fetch(url, {
        ...options,
        credentials: "include",
        headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${newAccessToken}`,
            "Content-Type": "application/json",
        },
    });

    return { response, newAccessToken };
};



export const loginWithGoogle = async (credential: string, dispatch: AppDispatch) => {


    try {
        const response = await fetch(`http://localhost:3000/auth/loginWithGoogle`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ credential })
        });
        console.log(response.headers.getSetCookie());
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Login failed");
        }

        const data: LoginSuccess = await response.json();

        dispatch(loginSuccess({ user: data.user, jwt: data.accessToken }));
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", data.accessToken);
    } catch (err) {
        console.error(err);
    }

}

export const login = async (event: React.FormEvent<HTMLFormElement>, dispatch: AppDispatch) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;
    // const confirmPassword: string = formData.get("confirm-password") as string;

    try {
        const response = await fetch(`http://localhost:3000/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Login failed");
        }

        const data: LoginSuccess = await response.json();
        dispatch(loginSuccess({ user: data.user, jwt: data.accessToken }));
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", data.accessToken);

    } catch (err) {
        console.error(err);
    }

}

export const register = async (event: React.FormEvent<HTMLFormElement>, dispatch: AppDispatch) => {
    event.preventDefault();


    const formData = new FormData(event.currentTarget);

    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;
    // const confirmPassword: string = formData.get("confirm-password") as string;

    try {
        const response = await fetch(`http://localhost:3000/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Login failed");
        }

        const data: LoginSuccess = await response.json();
        dispatch(loginSuccess({ user: data.user, jwt: data.accessToken }));
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", data.accessToken);

    } catch (err) {
        console.error(err);
    }

}

export const refreshAccessToken = async () => {

    const response = await fetch(`http://localhost:3000/auth/refresh`, {
        method: "GET",
        credentials: "include"
    });

    const data: {accessToken: string} = await response.json();

    return data.accessToken;
}