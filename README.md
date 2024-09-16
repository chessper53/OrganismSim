# Simulation Dashboard

This project is a simulation-based web application where various units (organisms) with distinct behaviors interact in a battlefield. The simulation contains two teams, Red and Blue, with different units such as infantry, archers, medics, and others. Each unit has its own behaviors, stats (like health, speed), and goals such as seeking enemies, protecting teammates, or spawning new units. The simulation is dynamic and can be configured to include obstacles, lakes, and other environmental features.

## Features
- **Simulation of Two Teams (Red vs Blue):** Each team has different units that behave according to their defined roles.
- **Dynamic Obstacle Placement:** Obstacles can be placed randomly on the battlefield to affect movement and strategies.
- **Organism Behavior:** Different organisms have unique behaviors, like seeking enemies, protecting allies, and healing teammates.
- **Stat Tracking:** Track kills, distances traveled, and other stats for each organism.
- **Victory Conditions:** The simulation ends when one team has no organisms left alive.
- **User Interface:** Control speed, start and stop the simulation, and visualize stats in real-time.
- **Unit Placement Modes:** You can either manually drag and place units on the battlefield or specify the number of units for each type.

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

Make sure you have the following installed:
- Node.js (>=14.x.x)
- npm (>=6.x.x) or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/chessper53/OrganismSim.git
    ```

2. Navigate to the project directory:
    ```bash
    cd simulation-dashboard
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Run the project:
    ```bash
    npm run dev
    ```

The application will be served at `http://localhost:5173`. You can view the simulation in your browser.

For a complete list of roles and their attributes, see the `roles.js` file in the `utils` folder.

## Pathfinding System

The simulation uses an advanced pathfinding algorithm to control how organisms navigate the battlefield. This system ensures that units can find their way around obstacles and strategically engage with opponents. Here's how it works:

- *Astar and Jump Point Search (JPS):* The pathfinding system utilizes these algorithms to calculate efficient movement paths. A* guarantees the shortest path, while JPS optimizes it by skipping unnecessary nodes.
  
- **Grid-Based Navigation:** The battlefield is divided into a grid, and each unit’s movement is calculated based on its position within this grid. Obstacles are marked as non-traversable points, preventing units from walking through them.
  
- **Dynamic Path Calculation:** Each unit recalculates its path if either it or its target moves, ensuring that it takes the most efficient route during the simulation.

- **Wandering Mode:** If a unit is unable to reach its target after a certain amount of time, it will enter a wandering state, moving randomly until it finds a new path or target.

- **Obstacle Handling:** Obstacles are placed randomly or manually on the battlefield, and the pathfinding system automatically updates to account for these, rerouting units to avoid collisions.

- **Movement Speed:** Each unit moves at a speed relative to its role. Fast units, such as wolves, move quickly across the battlefield, while heavier units, like elephants or ballistae, are slower but more powerful.

This system enables complex interactions and strategic gameplay, ensuring units can find and engage their targets while avoiding hazards.

## Simulation UI

The user interface contains the following features:

### **Simulation Header**
- **Counters**: Displays the number of organisms alive on each team.
- **Speed Control**: Allows you to speed up or slow down the simulation.
- **Edit Button**: Lets you edit the simulation by adding/removing organisms or obstacles.
  
### **Victory Conditions**
When one team has no organisms left alive, the simulation automatically ends and displays the winning team.

### **Stats Analysis**
Allows you to view statistics about the simulation, such as kill counts and distances traveled by each organism.

### UI Screenshots

#### Simulation in Action
![SimulationScreenshot](https://github.com/chessper53/OrganismSim/tree/main/src/assets/WebpageImages/SimulationScreenshot.png)

This screenshot shows the battlefield during an ongoing simulation. You can see:

- **Red and Blue Teams**: Both factions are actively moving and engaging with one another.
- **Icons**: Each type of organism is represented by different icons, such as castles, ships, and soldiers.
- **Kill Feed**: The top bar displays a kill feed showing who has been eliminated from each team.
- **Counter**: The large numbers near the castles indicate how many organisms are still alive for each team.
- **Obstacles**: The battlefield contains a large lake and other environmental obstacles, which units avoid as part of the pathfinding algorithm.

#### Unit Selection and Placement
![DashboardScreenshot](https://github.com/chessper53/OrganismSim/tree/main/src/assets/WebpageImages/DashboardScreenshot.png)

This is the main dashboard screen where you can select the units to be deployed for both Red and Blue teams:

- **Unit Selection Panel**: At the top, you can see various unit types (legionnaire, medic, centurion, archer, etc.) with plus and minus buttons to adjust the number of units to deploy.
- **Simulation Field**: The empty grid below is where the units will be placed. You can either manually drag units onto the field or let the system randomly assign their positions.

#### Stats Analysis Page
![GraphScreenshot](https://github.com/chessper53/OrganismSim/tree/main/src/assets/WebpageImages/GraphScreenshot.png)

This is the stats analysis screen, which provides real-time statistics about the simulation:

- **Top 3 Units**: Lists the top three units with the most kills during the simulation.
- **Top 3 Travelers**: Displays the units that have traveled the furthest distance.
- **Graph**: Shows a bar graph comparing the number of deaths on both teams, offering a visual representation of how the battle is progressing.

## Organism Roles

The simulation features various roles with unique behaviors. Click on each role to expand and see more details.

<details>
  <summary><strong>Civilian</strong></summary>
  
  - **Type**: Wanderer  
  - **Speed**: Slow  
  - **Health**: 1  
  - **Behavior**: Roams the battlefield aimlessly and does not engage in combat.

</details>

<details>
  <summary><strong>Legionnaire</strong></summary>
  
  - **Type**: Seeker  
  - **Speed**: Moderate  
  - **Health**: 1  
  - **Behavior**: Actively seeks out enemies and engages them in close combat.

</details>

<details>
  <summary><strong>Medic</strong></summary>
  
  - **Type**: Protector  
  - **Speed**: Fast  
  - **Health**: 3  
  - **Behavior**: Moves towards injured teammates and heals them.

</details>

<details>
  <summary><strong>Archer</strong></summary>
  
  - **Type**: Ranged Seeker  
  - **Speed**: Moderate  
  - **Health**: 1  
  - **Range**: 50 units  
  - **Behavior**: Attacks enemies from a distance and moves closer if they are out of range.

</details>

<details>
  <summary><strong>Centurion</strong></summary>
  
  - **Type**: Seeker  
  - **Speed**: Fast  
  - **Health**: 4  
  - **Behavior**: Seeks out enemies and engages them in close combat.

</details>

<details>
  <summary><strong>Emperor</strong></summary>
  
  - **Type**: Seeker  
  - **Speed**: Moderate  
  - **Health**: 10  
  - **Behavior**: Powerful and heavily armored, deals high damage at close range.

</details>

<details>
  <summary><strong>Shield Bearer</strong></summary>
  
  - **Type**: Protector  
  - **Speed**: Slow  
  - **Health**: 60  
  - **Behavior**: Protects nearby teammates by absorbing damage.

</details>

<details>
  <summary><strong>Wolf</strong></summary>
  
  - **Type**: Seeker  
  - **Speed**: Very Fast  
  - **Health**: 0.1  
  - **Behavior**: Fast but weak unit, engages enemies quickly in close combat.

</details>

<details>
  <summary><strong>Ballista</strong></summary>
  
  - **Type**: Ranged Seeker  
  - **Speed**: Slow  
  - **Health**: 5  
  - **Range**: 100 units  
  - **Behavior**: Attacks enemies from long range.

</details>

<details>
  <summary><strong>Roman Ship</strong></summary>
  
  - **Type**: Seeker  
  - **Speed**: Moderate  
  - **Health**: 60  
  - **Range**: 150 units  
  - **Behavior**: Water-based unit with high health and long-range attacks.

</details>
