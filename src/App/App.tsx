import { useMemo, useState } from 'react';
import GroceryForm from '../GroceryForm/GroceryForm';
import GroceryItem, { GroceryItemData } from '../GroceryItem/GroceryItem';
import GroceryList from '../GroceryList/GroceryList';
import './App.css';

const budget = 30;

export default function App() {
  const [items, setItems] = useState<GroceryItemData[]>([]);

  // Memoized calculation of total price for all items in list.
  const { total, overBudget } = useMemo(() => {
    const total = items
      .map((item) => item.price)
      .reduce((prevPrice, nextPrice) => prevPrice + nextPrice, 0);
    return { total, overBudget: total > budget };
  }, [items]);

  /**
   * Respond to user adding an item to the list.
   */
  function handleAddItem(item: GroceryItemData): void {
    setItems([...items, item]);
  }

  /**
   * Respond to user removing an item from the list.
   */
  function handleItemRemove(id: string): void {
    const index = items.findIndex((i) => i.id === id);
    items.splice(index, 1);
    setItems([...items]);
  }

  /**
   * Respond to user marking an item on the list as done.
   */
  function handleItemDone(id: string, done: boolean) {
    const index = items.findIndex((i) => i.id === id);
    items[index].done = done;
    setItems([...items]);
  }

  return (
    <>
      <header>
        <h1>Grocery List</h1>
      </header>
      <main className="main-content">
        <GroceryForm onAddItem={handleAddItem} />
        <GroceryList>
          {items.map((item) => (
            <GroceryItem
              key={item.id}
              {...item}
              onDone={handleItemDone}
              onRemove={handleItemRemove}
            />
          ))}
        </GroceryList>
        <div>
          Total: ${total}
          {overBudget && (
            <div className="data__over-budget">
              You are ${total - budget} over budget!
            </div>
          )}
        </div>
      </main>
    </>
  );
}
