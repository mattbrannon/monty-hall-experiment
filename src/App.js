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
    finalPrize: null,
    finalPrizeIndex: null,
    count: 0,
    playerWins: null,
    reset: false,

    playerWillSwap: this.playerWillSwap.bind(this),
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
      this.setState((state) => ({
        ...state,
        playerWins: finalPrize === 'car',
        round3: true,
      }));
    }

    if (this.state.round1 && this.state.round1 !== prevState.round1) {
      this.setState({ doors: createDoors() });
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
        round1={this.state.round1}
        finalPrize={this.state.finalPrize}
        finalPrizeIndex={this.state.finalPrizeIndex}
        reset={this.state.reset}
        restart={this.state.resetGame}
      >
        {i + 1}
      </Door>
    ));
  }

  displayPrompts() {
    if (this.state.round1) {
      return <Round1 />;
    } else if (this.state.round2) {
      return <Round2 state={this.state} />;
    } else if (this.state.round3) {
      const { finalPrize, playerWins } = this.state;
      const props = { playerWins, finalPrize };
      return <Round3 {...props} />;
    }
  }

  displayButtons = () => {
    if (this.state.isNewGame) {
      return (
        <StartButton onClick={this.startGame} isNewGame={this.state.isNewGame}>
          Start Game
        </StartButton>
      );
    } else if (this.state.round2) {
      return (
        <>
          <Button onClick={() => this.playerWillSwap(true)}>Swap</Button>
          <Button onClick={() => this.playerWillSwap(false)}>Stay</Button>
        </>
      );
    } else if (this.state.round3) {
      return (
        <StartButton onClick={this.resetGame} isNewGame={this.state.round3}>
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
    this.setState({ reset: true, playerWins: null });
    this.restartGame();
  };

  restartGame = () => {
    setTimeout(() => {
      this.setState((state) => {
        return {
          ...state,
          doors: [],
          playerChoice: '',
          playerChoiceIndex: null,
          hostChoice: null,
          isNewGame: true,
          round1: false,
          round2: false,
          round3: false,
          finalPrize: null,
          finalPrizeIndex: null,
          count: 0,
          playerWins: null,
          reset: false,
        };
      });
      this.startGame();
    }, 500);
  };

  playerWillSwap(swap) {
    const { doors, playerChoice, playerChoiceIndex, hostChoice } = this.state;

    if (swap) {
      const lastDoor = getFinalDoor(doors, playerChoiceIndex, hostChoice);
      this.setState({
        finalPrize: doors[lastDoor],
        round2: false,
        finalPrizeIndex: lastDoor,
      });
    } else {
      this.setState({
        finalPrize: playerChoice,
        round2: false,
        finalPrizeIndex: playerChoiceIndex,
      });
    }
  }

  render() {
    const { playerWins } = this.state;
    return (
      <>
        <>
          <Scoreboard playerWins={playerWins} />
          {/* <DoorSection>{this.displayDoors()}</DoorSection> */}
          <Group>{this.displayDoors()}</Group>
          <ButtonSection>{this.displayButtons()}</ButtonSection>
          <PromptsSection>{this.displayPrompts()}</PromptsSection>
          {/* <Round1 {...this.state} /> */}
        </>
      </>
    );
  }
}

const Group = styled.div`
  display: flex;
  gap: 3rem;
  position: relative;
  justify-content: center;
  /* padding: 30px 25%; */
`;

const ButtonSection = styled.section`
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  gap: 1rem;
`;

const PromptsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding-top: 1rem;
`;

// const MaxWidthWrapper = styled.div`
//   max-width: 520px;
//   margin-right: auto;
//   margin-left: auto;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 24px;
// `;

const Round2 = ({ state }) => {
  return (
    <>
      <p>Monty has revealed a goat in door {state.hostChoice + 1}</p>
      <b>Do you want to swap doors or stay?</b>
    </>
  );
};

const Round1 = () => {
  return <b>Please make your selection</b>;
};

const Round3 = ({ playerWins, finalPrize }) => {
  switch (playerWins) {
    case true:
      return (
        <>
          <b>Winner winner chicken dinner!</b>
          <h3>Player wins a brand new {finalPrize}</h3>
        </>
      );
    case false:
      return <b>Have fun with your {finalPrize}!</b>;
    default:
      return null;
  }
};
