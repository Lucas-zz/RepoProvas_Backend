import * as disciplineRepository from "../repositories/disciplineRepository.js"

export async function findAllDisciplines() {
    const data = disciplineRepository.findDisciplines();

    return data;
}