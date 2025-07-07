declare global {
    /*****************************///////////-----Types-----///////////////////*********************/
    type NavRoute = {
        path: string;
        label: string;
    };
    /*****************************///////////-----Types-----///////////////////*********************/

    /*****************************///////////-----InterFace-----///////////////////*********************/

    interface User {
        Id: number;
        Name: string;
        Email: string;
        PhoneNumber: string;
        Password: string;
        DateOfBirth: string; // Date as ISO string from API
        Address?: string; // optional because it's nullable on backend
    }
    interface LoginRequest {
        email: string;
        password: string;
    }
    interface LoginResponse {
        token: string;
        user: {
            id: number;
            name: string;
            email: string;
        };
    }
    interface AppRoute {
        path: string;
        element: React.ReactNode;
        children?: AppRoute[];
        showInNavbar?: boolean;
        label?: string;
    }
    interface Predicate {
        Key: string;
        Value: string | number | boolean;
    }

    interface FilterDto {
        PageNumber: number;
        PageSize: number;
    }
    /*****************************///////////-----InterFace-----///////////////////*********************/

}
export { };

