import { useState } from "react";
import { Modal, Header, Button, Icon } from "semantic-ui-react";

const Announcement = ({ winner, open = false, setOpen, initializeStates }) => {
  return (
    <>
      <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
      >
        <Header icon>
          <Icon name="winner" />
          Game Completes!
        </Header>
        <Modal.Content textAlign="center">
          <p>
            {winner} wins!
            <br></br>
            Want to play again?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            inverted
            onClick={() => {
              setOpen(false);
              initializeStates();
            }}
          >
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default Announcement;
