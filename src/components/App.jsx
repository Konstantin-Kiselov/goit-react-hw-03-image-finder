import { Component } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import Container from './Container/Container';
import Searchbar from '../Searchbar/Searchbar';
// import Section from './Section/Section';
// import ContactList from './ContactList/ContactList';
// import Form from './Form/Form';
// import Filter from './Filter/Filter';
import Modal from './Modal/Modal';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    searchQuery: '',
    // gallery: null,
    showModal: false,
    // loading: false,
    modalImg: '',
  };

  onSubmitInput = newQuery => {
    this.setState({ searchQuery: newQuery });
  };

  handleClickImg = e => {
    const imgForModal = e.target.dataset.src;
    console.log(imgForModal);
    this.setState({ showModal: true, modalImg: imgForModal });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal, modalImg } = this.state;
    // const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={modalImg} alt="" />
          </Modal>
        )}
        <Searchbar onSubmit={this.onSubmitInput} />
        <ImageGallery
          onClick={this.handleClickImg}
          searchQuery={this.state.searchQuery}
        />

        {/* <Section title="Phonebook">
          <Form onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={this.changeFitler} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </Section> */}
      </Container>
    );
  }
}

export default App;
