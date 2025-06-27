import {Link} from "react-router-dom";

const BuddyFindingPage = () => {
  return (
    <div>
      <h1>Buddy Finding Page</h1>
      <p>One Step close to your destination !</p>
      <br />
      <ul>
        <li>
      <img src="https://i.imgur.com/0iZuJXu.png" alt="Buddy profile" />
      <p>Buddy's Name</p>
      <p>Buddy's Major</p>
      <p>Buddy's Classification</p>
      <p>Buddy's Walk Count</p>
      <button>Send Request</button>
      <button>Cancel Request</button>
      </li>
      <li>
      <img src="https://i.imgur.com/0iZuJXu.png" alt="Buddy profile" />
      <p>Buddy's Name 2</p>
      <p>Buddy's Major 2</p>
      <p>Buddy's Classification 2</p>
      <p>Buddy's Walk Count 2</p>
      <button>Send Request </button>
      <button>Cancel Request</button>
      </li>
      </ul>
      <Link to="/verify">
      <button>Verification</button>
      </Link>
    </div>
  );
};

export default BuddyFindingPage;
