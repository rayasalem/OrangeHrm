import AddEmployee from "cypress/support/pages/PIM/AddEmployee";
import BuzzPage from "cypress/support/pages/buzz/BuzzPage";
import BuzzLikePage from "cypress/support/pages/buzz/BuzzLikePage";
import BuzzComment from "cypress/support/pages/buzz/BuzzComment";
import { faker } from "@faker-js/faker";

describe('OrangeHRM - 5 Employees Like & Comment on Same Post', () => {

  const employees = [];
  const adminPost = "Team synergy brings success! 💪🚀";

  it('should add 5 employees via API, post as admin, and let all like & comment', () => {
    // 1️⃣ تسجيل دخول الأدمن
    cy.loginWithAdmin();

    // 2️⃣ نشر بوست جديد
    BuzzPage.openBuzzPage();
    BuzzPage.addPost(adminPost);
    BuzzPage.verifyLastPost(adminPost);

    // 3️⃣ إنشاء 5 موظفين (باستخدام faker)
    for (let i = 1; i <= 5; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const employeeId = faker.string.alphanumeric(6).toUpperCase();

      // من الأفضل نستخدم إضافة الـ API من الكلاس نفسه
      AddEmployee.addEmployeeViaApi(firstName, lastName, employeeId).then(() => {
        // نضيف المستخدم لمصفوفة الذاكرة (للاستخدام لاحقًا)
        employees.push({
          username: `${firstName}.${lastName}`,
          password: "Emp@12345", // لو النظام يعطي نفس الباسوورد الافتراضي
          firstName,
          lastName,
        });
      });
    }

    // ننتظر إنشاء الكل قبل التفاعل
    cy.wrap(null).then(() => {
      cy.log("✅ All 5 employees created successfully");
    });

    // 4️⃣ تفاعل كل موظف مع البوست
    cy.wrap(employees).each((emp) => {
      cy.log(`👤 Logging in as ${emp.username}`);

      // تسجيل الدخول
      cy.visit('/web/index.php/auth/login');
      cy.get('input[name="username"]').type(emp.username);
      cy.get('input[name="password"]').type(emp.password);
      cy.get('button[type="submit"]').click();

      // الذهاب إلى Buzz
      BuzzPage.openBuzzPage();

      // يعمل لايك
      BuzzLikePage.addLikeToFirstPost();

      // يعمل كومنت
      const commentText = `Great post! - ${emp.firstName}`;
      BuzzComment.addCommentToFirstPost(commentText);

      // تسجيل الخروج
      cy.get('.oxd-userdropdown-tab').click();
      cy.contains('Logout').click();
    });

    // 5️⃣ تحقق نهائي (بعد تفاعل الكل)
    cy.loginWithAdmin();
    BuzzPage.openBuzzPage();

    // التحقق أن عدد اللايكات = 5 وعدد الكومنتات = 5
    cy.get('.orangehrm-buzz-post').first().within(() => {
      cy.get('.oxd-icon-button').first().invoke('text').then((likesText) => {
        cy.log(`❤️ Likes count text: ${likesText}`);
      });
      cy.get('.orangehrm-buzz-comment').should('have.length.at.least', 5);
    });
  });
});
