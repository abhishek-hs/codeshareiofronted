import React from "react";

export default function Footer() {
  return (
    <footer className="aligncenter">
      <div className="container text-center">
        <p>
          Created by
          <a
            rel="noopener"
            target="_blank"
            href="https://twitter.com/leemunroe"
          >
            Lee Munroe
          </a>
          and
          <a rel="noopener" target="_blank" href="https://twitter.com/tjmehta">
            Tejesh Mehta
          </a>
          .For help and support shoot us an
          <a href="mailto:hello@codeshare.io" rel="noopener" target="_blank">
            email
          </a>
          .
        </p>
        <p>
          <a rel="noopener" target="_blank" href="/privacy">
            Privacy Policy
          </a>
          &nbsp;•&nbsp;
          <a rel="noopener" target="_blank" href="/tos">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
}
