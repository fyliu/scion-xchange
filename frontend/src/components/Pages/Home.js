import React from "react";

const Home = () => {
  return (
    <div className="container content">
      <h2 className="title is-4">How to use this app</h2>
      <ol>
        <li className="mb-5">
          <p>
            <strong>Sign Up</strong> and <strong>Login</strong>. Spaces are okay
            in the user name, for example "Luther Burbank". The email address is
            not used by the app, but allows others to contact you if needed.
            <br />
            Add any contact info or exchange instructions to your{" "}
            <strong>profile</strong> page (click on your username at the
            top-right corner next to LogOut)
          </p>
        </li>
        <li className="mb-5">
          <p>
            Go to <strong>OFFERS</strong> and check the cultivars for which you
            have scion wood. Click <strong>Update</strong> to save your
            selection.
          </p>
          <p>
            <strong>Add</strong> any missing cultivars using the form at the
            bottom.
          </p>
        </li>
        <li className="mb-5">
          <p>
            Then, go to <strong>WANTS</strong> and check the cultivars you would
            like. Click <strong>Update</strong> to save your selection.
          </p>
        </li>
        <li className="mb-5">
          <p>
            Finaly, go to <strong>EXCHANGE</strong>...
          </p>
          <ol>
            <li className="mb-4">
              <p>
                You will see a section labeled <strong>Cultivars I want</strong>
                . By clicking on individual cultivars, you will display the
                names and info of willing donors.
              </p>
              <p>
                You can choose to display <strong>Cultivars I offer</strong>. By
                clicking on individual cultivars, you display the names and info
                of those who want your precious wood.
              </p>
              <p>
                Feel free in either case to contact the Donors/Wanters directly
                for a Simple Exchange.
              </p>
            </li>
            <li className="mb-4">
              <p>
                The section labeled <strong>Who can I trade with</strong>{" "}
                contains a list of people. Clicking on individual names will
                display what they can offer you or want from you. This view is
                useful for individual trading.
              </p>
            </li>
          </ol>
        </li>
      </ol>
      <p>Limitations:</p>
      <ol>
        <li>
          This is running on a free account and it can take several seconds to
          load if the app has been inactive for some time.
        </li>
        <li>
          There is no way to change the username/email
          address/password/cultivars added
        </li>
        <li>The email address is not verified.</li>
      </ol>
    </div>
  );
};

export default Home;
