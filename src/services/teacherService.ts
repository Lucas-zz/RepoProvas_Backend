import * as teacherRepository from "../repositories/teacherRepository.js";

export async function getTeacherNames() {
    return teacherRepository.getTeacherNames();
}

export async function getTeacherByDiscipline(discipline: string) {
    return teacherRepository.getTeacherByDiscipline(discipline);
}