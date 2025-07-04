declare global {
    interface User {
        Id: number;
        Name: string;
        Email: string;
        PhoneNumber: string;
        Password: string;
        DateOfBirth: string; // Date as ISO string from API
        Address?: string; // optional because it's nullable on backend
    }
}
export {};

