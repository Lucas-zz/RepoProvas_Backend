import { faker } from '@faker-js/faker';
import { CreateTestData } from "../../src/interfaces";

export default function testFactory(categoryId: number, teacherDisciplineId: number): CreateTestData {
    return {
        name: faker.name.jobTitle(),
        pdfUrl: faker.internet.url(),
        categoryId: categoryId,
        teacherDisciplineId: teacherDisciplineId
    };
}