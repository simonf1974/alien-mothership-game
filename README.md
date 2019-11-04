# _nology Employee Game (alien-mothership-game)

## Functionality

Make the _nology employees work harder. Once they run out of energy, they take a sabbatical. When either all the employees are on a sabbatical, or Jenna is, the game is over.

## Learning

This project was written using JavaScript classes. All the game logic was contained in classes and separate from the GUI/display logic. In theory the classes could be reused for another completely different GUI implementation.

Inheritance was used to hold the common logic of the game characters, with specific logic/attributes/values in the sub classes.

I also used a game class to hold the overall state (e.g. array of characters) and logic for when the "fire" button was clicked (e.g. pick random character to "fire" on and determine if game is over).

This project also implements TypeScript to get the benefits of strong typing and Jest for automated testing of the game logic encapsulated in the classes.
