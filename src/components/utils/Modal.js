import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('body');

export default function Modal(props) {
  return (
    <ReactModal
      isOpen={props.isOpen}
      style={styles.root}
      closeTimeoutMS={300}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      onRequestClose={() => props.onClose()}
    >
      <div style={styles.title}>
        <h3>{props.title}</h3>
        <button
          className='button button--secondary'
          onClick={() => props.onClose()}
          style={styles.xButton}
        >
          ×
        </button>
      </div>
      <div style={styles.content}>{props.content}</div>
      <div style={styles.footer}>
        <button
          className='button button--primary button--sm'
          onClick={() => props.onClose()}
        >
          Close
        </button>
      </div>
    </ReactModal>
  );
}

const styles = {
  root: {
    overlay: {
      zIndex: 200,
      padding: '10px',
      overflowY: 'auto',
    },
    content: {
      margin: '20px auto',
      maxWidth: '500px',
      position: 'static',
      padding: '20px 0',
    },
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 20px',
    borderBottom: 'solid 1px lightgrey',
  },
  content: {
    padding: '20px 20px 0 20px',
    borderBottom: 'solid 1px lightgrey',
  },
  footer: {
    display: 'flex',
    justifyContent: 'end',
    paddingTop: '20px',
    paddingRight: '20px',
  },
  xButton: {
    padding: 0,
    lineHeight: 0,
    height: '25px',
    width: '25px',
  },
};
