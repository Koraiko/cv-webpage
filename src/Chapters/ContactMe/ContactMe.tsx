import React from 'react';

// TODO: P50 -Contact -> not started
const ContactMe = () => {
  return (
    <div className="bg-warning-subtle">
      <div id="ContactComponent">Contact-Component</div>
      <a
        href="mailto:s.sabrina.marek@gmail.com"
        className="text-decoration-none d-flex align-items-center"
      >
        <span className="m-s-filled pe-2 fs-4">email</span>{' '}
        s.sabrina.marek@gmail.com
      </a>
    </div>
  );
};

export default ContactMe;
