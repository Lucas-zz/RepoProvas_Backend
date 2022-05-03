import * as disciplineRepository from "../repositories/disciplineRepository.js"

export async function getAll() {
    return await disciplineRepository.getAllDisciplines();
}