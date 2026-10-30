# Debounced Transaction Search

A lightweight transaction search application built using **Vanilla JavaScript, HTML, and CSS**.

The project demonstrates core JavaScript concepts, including closures, higher-order functions, debouncing, timer management, DOM manipulation, and event handling.

This project is part of my structured software engineering learning journey, focused on strengthening JavaScript fundamentals and frontend engineering skills.

## Features

- **Transaction Listing:** Displays 40 transactions from a static JavaScript dataset.
- **Real-Time Search:** Filters transactions by transaction ID, merchant, category, or payment status.
- **Debounced Search:** Waits 300 milliseconds after the user stops typing before filtering records.
- **Case-Insensitive Search:** Supports queries such as `Amazon`, `AMAZON`, and `amazon`.
- **Whitespace Handling:** Removes leading and trailing whitespace from search queries.
- **Search Cancellation:** Cancels pending search operations when the input is cleared.
- **Dynamic Result Count:** Displays the number of matching transactions.
- **Empty-State Handling:** Displays "No transactions found" when there are no matches.
- **Reusable Debounce Utility:** Implements a generic debounce function with cancellation support.

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- JavaScript ES Modules
- Browser DOM APIs

No external JavaScript frameworks or libraries are required.

## Project Structure

```text
transaction-search/
├── index.html
├── style.css
├── app.js
├── transactions.js
└── README.md
```

### File Responsibilities

| File | Description |
|---|---|
| `index.html` | Defines the search input and transaction table |
| `style.css` | Provides basic styling for the interface |
| `app.js` | Contains debouncing, filtering, event handling, and rendering logic |
| `transactions.js` | Exports the static dataset of 40 transactions |
| `README.md` | Documents the project and implementation |

## Getting Started

### Prerequisites

A modern browser and a local HTTP server.

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

Replace the placeholder URL and folder name with your actual repository details.

### 2. Start a local development server

If Python is installed:

```bash
python -m http.server 8000
```

### 3. Open the application

Visit:

`http://localhost:8000`

The application initially displays all 40 transactions.

**Note:** A local server is recommended because the project uses JavaScript ES module imports.

## How It Works

### 1. Initial Rendering

When the application loads, it imports the static transaction dataset and renders all records in the HTML table.

```javascript
displayTransactions(transactions);
```

The rendering function creates table rows and cells using browser DOM APIs.

`textContent` is used to insert transaction values safely.

### 2. Searching Transactions

The application searches across four transaction properties:

- Transaction ID
- Merchant
- Category
- Status

Search queries are normalized using:

```javascript
const searchText = event.target.value.trim().toLowerCase();
```

The records are filtered using JavaScript's `Array.prototype.filter()` and `String.prototype.includes()` methods.

### 3. Reusable Debounce Function

The application implements a custom debounce utility:

```javascript
function debounce(callback, delay) {
    let timer = null;

    function debounced(...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            timer = null;
            callback.apply(this, args);
        }, delay);
    }

    debounced.cancel = function () {
        clearTimeout(timer);
        timer = null;
    };

    return debounced;
}
```

**How debouncing works:**

1. The user types into the search input.
2. A timer is scheduled for 300 milliseconds.
3. If the user types again before the timer completes, the previous timer is cancelled.
4. A new timer starts.
5. Once the user stops typing for 300 milliseconds, the search callback executes.

This reduces unnecessary filtering while the user is actively typing.

### 4. Closure-Based Timer Management

The `timer` variable is declared inside the `debounce()` function.

The returned `debounced()` function retains access to that variable through a JavaScript closure.

Each invocation of `debounce()` creates an independent timer, allowing multiple debounced functions to operate without interfering with one another.

### 5. Handling Search Cancellation

When the search field becomes empty, the application cancels any pending search callback:

```javascript
debounceSearch.cancel();
displayTransactions(transactions);
```

This prevents an earlier scheduled search from updating the table after the search field has already been cleared.

The full dataset is restored immediately.

### 6. Empty-State Handling

When no transactions match the search query:

- Existing table rows are cleared.
- A message displays: `No transactions found`.
- The result count updates to `Showing 0 transactions`.

DOM manipulation is performed using `createElement()`, `appendChild()`, and `replaceChildren()`.

## Manual Test Cases

| Test | Expected Result |
|---|---|
| Load application | All 40 transactions are displayed |
| Search `amazon` | Matching Amazon transactions appear |
| Search `AMAZON` | Same results as lowercase search |
| Search ` Amazon ` | Leading and trailing spaces are ignored |
| Search `SUCCESS` | Transactions with matching status appear |
| Search `xyz123` | No-results message appears |
| Clear search input | All 40 transactions are restored |
| Type rapidly | Only the final debounced search executes |
| Clear input before 300 ms | Pending search is cancelled |

These are manual verification scenarios. An automated test suite has not yet been implemented.

## JavaScript Concepts Practiced

| Concept | Application |
|---|---|
| Closures | Private timer state inside `debounce()` |
| Higher-order functions | Accepting and returning functions |
| Rest parameters | Supporting multiple callback arguments |
| `apply()` | Preserving callback context and forwarding arguments |
| `setTimeout()` | Delaying search execution |
| `clearTimeout()` | Cancelling pending callbacks |
| Array methods | Filtering transaction records |
| String methods | Case-insensitive substring matching |
| DOM manipulation | Dynamically creating and updating table rows |
| Event handling | Listening to input events with `addEventListener()` |
| ES Modules | Importing transaction data from another JavaScript file |

## Current Limitations

- The application uses a static dataset of 40 transactions.
- Filtering happens in the browser.
- Transactions are not fetched from an external API.
- No server-side pagination or sorting is implemented.
- No automated tests are included yet.

## Future Improvements

- Add automated tests for the debounce utility.
- Implement sorting and category filters.
- Add pagination for larger datasets.
- Implement asynchronous API-based searching.
- Add loading and error states.
- Handle stale or out-of-order asynchronous responses.
- Improve accessibility and keyboard navigation.

## Learning Outcome

This project helped me practice writing reusable JavaScript utilities, managing asynchronous timers, separating filtering logic from DOM rendering, and handling edge cases in user interactions.

The main learning outcome was implementing a reusable debounce function using closures and applying it to a practical transaction-search interface.
