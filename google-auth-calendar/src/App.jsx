import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
function App() {
  // state for summary,description,location,startTime,endTime
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [signIn, setSignIn] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      const { code } = codeResponse;
      axios
        .post("http://localhost:4000/api/create-tokens", { code })
        .then((response) => {
          console.log(response.data);
          setSignIn(true);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    flow: "auth-code",
    scope: "openid email profile https://www.googleapis.com/auth/calendar"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/create-event", {
        summary,
        description,
        location,
        startTime,
        endTime,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <h1>Google Auth Calendar</h1>
      </div>
      {!signIn ? (
        <div>
          <button onClick={() => login()}>Sign in with Google 🚀</button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="summary">summary</label>
            <br />
            <input
              type="text"
              id="summary"
              name="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
            <br />
            <label htmlFor="description">description</label>
            <br />
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <label htmlFor="location">location</label>
            <br />
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <br />
            <label htmlFor="startTime">startTime</label>
            <br />
            <input
              type="datetime-local"
              id="startTime"
              name="startTime"
              value={startTime} 
              onChange={(e) => setStartTime(e.target.value)}
            />
            <br />
            <label htmlFor="endTime">endTime</label>
            <br />
            <input
              type="datetime-local"
              id="endTime"
              name="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
            <br />
            <button type="submit">Create Event</button>
          </form>
        </div>
      )}
    </>
  );
}

export default App;
