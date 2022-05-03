import * as categoryRepository from "../repositories/categoryRepository.js";

export async function getAll() {
    return await categoryRepository.getAllCategories();
}