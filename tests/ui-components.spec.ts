import { test, expect } from '@playwright/test';

test.describe('timeout tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('http://uitestingplayground.com/ajax');
	});
	test('Ajax test', async ({ page }) => {
		const ajaxButton = page.getByRole('button', {
			name: 'Button Triggering AJAX Request',
		});
		await ajaxButton.click();
		const expected = 'Data loaded with AJAX get request.';
		const successMessageBox = page.locator('.bg-success');
		await successMessageBox.waitFor({ state: 'attached' });
		const successMessage = await successMessageBox.textContent();
		expect(successMessage).toEqual(expected);
		// await expect(successMessageBox).toHaveText(expected);
	});
});
