import * as categoryRepository from "../repositories/categoryRepository.js";

export async function findCategories() {
    const data = await categoryRepository.findCategories();

    return data;
}