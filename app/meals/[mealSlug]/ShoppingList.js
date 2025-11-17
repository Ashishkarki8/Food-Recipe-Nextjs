"use client";

import { useState, useEffect } from "react";
import classes from "./ShoppingList.module.css";

const ShoppingList = ({ ingredients, recipeName }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [showList, setShowList] = useState(false);

  // Load checked items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`shopping-${recipeName}`);
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, [recipeName]);

  // Save to localStorage when checked items change
  useEffect(() => {
    localStorage.setItem(`shopping-${recipeName}`, JSON.stringify(checkedItems));
  }, [checkedItems, recipeName]);

  const toggleItem = (index) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const clearAll = () => {
    setCheckedItems({});
  };

  const getUncheckedItems = () => {
    return ingredients.filter((_, index) => !checkedItems[index]);
  };

  const exportList = () => {
    const unchecked = getUncheckedItems();
    const text = `Shopping List for ${recipeName}\n\n${unchecked.map(item => `☐ ${item.text}`).join('\n')}`;
    
    navigator.clipboard.writeText(text).then(() => {
      alert('Shopping list copied to clipboard!');
    });
  };

  const printList = () => {
    const unchecked = getUncheckedItems();
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(`
      <html>
        <head>
          <title>Shopping List - ${recipeName}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            ul { list-style: none; padding: 0; }
            li { padding: 8px; border-bottom: 1px solid #eee; }
          </style>
        </head>
        <body>
          <h1>Shopping List</h1>
          <h2>${recipeName}</h2>
          <ul>
            ${unchecked.map(item => `<li>☐ ${item.text}</li>`).join('')}
          </ul>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = ingredients.length;

  return (
    <div className={classes.shoppingList}>
      <button 
        onClick={() => setShowList(!showList)}
        className={classes.toggleBtn}
      >
        🛒 Shopping List ({totalCount - checkedCount} items)
      </button>

      {showList && (
        <div className={classes.listContainer}>
          <div className={classes.listHeader}>
            <h3>Shopping List</h3>
            <div className={classes.actions}>
              <button onClick={exportList} title="Copy to clipboard">
                📋 Copy
              </button>
              <button onClick={printList} title="Print list">
                🖨️ Print
              </button>
              <button onClick={clearAll} title="Uncheck all">
                🔄 Reset
              </button>
            </div>
          </div>

          <div className={classes.progress}>
            <span>{checkedCount} of {totalCount} items checked</span>
            <div className={classes.progressBar}>
              <div 
                className={classes.progressFill}
                style={{ width: `${(checkedCount / totalCount) * 100}%` }}
              ></div>
            </div>
          </div>

          <ul className={classes.list}>
            {ingredients.map((ingredient, index) => (
              <li 
                key={index} 
                className={checkedItems[index] ? classes.checked : ''}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={checkedItems[index] || false}
                    onChange={() => toggleItem(index)}
                  />
                  <span>{ingredient.text}</span>
                </label>
              </li>
            ))}
          </ul>

          {checkedCount === totalCount && totalCount > 0 && (
            <div className={classes.completion}>
              ✅ All items checked! Ready to cook!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShoppingList;