import './GroceryItem.css';

export interface GroceryItemData {
  /**
   * A generated unique id for the item.
   */
  id: string;
  /**
   * The user-provided name for the item.
   */
  name: string;
  /**
   * The user-provided price for the item.
   */
  price: number;
  /**
   * `True` when user has marked item as done, `false` otherwise.
   */
  done: boolean;
}

type GroceryItemProps = {
  /**
   * Provide a callback to execute when user marks item as done.
   */
  onDone: (id: string, done: boolean) => void;
  /**
   * Provide a callback to execute when the user removes an item.
   */
  onRemove: (id: string) => void;
} & GroceryItemData;

/**
 * An item the user has added to the list.
 */
export default function GroceryItem({
  id,
  name,
  price,
  done,
  onDone,
  onRemove,
}: Readonly<GroceryItemProps>) {
  return (
    <li className="grocery-item">
      <input
        aria-label="Mark Done"
        className="grocery-item__check"
        type="checkbox"
        checked={done}
        onChange={(e) => onDone(id, e.target.checked)}
      />
      <span
        className={`grocery-item__name${
          done ? ' grocery-item__name--done' : ''
        }`}
      >
        {name}
      </span>
      <span className="grocery-item__price"> ${price}</span>
      <button
        aria-label="Remove Item"
        className="grocery-item__remove"
        onClick={() => onRemove(id)}
      >
        X
      </button>
    </li>
  );
}
