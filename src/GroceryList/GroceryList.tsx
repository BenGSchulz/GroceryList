import { ReactElement } from 'react';
import './GroceryList.css';

interface GroceryListProps {
  /**
   * Provide the list of `<GroceryItem>` as children to this component to display.
   */
  children: ReactElement[];
}

/**
 * Displays items that the user has added to the list.
 */
export default function GroceryList({ children }: GroceryListProps) {
  return children.length ? (
    <ul className="grocery-list">{children}</ul>
  ) : (
    <div className="grocery-list">Start your list by adding an item.</div>
  );
}
