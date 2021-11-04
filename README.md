# Monty hall experiment

The question:

- Suppose you're on a game show, and you're given the choice of three doors: Behind one door is a car; behind the others, goats. You pick a door, say No. 1, and the host, who knows what's behind the doors, opens another door, say No. 3, which has a goat. He then says to you, "Do you want to pick door No. 2?" Is it to your advantage to switch your choice?

The answer:

- **Yes**.

---

If you've never encountered this problem before, the idea that switching doors would increase your chances of winning very likely seems wrong. How could switching doors increase your chances?

The table below shows three different rounds of the game. Let's say that in these three rounds, we pick door number 1 every time. We can easily see that if we don't switch doors, we lose 2 out of 3 times.

| Round | Door 1 | Door 2 | Door 3 |
| ----- | ------ | ------ | ------ |
| 1     | Goat   | Goat   | Car    |
| 2     | Goat   | Car    | Goat   |
| 3     | Car    | Goat   | Goat   |

Now let's think about what happens when we do make the switch. In Round 1, we pick door number 1. Monty **knowing** the car is behind door #3 is **forced** to open door #2. We now have a choice between staying with door #1 or switching to door #3. We switch, and we win. The same thing happens in Round 2. We only lose in Round 3 when we switch from a winning door to a door with a goat.

So we can logically say that the only time we lose is when we choose the right door at the beginning of the round. And since we only have a 1 in 3 chance of selecting the right door, we can then say that we have a 2 in 3 chance of choosing the wrong door. Choosing the wrong door at the beginning ultimately leads to our winning in the end.

![](/public/assets/math.gif)

Still confused? Don't feel bad. It's a very unintuitive problem and one that even mathematicians have gotten wrong. Try it and see for yourself. If you play 100 rounds of this game, on average, you'll win 2 out of every 3.

The game is hosted on [surge](https://monty-hall-experiment.surge.sh)

Or run it locally on your computer

- `git clone` this repository
- `cd monty-hall-experiment` cd into the folder
- `yarn install` install dependencies
- `yarn start` to run the development server
