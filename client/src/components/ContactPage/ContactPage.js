import React from 'react';
// import ScrollService from '.././../../utilities/ScrollService';
import './ContactPage.css';
import Typical from 'react-typical';
import { AiFillLinkedin, AiFillGithub, AiFillFacebook } from 'react-icons/ai';

const ContactPage = () => {
  return (
    <div className="profile-container">
      <div className="profile-parent">
        <div className="profile-details">
          <div className="colz">
            <div className="colz-icon">
              <a
                href="https://github.com/CodeSevenic"
                rel="noreferrer"
                target="_blank"
              >
                <AiFillGithub className="github" />
              </a>
              <a
                href="https://www.linkedin.com/in/sibusiso-code-sevenic-393a36184/"
                rel="noreferrer"
                target="_blank"
              >
                <AiFillLinkedin className="linkedin" />
              </a>
              <a
                href="https://www.facebook.com/codesevenic"
                rel="noreferrer"
                target="_blank"
              >
                <AiFillFacebook className="facebook" />
              </a>
            </div>
          </div>
          <div className="profile-details-name">
            <span className="primary-text">
              {' '}
              Hello, I'm <span className="highlighted-text">Sibusiso</span>
            </span>
          </div>
          <div className="profile-details-role">
            <span className="primary-text">
              {' '}
              <h1>
                {' '}
                <Typical
                  loop={Infinity}
                  steps={[
                    'Full Stack Developer!💻',
                    2000,
                    'ReactJS Developer ❄',
                    2000,
                    'WordPress/PHP Dev 🍹',
                    2000,
                    'JS/CSS/HTML 🧬',
                    2000,
                  ]}
                />
              </h1>
            </span>
            <span className="profile-role-tagline">
              Building cool stuff with just code is awesome. So, are we gonna
              build these Web apps or what? please get in touch.
            </span>
          </div>
          <div className="contact-details">
            <h3>Personal details & Contacts:</h3>
            <ul>
              <li>Full Name: Sibusiso</li>
              <li>Surname: Shongwe</li>
              <li>Nickname: Code{'{}'}Sevenic</li>
              <li>Email: sevenicbookings@gmail.com</li>
              <li>Mobile no: +27 083-501-4072</li>
            </ul>
          </div>
        </div>
        <div className="profile-picture">
          <div className="profile-picture-background"></div>
        </div>
      </div>
    </div>
  );
};
export default ContactPage;
