import React, { Component } from 'react';

class ContactMe extends Component {

  render() {
    return (
      <>
        <div id='ContactComponent'>Contact-Component</div>
        <a href="mailto:s.sabrina.marek@gmail.com" className='text-decoration-none fc-white d-flex align-items-center'>
          <span className="m-s-filled pe-2 fs-4">email</span> s.sabrina.marek@gmail.com
        </a>
      </>
    );
  }
}

export default ContactMe;
