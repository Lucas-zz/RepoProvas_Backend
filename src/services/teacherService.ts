import * as teacherRepository from "../repositories/teacherRepository.js";

export async function getTeacherNames() {
    return await teacherRepository.getTeacherNames();
}

export async function getTeacherByDiscipline(discipline: string) {
    return await teacherRepository.getTeacherByDiscipline(discipline);
}