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
    interface AppUser {
        FirstName: string;
        LastName: string;
        Email: string;
        PhoneNumber: string;
        Password: string;
    }
    interface LoginRequest {
        email: string;
        password: string;
    }
    interface LoginResponse {
        Token: string;
        Name: string;
        Email: string;
        User: User;
        AppUser: AppUser;
    }
    interface AppRoute {
        path: string;
        element: React.ReactNode;
        children?: AppRoute[];
        showInNavbar?: boolean;
        label?: string;
        allowedRoles?: UserRole[];
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
    /*****************************///////////-----ENUMS-----///////////////////*********************/

    /*****************************///////////-----ENUMS-----///////////////////*********************/
}
export { };

