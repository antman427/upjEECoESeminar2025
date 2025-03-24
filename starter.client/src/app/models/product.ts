export class Product {
    constructor(id:number, name:string, description:string,price:number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }
    id: number = 0;
    name!: string;
    description!: string;
    price!: number;
}
