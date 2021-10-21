import { Component } from 'react';
import Container from './Container/Container';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    showModal: false,
    modalImg: '',
  };

  onSubmitInput = newQuery => {
    this.setState({ searchQuery: newQuery, page: 1 });
  };

  handleClickImg = e => {
    const imgForModal = e.target.dataset.src;
    this.setState({ showModal: true, modalImg: imgForModal });
  };

  onClickBtn = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal, modalImg } = this.state;

    return (
      <>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={modalImg} alt="" />
          </Modal>
        )}
        <Container>
          <Searchbar onSubmit={this.onSubmitInput} />
          <ImageGallery
            onClickImg={this.handleClickImg}
            searchQuery={this.state.searchQuery}
            page={this.state.page}
            handleClickBtn={this.onClickBtn}
          />
        </Container>
      </>
    );
  }
}

export default App;
