import { FormEvent, useState } from 'react';
import { GroceryItemData } from '../GroceryItem/GroceryItem';
import './GroceryForm.css';

interface GroceryFormProps {
  /**
   * Provide a callback to execute when user adds an item.
   */
  onAddItem: (item: GroceryItemData) => void;
}

const defaultName = '';
const defaultPrice = 1;

/**
 * Allows the addition of new grocery items to the list.
 */
export default function GroceryForm({ onAddItem }: GroceryFormProps) {
  const [name, setName] = useState<string>(defaultName);
  const [price, setPrice] = useState<number>(defaultPrice);

  function resetForm(): void {
    setName(defaultName);
    setPrice(defaultPrice);
  }

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    onAddItem({ name, price, done: false, id: crypto.randomUUID() });
    resetForm();
  }

  return (
    <form className="grocery-form" onSubmit={handleFormSubmit}>
      <label>
        Name
        <input
          className="grocery-form__input"
          type="text"
          placeholder="Apples, Eggs, etc."
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Price (USD $)
        <input
          className="grocery-form__input"
          type="number"
          placeholder="Item Price"
          required
          value={price}
          min="1"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </label>
      <button>Add Item</button>
    </form>
  );
}
