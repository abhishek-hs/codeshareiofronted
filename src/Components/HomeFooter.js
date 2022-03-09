import React from "react";

export default function HomeFooter() {
  return (
    <section className="features--home">
      <div className="container">
        <div className="group">
          <div className="span4">
            <h3>Code with your team</h3>
            <p>
              Open a Codeshare editor, write or copy code, then share it with
              friends and colleagues. Pair program and troubleshoot together.
            </p>
            <p>
              <a className="btn-secondary-custom " rel="nofollow">
                Hack together
              </a>
            </p>
          </div>
          <div className="span4">
            <h3>Interview developers</h3>
            <p>
              Set coding tasks and observe in real-time when interviewing
              remotely or in person. Nobody likes writing code on a whiteboard.
            </p>
            <p>
              <a className="btn-secondary-custom " rel="nofollow">
                Start an interview
              </a>
            </p>
          </div>
          <div className="span4">
            <h3>Teach people to program</h3>
            <p>
              Share your code with students and peers then educate them.
              Universities and colleges around the world use Codeshare every
              day.
            </p>
            <p>
              <a className="btn-secondary-custom " rel="nofollow">
                Teach code
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
