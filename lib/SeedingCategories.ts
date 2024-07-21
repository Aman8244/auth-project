import { faker } from "@faker-js/faker";
import axios from "axios"

const Seeding = async () => {
    const arr = [];
    for(let i=1;i<=100;i++){
       const temp = faker.commerce.product();
       arr.push(temp);
    }
    await axios.post("http://localhost:3000/api/categories",{
        categories:arr
    })
}

