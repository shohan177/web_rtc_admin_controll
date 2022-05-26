import { db } from "./firebase";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect } from "react";

import { uid } from "uid";

function App() {
  var firepadRef = ref(db);
  const [realData, setRealData] = useState([]);
  const [perticepentKey, setPerticepentKey] = useState([]);

  useEffect(() => {
    console.log(firepadRef.key)
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();

      if (data !== null) {
        dataSync(data["-N2uPUf722bPbIXTvo3T"].participants);
      }
    });
  }, []);

  /**
   * push user data to state  
   */
  const dataSync = (helloData) => {
    setRealData(Object.values(helloData));
    setPerticepentKey(Object.keys(helloData))
  };

  /**
   * kickout from live room  
   */
  const handelDelete = (item) => {
    remove(ref(db, `/-N2uPUf722bPbIXTvo3T/participants/${item}`));
    console.log(item);

  }
  /**
   * mute / unmute user
   */
  const handelMicToggle = (item, value) => {

    update(ref(db, `/-N2uPUf722bPbIXTvo3T/participants/${item}`), {
      preferences: {
        audio: !value
      }


    });
  }
  /**
   * mute / unmute user
   */
  const handelCaneraToggle = (item, value) => {

    update(ref(db, `/-N2uPUf722bPbIXTvo3T/participants/${item}`), {
      preferences: {
        video: !value
      }


    });
  }

  console.log(realData);

  return (
    <div className="App">
      <ul>
        {realData.map((item, index) => (
          <div style={{ display: "flex", gap: 100, listStyle: "none" }}>
            <li>
              <i class="fa fa-user" aria-hidden="true"></i>
              {"  "}
              {item.userName}
            </li>
            <li>
              {item.preferences.audio ? (
                <i class="fa fa-microphone" aria-hidden="true"></i>
              ) : (
                <i class="fa fa-microphone-slash" aria-hidden="true"></i>
              )}
            </li>
            <li>
              {item.preferences.video ? (
                <i class="fa fa-video-camera" aria-hidden="true"></i>
              ) : (
                <i class="fa fa-window-close" aria-hidden="true"></i>
              )}
            </li>
            <li>
              <button onClick={() => handelDelete(perticepentKey[index])}>delete</button>
              <button onClick={() => handelMicToggle(perticepentKey[index], item.preferences.audio)}>MiC</button>
              <button onClick={() => handelCaneraToggle(perticepentKey[index], item.preferences.video)}>Camera</button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );

}

export default App;
