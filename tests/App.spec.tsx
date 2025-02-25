import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import App from '../src/App/App';
import { userEvent } from '@vitest/browser/context';

test('App integration test', async () => {
  const screen = render(<App />);

  // Testing initial state
  await expect.element(screen.getByText('Grocery List')).toBeInTheDocument();
  await expect
    .element(screen.getByText('Start your list by adding an item.'))
    .toBeInTheDocument();

  const nameInput = screen.getByRole('textbox', { name: 'Name' });
  const priceInput = screen.getByRole('spinbutton', { name: 'Price' });
  const addButton = screen.getByRole('button', { name: 'Add Item' });

  // Testing Add Item 1
  await userEvent.type(nameInput, 'Apples');
  await userEvent.clear(priceInput);
  await userEvent.type(priceInput, '2');
  await userEvent.click(addButton);
  await expect.element(screen.getByText('Total: $2')).toBeInTheDocument();

  // Testing Add Item 2
  await userEvent.type(nameInput, 'Bananas');
  await userEvent.clear(priceInput);
  await userEvent.type(priceInput, '5');
  await userEvent.click(addButton);
  await expect.element(screen.getByText('Total: $7')).toBeInTheDocument();

  // Testing remove
  let removeButton = screen.getByRole('button', { name: 'Remove Item' }).nth(0);
  await userEvent.click(removeButton);
  await expect.element(screen.getByText('Total: $5')).toBeInTheDocument();
  await expect.element(screen.getByText('Apples')).not.toBeInTheDocument();

  // Testing Add Item over budget
  await userEvent.type(nameInput, 'Bread');
  await userEvent.clear(priceInput);
  await userEvent.type(priceInput, '26');
  await userEvent.click(addButton);
  await expect.element(screen.getByText('Total: $31')).toBeInTheDocument();
  await expect.element(screen.getByText('over budget!')).toBeInTheDocument();

  // Testing the checkbox
  const checkbox = screen.getByRole('checkbox', { name: 'Done' }).nth(0);
  await userEvent.click(checkbox);
  await expect
    .element(screen.getByText('Bananas'))
    .toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0)');

  // Testing remove will also remove budget warning
  removeButton = screen.getByRole('button', { name: 'Remove Item' }).nth(1);
  await userEvent.click(removeButton);
  await expect.element(screen.getByText('Total: $5')).toBeInTheDocument();
  await expect.element(screen.getByText('over budget')).not.toBeInTheDocument();
});
