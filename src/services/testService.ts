import * as testRepository from "../repositories/testRepository.js";

export async function getAllTests() {
    const data = await testRepository.findAllTests();

    return data;
}