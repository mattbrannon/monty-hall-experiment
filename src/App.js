import { Component } from 'react';

import Button, { StartButton } from './components/Button';
import Door from './components/Door';
import Scoreboard from './components/Score';
import styled from 'styled-components/macro';
import { createDoors, getFinalDoor, getHostChoice } from './utils';

export default class App extends Component {
  state = {
    doors: [],
    playerChoice: '',
    playerChoiceIndex: null,
    hostChoice: null,
    isNewGame: true,
    round1: false,
    round2: false,
    round3: false,
    playerHasChosen: false,
    finalPrize: null,
    finalPrizeIndex: null,
    count: 0,
    isEndGame: false,
    playerWins: null,
    score: {
      win: 0,
      lose: 0,
      total: 0,
    },
  };

  componentDidMount() {
    const doors = createDoors();
    this.setState((state) => {
      return {
        ...state,
        doors: doors,
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { finalPrize } = this.state;
    if (finalPrize && finalPrize !== prevState.finalPrize) {
      const score = { ...this.state.score };
      score.total += 1;
      finalPrize === 'car' ? (score.win += 1) : (score.lose += 1);
      this.setState((state) => ({
        ...state,
        score,
        // isEndGame: true,
        playerWins: finalPrize === 'car',
        round3: true,
      }));
    }

    if (this.state.round1 && this.state.round1 !== prevState.round1) {
      const doors = createDoors();
      this.setState({ doors });
    }
  }

  displayDoors() {
    const { doors } = this.state;
    return doors.map((door, i) => (
      <Door
        onClick={() => this.handleDoorSelection(door, i)}
        key={i}
        door={door}
        index={i}
        playerChoiceIndex={this.state.playerChoiceIndex}
        playerChoice={this.state.playerChoice}
        hostChoice={this.state.hostChoice}
        playerHasChosen={this.state.playerHasChosen}
        // handleDoorSelection={this.handleDoorSelection}
        hostHasRevealed={this.state.hostHasRevealed}
        count={this.state.count}
        isEndGame={this.state.round1}
        finalPrize={this.state.finalPrize}
        finalPrizeIndex={this.state.finalPrizeIndex}
      >
        {i + 1}
      </Door>
    ));
  }

  displayPrompts() {
    const { round1, round2, finalPrize, playerWins } = this.state;
    if (round1) {
      return <b>Please make your selection</b>;
    } else if (round2) {
      return (
        <>
          <p>
            Monty has revealed a goat in door{' '}
            {this.state.hostChoice + 1}
          </p>
          <b>Do you want to swap doors or stay?</b>
        </>
      );
    } else if (finalPrize) {
      if (playerWins) {
        return (
          <>
            <b>Winner winner chicken dinner!</b>
            <h3>Player wins a brand new {finalPrize}</h3>
          </>
        );
      } else {
        return (
          <>
            <b>Have fun with your {finalPrize}!</b>
          </>
        );
      }
    }
  }

  displayButtons = () => {
    if (this.state.isNewGame) {
      return (
        <StartButton
          onClick={this.startGame}
          isNewGame={this.state.isNewGame}
        >
          Start Game
        </StartButton>
      );
    } else if (this.state.round2) {
      return (
        <>
          <Button onClick={() => this.playerWillSwap(true)}>
            Swap
          </Button>
          <Button onClick={() => this.playerWillSwap(false)}>
            Stay
          </Button>
        </>
      );
    } else if (this.state.round3) {
      return (
        <StartButton
          onClick={this.resetGame}
          isNewGame={this.state.round3}
        >
          Play Again
        </StartButton>
      );
    }
  };

  handleDoorSelection = (door, i) => {
    if (this.state.round1 || this.state.isNewGame) {
      const hostChoice = getHostChoice(this.state.doors, i);

      this.setState({
        playerChoice: door,
        playerChoiceIndex: i,
        isNewGame: false,
        round1: false,
        round2: true,
        hostChoice: hostChoice,
        playerHasChosen: true,
        count: this.state.count + 1,
      });
    }
  };

  startGame = () => {
    if (this.state.isNewGame || this.state.finalPrize) {
      console.log('clicked');
      this.setState({ round1: true, isNewGame: false });
    }
  };

  resetGame = () => {
    this.setState((state) => {
      return {
        ...state,
        playerChoice: '',
        playerChoiceIndex: null,
        hostChoice: null,
        isNewGame: true,
        round1: false,
        round2: false,
        round3: false,
        playerHasChosen: false,
        finalPrize: null,
        finalPrizeIndex: null,
        count: 0,
        isEndGame: false,
        playerWins: null,
      };
    });
    this.startGame();
  };

  playerWillSwap = (swap) => {
    if (swap) {
      const lastDoor = getFinalDoor(
        this.state.doors,
        this.state.playerChoiceIndex,
        this.state.hostChoice
      );
      this.setState({
        finalPrize: this.state.doors[lastDoor],
        // isEndGame: true,
        round2: false,
        finalPrizeIndex: lastDoor,
      });
    } else {
      this.setState({
        finalPrize: this.state.playerChoice,
        // isEndGame: true,
        round2: false,
        finalPrizeIndex: this.state.playerChoiceIndex,
      });
    }
  };

  render() {
    const { score } = this.state;

    return (
      <>
        <MaxWidthWrapper>
          <Scoreboard score={score} />
          <DoorSection>{this.displayDoors()}</DoorSection>
          <ButtonSection>{this.displayButtons()}</ButtonSection>
          {this.displayPrompts()}
        </MaxWidthWrapper>
      </>
    );
  }
}

const DoorSection = styled.section`
  display: flex;
  gap: 1rem;
`;

const ButtonSection = styled.section`
  display: flex;
  gap: 2rem;
  padding-top: 1rem;
`;

const MaxWidthWrapper = styled.div`
  max-width: 520px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

// {
//   round2 && (
//     <Button onClick={() => this.playerWillSwap(false)}>
//       Stay
//     </Button>
//   );
// }

// <StartButton
//   isNewGame={isNewGame}
//   onClick={this.startGame}
// >
//   Start Game
// </StartButton>;

// {
//   finalPrize ? (
//     <PlayAgainButton>Play Again</PlayAgainButton>
//   ) : null;
// }

// {
//   round2 && (
//     <Button onClick={() => this.playerWillSwap(true)}>
//       Swap
//     </Button>
//   );
// }
