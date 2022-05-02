import { Filter } from "../interfaces/index.js";
import * as testRepository from "../repositories/testRepository.js";

export async function findTests(filter: Filter) {
    if (filter.groupBy === "discipline") {
        return testRepository.findTestsByDiscipline();
    } else if (filter.groupBy === "teacher") {
        return testRepository.findTestsByTeacher();
    }
}