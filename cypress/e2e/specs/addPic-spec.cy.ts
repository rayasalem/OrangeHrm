import LoginPage from "../../support/pages/LoginPage";
import { faker } from "@faker-js/faker";

const login = new LoginPage();

describe("Add 5 Employees with Faker Pictures + View Profile", () => {
  const employees = Array.from({ length: 5 }).map(() => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    employeeId: faker.number.int({ min: 10000, max: 99999 }).toString(),
    avatarUrl: faker.image.avatar(),
  }));

  const createdEmployeeIds: string[] = [];

  before(() => {
 //   cy.loginWithAdmin();
 cy.visit('/');
 cy.checkLink("OrangeHRM, Inc","http://www.orangehrm.com");
    cy.loginwith();
  });

  it("Add employees with Faker pictures and view profile", () => {
    employees.forEach((emp, index) => {
      const fileName = `faker_pic_${index}.jpg`;

      cy.request({
        url: emp.avatarUrl,
        encoding: "binary",
      }).then((res) => {
        cy.writeFile(`cypress/fixtures/${fileName}`, res.body, "binary");
      });

      cy.visit("/web/index.php/pim/addEmployee");

      cy.get('input[name="firstName"]').clear().type(emp.firstName);
      cy.get('input[name="lastName"]').clear().type(emp.lastName);

      cy.get("div.oxd-input-group input.oxd-input.oxd-input--active")
        .eq(2)
        .clear()
        .type(emp.employeeId);

      cy.get(".oxd-file-input").selectFile(`cypress/fixtures/${fileName}`, { force: true });

      cy.get('button[type="submit"]').click();

      cy.get("h6.oxd-text.oxd-text--h6", { timeout: 10000 })
        .should("contain", emp.firstName)
        .and("contain", emp.lastName)
        .then(() => {
          cy.url().then((url) => {
            const empNumber = url.split("/").pop();
            createdEmployeeIds.push(empNumber!);
            cy.log(`Added Employee: ${emp.firstName} ${emp.lastName} — ID: ${emp.employeeId} — EmpNumber: ${empNumber}`);
          });
        });
    });
  });



});
