import { Filter } from "../interfaces/index.js";
import * as testRepository from "../repositories/testRepository.js";
import * as teacherRepository from "../repositories/teacherRepository.js";
import * as categoryRepository from "../repositories/categoryRepository.js";
import * as disciplineRepository from "../repositories/disciplineRepository.js";

export function findTests(filter: Filter) {
    if (filter.groupBy === "disciplines") {
        return testRepository.getTestsByDiscipline();
    } else if (filter.groupBy === "teachers") {
        return testRepository.getTestsByTeachers();
    }
}

export async function addTest(name: string, pdfUrl: string, categoryName: string, disciplineName: string, teacherName: string) {
    const { id: categoryId } = await categoryRepository.findCategoryByName(categoryName);
    const { id: disciplineId } = await disciplineRepository.findDisciplineByName(disciplineName);
    const { id: teacherId } = await teacherRepository.findTeacherByName(teacherName);
    const { id: teacherDisciplineId } = await teacherRepository.findTeacherDiscipline(teacherId, disciplineId);

    const data = {
        name, pdfUrl, categoryId, teacherDisciplineId
    }

    await testRepository.addNewTest(data);
}

export async function updateTestViewsCount(id: number) {
    await testRepository.updateTestViewsCount(id);
}