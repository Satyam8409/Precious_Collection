### links 

```text
Website demo
https://drive.google.com/file/d/1I2Q7RMqyhW78SLr8Ft5q28SDR805EbX6/view?usp=drive_link

### Responsive Website Demo
https://drive.google.com/file/d/1gOkndT6infQsyWxKVfHJut-Kh1R-DOwO/view?usp=drive_link

# Precious Collection

A modern collectible marketplace and community platform built with React and TypeScript.

Precious Collection allows users to discover collectible items, search and filter marketplace listings, manage their personal collection, maintain a wishlist, move items into a selling list, and interact with a community of collectors.

The application also includes persistent filters, debounced search, route-level code splitting, saved community posts with LocalStorage persistence, and comprehensive loading, error, and empty states.

---

## Features

### Marketplace

- Browse collectible items in a responsive grid.
- Search collectibles by title.
- Filter items by category.
- Filter items by condition.
- Sort items by:
  - Newest
  - Price: Low to High
  - Price: High to Low
- Open individual marketplace item details.
- Add items to the Collection.
- Add items to the Wishlist.
- Prevent duplicate items from being added to the same collection.
- Handle missing images gracefully.
- Display loading, error, and empty states.

### Collection

The Collection section contains three separate views:

- Owned
- Wishlist
- Selling

Users can:

- Search collection items.
- Filter by category.
- Sort by value.
- Move items between collection views.
- Remove items.
- Manage owned, wishlist, and selling items separately.

### Community

- Browse community posts.
- Search posts.
- Filter posts by category.
- Open individual community posts.
- Like posts.
- Save posts.
- View saved posts from a dedicated Saved Posts page.
- Handle missing or incomplete post data.
- Display loading, error, and empty states.

---

# Additional Features / Bonus Features

## 1. Debounced Search

A reusable `useDebounce` custom hook was implemented and reused across:

- Marketplace
- Community
- Collection

The search input remains immediately responsive, while the filtering operation is performed after the user pauses typing.

This reduces unnecessary filtering operations during rapid typing.

Implementation:

```text
src/hooks/useDebounce.ts
