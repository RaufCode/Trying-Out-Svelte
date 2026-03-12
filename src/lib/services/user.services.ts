interface user_credentials {
    username: string;
    password: string;
}

export const login = async (user_credentials: user_credentials) => {
    const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user_credentials)
    });

    if (!res.ok) {
        throw new Error("Login failed");
    }
    

    return res.json();
};
