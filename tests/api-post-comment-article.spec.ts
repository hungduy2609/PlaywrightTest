import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';
import { DataUtils } from '../core/utils/data';
import { test } from '../fixtures/conduit';

test.describe('Post comment flow', () => {
    let articleId: string;
    test.beforeEach(async ({ articleDetailPage, articleService, headers }) => {
        const article = {
            title: DataUtils.generateSentence(),
            description: DataUtils.generateSentence(10),
            body: DataUtils.generateParagraph(),
            tags: DataUtils.generateWordsArray(3),
        };
        const response = await articleService.createArticle(article, headers);
        articleId = response.body.article.slug;
        await articleDetailPage.navigateToArticleDetailPage(articleId);
    });
    test('Verify the user can post comment to an article', async ({ articleDetailPage }) => {
        // Arrange
        const comment = faker.lorem.sentence();

        // Act
        await articleDetailPage.postComment(comment);

        // Assert
        expect(await articleDetailPage.getCommentText()).toBe(comment);
    });

    test.afterEach(async ({ articleService, headers }) => {
        const response = await articleService.deleteArticle(articleId, headers);
        expect(response.status).toBe(204);
    });
});
