import type { ReactNode } from "react";

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
        RoleId?: number;
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
        icon? : ReactNode ;
    }
    interface Employee {
        Id?: number;
        Name: string;
        Email: string;
        Department: string;
        Role: string;
    }

    interface FilterDto {
        PageNo: number;
        PageSize: number;
        Predicates: Record<string, string | number | boolean>;
        SortModels?: {
            Field: string;
            Sort: "asc" | "desc";
        }[];
        SearchText: string;
    }
    type CommonChartType = 'line' | 'bar' | 'pie' | 'area' | 'doughnut' | 'radar' | 'stackedbar';
    interface CommonChart {
        type: CommonChartType;
        apiUrl: string;
        title?: string;
        height?: string;
        width?: string;
        filter?: FilterDto;

    }
    /*****************************///////////-----InterFace-----///////////////////*********************/
    /*****************************///////////-----ENUMS-----///////////////////*********************/

    /*****************************///////////-----ENUMS-----///////////////////*********************/
}
export { };

