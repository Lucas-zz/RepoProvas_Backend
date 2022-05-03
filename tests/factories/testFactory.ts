import { faker } from '@faker-js/faker';
import { NewTestData } from '../../src/interfaces';

export default function testFactory(categoryName: string, disciplineName: string, teacherName: string): NewTestData {
    return {
        name: faker.name.jobTitle(),
        pdfUrl: faker.internet.url(),
        categoryName: categoryName,
        disciplineName: disciplineName,
        teacherName: teacherName,
    };
}