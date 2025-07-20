export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'USER';
    createdAt: Date;
    updatedAt: Date;
}