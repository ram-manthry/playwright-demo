import { test, expect } from '@playwright/test';

test.skip('test', async ({ page }) => {
	// Arrange
	const link = 'https://www.doorknock.co.nz/';
	const expected = 'Buy a home';

	// Act
	await page.goto(link);
	const actual = page.getByText('Buy a home').first();

	// Assert
	await expect(actual).toHaveText(expected);
});
