export interface IHall {
    name: string;
    slug: string;
    price: number;
    shortdesc: string;
    heading: string;
    longdesc: string;
    features: string[];
    capacity: number;
    hallImage?: string;
}
