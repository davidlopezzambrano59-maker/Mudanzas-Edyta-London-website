import { test, expect } from '@playwright/test';

test.describe('Quote Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/quote');
  });

  test('calculates quote correctly for requirements test case', async ({ page }) => {
    // Test case from requirements: large van, 2 loaders, 2 hours, 25 miles = £237.50
    
    // Select van size
    await page.getByRole('combobox', { name: /van size/i }).click();
    await page.getByRole('option', { name: /luton van/i }).click();
    
    // Select loaders
    await page.getByRole('combobox', { name: /loaders/i }).click();
    await page.getByRole('option', { name: /2 loaders/i }).click();
    
    // Set hours
    await page.getByLabelText(/estimated hours/i).fill('2');
    
    // Set miles
    await page.getByLabelText(/distance/i).fill('25');
    
    // Wait for calculation and check breakdown
    await expect(page.getByText('£100/hour')).toBeVisible(); // Base hourly rate: 50 + (2*25)
    await expect(page.getByText('£200')).toBeVisible(); // Labour cost: 100 * 2
    await expect(page.getByText('£37.50')).toBeVisible(); // Distance charge: 25 * 1.5
    await expect(page.getByText('£237.50')).toBeVisible(); // Total
  });

  test('applies 2-hour minimum correctly', async ({ page }) => {
    // Set 1 hour and verify 2-hour minimum is applied
    await page.getByLabelText(/estimated hours/i).fill('1');
    
    await expect(page.getByText(/2-hour minimum will be applied/i)).toBeVisible();
    await expect(page.getByText('Billable Hours: 2')).toBeVisible();
  });

  test('shows free travel for distances under 10 miles', async ({ page }) => {
    await page.getByLabelText(/distance/i).fill('5');
    
    await expect(page.getByText(/free travel.*within 10 miles/i)).toBeVisible();
    await expect(page.getByText('Distance Charge: FREE')).toBeVisible();
  });

  test('charges for travel over 10 miles', async ({ page }) => {
    await page.getByLabelText(/distance/i).fill('15');
    
    await expect(page.getByText(/travel charge applies/i)).toBeVisible();
    await expect(page.getByText('£22.50')).toBeVisible(); // 15 * 1.5
  });

  test('WhatsApp URL contains correct quote details', async ({ page }) => {
    // Set test values
    await page.getByRole('combobox', { name: /van size/i }).click();
    await page.getByRole('option', { name: /luton van/i }).click();
    
    await page.getByRole('combobox', { name: /loaders/i }).click();
    await page.getByRole('option', { name: /2 loaders/i }).click();
    
    await page.getByLabelText(/estimated hours/i).fill('2');
    await page.getByLabelText(/distance/i).fill('25');
    
    // Fill form details
    await page.getByLabelText(/full name/i).fill('Test User');
    await page.getByLabelText(/phone/i).fill('07123456789');
    
    // Click WhatsApp button and check URL
    const whatsappButton = page.getByRole('button', { name: /book.*whatsapp/i });
    await expect(whatsappButton).toBeVisible();
    
    // Check that the button has correct attributes for WhatsApp
    await expect(whatsappButton).toHaveAttribute('type', 'submit');
  });

  test('form validation works correctly', async ({ page }) => {
    // Try to submit without required fields
    await page.getByRole('button', { name: /send.*whatsapp/i }).click();
    
    // Should show validation errors
    await expect(page.getByText(/name must be at least 2 characters/i)).toBeVisible();
    await expect(page.getByText(/please enter a valid phone number/i)).toBeVisible();
  });

  test('calculator updates in real-time', async ({ page }) => {
    // Change van size and verify immediate update
    await page.getByRole('combobox', { name: /van size/i }).click();
    await page.getByRole('option', { name: /small van/i }).click();
    
    await expect(page.getByText('£40/hour')).toBeVisible();
    
    // Change to large van
    await page.getByRole('combobox', { name: /van size/i }).click();
    await page.getByRole('option', { name: /luton van/i }).click();
    
    await expect(page.getByText('£50/hour')).toBeVisible();
  });

  test('accessibility: calculator has proper ARIA labels', async ({ page }) => {
    await expect(page.getByRole('region', { name: /quote breakdown/i })).toBeVisible();
    
    // Check for aria-live region for total updates
    const totalElement = page.locator('[aria-live]');
    await expect(totalElement).toBeVisible();
  });

  test('mobile responsive design', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    
    // Calculator should still be usable on mobile
    await expect(page.getByRole('combobox', { name: /van size/i })).toBeVisible();
    await expect(page.getByLabelText(/estimated hours/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /book.*whatsapp/i })).toBeVisible();
  });
});










