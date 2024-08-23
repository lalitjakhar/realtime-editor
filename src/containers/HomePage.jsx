import { useState } from "react";
import LogoEditor from "../assets/editorlogo.png";
import { v4 as uuid4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuid4();
    setRoomId(id);
    toast.success("Created New Room");
  };
  const joinRoom = () => {
    if (!roomId || !userName) {
      toast.error("Room Id & Username is required");
      return;
    }
    navigate(`/editor/${roomId}`, {
      state: {
        userName,
      },
    });
  };
  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img className="homePageLogo" src={LogoEditor} alt="code-sync-logo" />
        <h4 className="mainLabel">Paste invitation ROOM ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="ROOM ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="USERNAME"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button className="btn joinBtn" onClick={joinRoom}>
            Join
          </button>
          <span className="createInfo">
            If you don&apos;t have an invite then create &nbsp;
            <a onClick={createNewRoom} href="" className="createNewBtn">
              new room
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>
          Built with 💛 &nbsp; by &nbsp;
          <a href="https://github.com/lalitjakhar">Jakhar</a>
        </h4>
      </footer>
    </div>
  );
};

export default HomePage;
