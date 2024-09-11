import React from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="subpage-background">
      <div
        data-collapse="medium"
        data-animation="default"
        data-duration="400"
        data-easing="ease"
        data-easing2="ease"
        role="banner"
        className="nav-bar w-nav"
      >
        <div className="w-container">
          <Link to="/" className="brand-link w-nav-brand">
            <h1 className="logo">Vigilance Scan</h1>
          </Link>
          <nav role="navigation" className="nav-menu w-nav-menu">
            <Link
              href="/contact"
              aria-current="page"
              className="nav-link w-nav-link w--current"
            >
              Contact
            </Link>
          </nav>
          <div className="menu-button w-clearfix w-nav-button">
            <div className="menu-text">MENU</div>
            <div className="menu-icon w-icon-nav-menu"></div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="content-wrapper w-container">
          <h1 className="page-title">Get in touch</h1>
          <div className="contact-row w-row">
            <div className="w-col w-col-6">
              <h2 className="contact-h3">Founder</h2>
              <div>Jane Smith</div>
              <div>555.123.5555</div>
              <Link to="#" className="contact-link">
                norepl@webflow.com
              </Link>
            </div>
            <div className="w-col w-col-6">
              <h2 className="contact-h3">Order Now</h2>
              <div>John Smith</div>
              <div>555.123.5555</div>
              <Link to="#" className="contact-link">
                norepl@webflow.com
              </Link>
            </div>
          </div>
        </div>
        <div className="content w-container">
          <div className="contact-row">
            <h2 className="contact-h3">Contact for More info </h2>
            <div className="form w-form">
              <form
                id="email-form"
                name="email-form"
                data-name="Email Form"
                method="get"
                data-wf-page-id="66da1b4c6bc3f8bd1e9e15cc"
                data-wf-element-id="d7022fe5-f584-4fd4-b99e-9cc0b6645c6f"
              >
                <label for="name" className="field">
                  Name:
                </label>
                <input
                  className="input w-input"
                  maxlength="256"
                  name="name"
                  data-name="Name"
                  placeholder="Enter your name"
                  type="text"
                  id="name"
                />
                <label for="email" className="field">
                  Email Address:
                </label>
                <input
                  className="input w-input"
                  maxlength="256"
                  name="email"
                  data-name="Email"
                  placeholder="Enter your email address"
                  type="email"
                  id="email"
                  required=""
                />
                <label for="Subject" className="field">
                  Subject:
                </label>
                <input
                  className="input w-input"
                  maxlength="256"
                  name="Subject"
                  data-name="Subject"
                  placeholder="Enter your subject"
                  type="email"
                  id="Subject"
                  required=""
                />
                <label for="field" className="field">
                  Message:
                </label>
                <textarea
                  id="field"
                  name="field"
                  placeholder="Enter your message"
                  maxlength="5000"
                  data-name="field"
                  className="input textarea w-input"
                ></textarea>
                <input
                  type="submit"
                  data-wait="Please wait..."
                  className="button contact w-button"
                  value="Send Message"
                />
              </form>
              <div className="success w-form-done">
                <p>Thank you! Your submission has been received!</p>
              </div>
              <div className="w-form-fail">
                <p>Oops! Something went wrong while submitting the form</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="w-container">
          <div className="footer-text">
           Protect your assets with us. 
          </div>
        </div>
      </div>
    </div>
  );
}
