import mongoose from "mongoose";
import categoryModel from "../models/categoryModel.js";
import faker from "faker";

async function fakeData(count) {
    try {
        for(let i = 0; i < count; i++){
            const fakeCategory = {
                name: faker.random.word(),
                slug: faker.helpers.slugiy(name)
            }

            const category = categoryModel(fakeCategory);
            await category.save();
            console.log(`${category.name} created`);
        }
        console.log(`${count} categories created`);
    } catch (error) {
        console.log(error);
    }
}
fakeData(500);