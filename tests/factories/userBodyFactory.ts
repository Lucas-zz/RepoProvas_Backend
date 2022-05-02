import { faker } from "@faker-js/faker"

export default function userBodyFactory() {
    const body = {
        email: faker.internet.email(),
        password: faker.internet.password(),
    }

    return body;
}