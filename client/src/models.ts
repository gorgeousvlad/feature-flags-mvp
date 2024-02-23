export interface Service {
    slug: string;
    title: string;
    flags?: FeatrueFlag[];
}

export interface FeatrueFlag {
    id: number;
    name: string;
    value: boolean;
    services?: Service[];
}
