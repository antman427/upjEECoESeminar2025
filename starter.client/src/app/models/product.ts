export class Product {
    constructor(name:string, description:string,price:number) {
        this.name = name;
        this.description = description;
        this.price = price;
    }
    id: number = 0;
    name!: string;
    description!: string;
    price!: number;
}
