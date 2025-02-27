# Pokemon Explorer

This is a **Next.js 15** application that allows users to explore detailed information about various Pokemon, including their abilities, types, base stats, and moves. Users can search for Pokemon by name and view their information in a responsive layout.

## Features

- **Search Pokemon**: Search for Pokemon by name with debounced input.
- **Pokemon Details**: View detailed Pokemon information including abilities, stats, moves, and more.
- **Responsive Layout**: The layout adapts for both mobile and desktop views.
- **Pokemon Moves**: Display all available moves for a Pokemon.
- **Pokemon Abilities**: Display all abilities related to the Pokemon.
- **Infinite Scrolling**: Browse the list of Pokemon with infinite scrolling. More Pokémon are loaded as you scroll down the page.



## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 18 or later)
- **npm** 

## Getting Started

Follow these steps to get the project running on your local machine:

### 1. Clone the Repository

Clone the repository using Git:

```bash
git clone https://github.com/mr-nishanth/pokemon.git
```

### 2. Install Dependencies

Navigate into the project directory and install the required dependencies.

**Note**: Since you are using Next.js 15, you'll need to install the dependencies with the `--legacy-peer-deps` flag to avoid any peer dependency issues:

```bash
cd pokemon
npm install --legacy-peer-deps
```

### 3. Run the Development Server

Once the dependencies are installed, you can start the Next.js development server:

```bash
npm run dev
```

This will start the server on `http://localhost:3000`.

### 4. Open the Application in Your Browser

After the server starts, open your browser and navigate to:

```
http://localhost:3000
```

You should see the Pokemon Explorer application in action.

## Features and Interactions

### Search Pokemon

- Type the name of a Pokemon in the search bar to filter the list of Pokemon.
- The search functionality is debounced, meaning it will wait for you to stop typing before triggering the search.

### Pokemon Details

- When you click on a Pokemon from the search results, you’ll be taken to a detailed page showing:
  - **Name**: The name of the Pokemon.
  - **Abilities**: All abilities the Pokemon has.
  - **Types**: The Pokémon’s types, such as Fire, Water, etc.
  - **Base Stats**: Displays HP, Attack, Defense, Special Attack, Special Defense, and Speed.
  - **Moves**: A complete list of moves the Pokemon can learn.

### Responsive Layout

The application adjusts its layout based on the screen size:

- On small screens (e.g., mobile), the Pokemon image will be displayed on top, with the details below.
- On larger screens, the Pokemon image will be on the left, and the details will be on the right.

## Credits

- **Pokemon Logo**: The Pokemon logo used in the project is sourced from the internet. We do not claim ownership of the logo.
- **Pokemon Data**: This app uses data provided by the [Pokemon API](https://pokeapi.co/), a public API that provides detailed information about Pokemon.

