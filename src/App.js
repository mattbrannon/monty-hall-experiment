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
    playerHasChosen: false,
    playerHasSwaped: false,
    finalPrize: null,
    count: 0,
    isEndGame: false,
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
        isEndGame: true,
      }));
    }

    // if (isNewGame !== prevState.isNewGame) {
    //   this.setState({ round1: true });
    // }

    if (
      this.state.isEndGame &&
      this.state.isEndGame !== prevState.isEndGame
    ) {
      const doors = createDoors();
      this.setState({
        doors: doors,
        playerChoice: '',
        playerChoiceIndex: null,
        hostChoice: null,
        isNewGame: true,
        round1: false,
        round2: false,
        playerHasChosen: false,
        playerHasSwaped: false,
        finalPrize: null,
        isEndGame: false,
      });
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
        isEndGame={this.state.isEndGame}
      >
        {i + 1}
      </Door>
    ));
  }

  displayPrompts() {
    const { round1, round2 } = this.state;
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
    }
  }

  handleDoorSelection = (door, i) => {
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
  };

  startGame = () => {
    this.setState({ round1: true, isNewGame: false });
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
        isEndGame: true,
      });
    } else {
      this.setState({
        finalPrize: this.state.playerChoice,
        isEndGame: true,
      });
    }
  };

  render() {
    return (
      <>
        <MaxWidthWrapper>
          <Scoreboard score={this.state.score} />
          <DoorSection>{this.displayDoors()}</DoorSection>
          <ButtonSection>
            {this.state.round2 && (
              <Button stay onClick={() => this.playerWillSwap(false)}>
                Stay
              </Button>
            )}

            <StartButton
              isNewGame={this.state.isNewGame}
              onClick={this.startGame}
            >
              Start Game
            </StartButton>
            {this.state.round2 && (
              <Button swap onClick={() => this.playerWillSwap(true)}>
                Swap
              </Button>
            )}
          </ButtonSection>
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
