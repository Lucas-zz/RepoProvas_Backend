import * as categoryRepository from "../repositories/categoryRepository.js";

export async function getAllCategories() {
    return await categoryRepository.getAllCategories();
}