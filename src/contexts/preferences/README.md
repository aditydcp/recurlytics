# 🧩 Preferences Contexts

This folder contains all **user preference–related contexts**.  
Each context in this directory manages one aspect of the user's app preferences — such as theme, language, or other UI behaviors.

## 📁 Folder Structure

```bash
 │
 ├── PreferencesContext.tsx - Handling the persistence and states of each preferences item
 └── ThemeContext.tsx - Handling Theme Modes (light/dark/system) and reading system's mode
```

## ⚙️ Design Philosophy

### Separation of Concerns
Each preference type (e.g. theme, language, layout) has its own context, so:
- Logic remains modular and isolated.
- You can modify one preference feature without affecting others.
- Future preferences can be added without touching existing contexts.

### Persistent Yet Reactive
- Each context may use **localStorage** to persist user preferences between sessions.  
- Where relevant, preferences respond to **system-level changes** (e.g., OS dark mode switch).

### Composability
Contexts are combined at the app level, wrapped in a single **`PreferencesProvider`** that composes all preference providers for convenience.