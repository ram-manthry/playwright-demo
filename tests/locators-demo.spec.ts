import { test, expect } from '@playwright/test';

test.describe('Form layout tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://pw-practice-app.web.app/');
		await page.getByRole('link', { name: 'Forms' }).click();
		await page.getByRole('link', { name: 'Form Layouts' }).click();
	});

	test('locator syntax rules', async ({ page }) => {
		// find by tag name - input
		await page.locator('input').nth(3).click();

		// find by ID
		// await page.locator('#inputEmail1').click();

		// find by class name
		// await page.locator('.input-full-width').nth(2).click();

		// find by attribute name
		// await page.locator('[placeholder="Email"]').nth(1).click();
		// await page
		// 	.locator(
		// 		'[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
		// 	)
		// 	.nth(2)
		// 	.click();

		// find by combination of locators
		// await page
		// 	.locator('input.input-full-width[placeholder="Email"]')
		// 	.nth(1)
		// 	.click();

		// find by text
		// find by partial text
		// await page.locator(':text("using")').selectText();
		// find by exact text
		// await page.locator(':text-is("Using the Grid")').selectText();
	});

	test('user facing locators', async ({ page }) => {
		// await page.getByRole('textbox', { name: 'Email' }).nth(1).click();
		// await page.getByRole('button', { name: 'Sign In' }).nth(0).click();

		// find by label
		await page.getByLabel('Email').nth(0).click();

		// find by placeholder
		// await page.getByPlaceholder('Email').nth(1).click();

		// // find by text
		// await page.getByText('Using the Grid').selectText();

		// // find by title
		// await page.getByTitle('IoT Dashboard').click();

		// find by test id
		// NOT RECOMMENDED
		// await page.getByTestId('sign-in').click();
	});

	test('locate child elements from parent', async ({ page }) => {
		// nb-card > nb-radio > text Option 1
		// await page.locator('nb-card nb-radio :text-is("Option 2")').click();
		await page
			.locator('nb-card')
			.locator('nb-radio')
			.locator(':text-is("Option 2")')
			.click();

		await page
			.locator('nb-card')
			.getByRole('button', { name: 'Sign In' })
			.first()
			.click();

		await page.locator('nb-card').nth(1).getByRole('button').click();
	});

	test('filter from parent elements', async ({ page }) => {
		// await page
		// 	.locator('nb-card', { hasText: 'Using the Grid' })
		// 	.getByRole('textbox', { name: 'Email' })
		// 	.click();

		// await page
		// 	.locator('nb-card')
		// 	.filter({ hasText: 'Using the Grid' })
		// 	.getByRole('textbox', { name: 'Email' })
		// 	.click();

		await page
			.locator('nb-card')
			.filter({ has: page.locator('nb-checkbox') })
			.filter({ hasText: 'Sign In' })
			.getByRole('textbox', { name: 'Email' })
			.click();

		await page
			.locator(':text-is("Using the Grid')
			.locator('..')
			.getByRole('textbox', { name: 'Email' })
			.click();
	});

	test('Reusing Locators - Sign In - Using the Grid', async ({ page }) => {
		const gridForm = page
			.locator('nb-card')
			.filter({ hasText: 'Using the Grid' });
		const emailField = gridForm.getByRole('textbox', { name: 'Email' });
		const pwdField = gridForm.getByRole('textbox', { name: 'Password' });
		const signInBtn = gridForm.getByRole('button');

		await emailField.fill('ram@magicturtlehq.com');
		await pwdField.fill('abc123');
		await signInBtn.click();

		await expect(emailField).toHaveValue('ram@magicturtlehq.com');
	});

	test('Extracting Values', async ({ page }) => {
		const gridForm = page
			.locator('nb-card')
			.filter({ hasText: 'Using the Grid' });
		const signInBtn = gridForm.getByRole('button');
		// const btnText = await signInBtn.textContent();
		// expect(btnText?.toLowerCase()).toEqual('sign in');
		expect(signInBtn).toHaveText('Sign in2');
		signInBtn.click();

		const emailField = gridForm.getByRole('textbox', { name: 'Email' });
		await emailField.fill('ram@magicturtlehq.com');
		const emailValue = await emailField.inputValue();
		expect(emailValue).toEqual('ram@magicturtlehq.com');

		// const emailPlaceholderValue = await emailField.getAttribute('placeholder');
		// expect(emailPlaceholderValue).toEqual('Email');

		// const radioBtns = await gridForm.locator('nb-radio').allTextContents();
		// const expectedRadioBtns = ['Option 1', 'Option 2', 'Disabled Option'];
		// expect(radioBtns).toEqual(expectedRadioBtns);
	});

	test('different assertions', async ({ page }) => {
		// Generic
		const expected = 1000;
		expect(expected).toEqual(1000);

		// locator specific
		const gridForm = page
			.locator('nb-card')
			.filter({ hasText: 'Using the Grid' });
		const signInBtn = gridForm.getByRole('button');
		expect(signInBtn).toHaveText('Sign in');
	});
});
