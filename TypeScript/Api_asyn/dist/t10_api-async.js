async function getUserData(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`User not found (Status: ${response.status})`);
        }
        const user = await response.json();
        console.log("User retrieved:", user.name);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("System Error:", message);
    }
}
getUserData(1);
export {};
