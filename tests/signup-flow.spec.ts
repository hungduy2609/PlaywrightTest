import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';
import { test } from '../fixtures/conduit';

test.describe('Sign up flow', () => {
    test('Verify the username is displayed when creating successfully', async ({ signupPage, homePage }) => {
        // Arrange
        await signupPage.navigateToSignupPage();
        const username = faker.internet.username();
        const email = faker.internet.email();
        const password = faker.internet.password();

        // Act
        await signupPage.signup(username, email, password);

        // Assert
        expect(await homePage.getUsername()).toBe(username);
    });
});
