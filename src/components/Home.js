import React from "react";

const Home = () => {
  return (
    <div className="container content">
      <h2 className="title is-4">How to use this tool</h2>
      <ol>
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
            Add any contact info or exchange instructions to your profile page
            (top-right corner next to LogOut)
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
        <li>There is no way to reset the password.</li>
        <li>The email address is not verified.</li>
        <li>blah</li>
      </ol>
    </div>
  );
};

export default Home;
