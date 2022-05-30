/* eslint-disable react-hooks/exhaustive-deps */

import { db } from "./firebase";
import { ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  var firepadRef = ref(db);
  const [realData, setRealData] = useState([]);
  const [perticepentKey, setPerticepentKey] = useState([]);

  useEffect(() => {
    console.log(firepadRef.key);
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
    setPerticepentKey(Object.keys(helloData));
  };

  /**
   * kickout from live room
   */
  const handelDelete = (item) => {
    remove(ref(db, `/-N2uPUf722bPbIXTvo3T/participants/${item}`));
    console.log(item);
  };
  /**
   * mute / unmute user
   */
  const handelMicToggle = (item, value) => {
    update(ref(db, `/-N2uPUf722bPbIXTvo3T/participants/${item}`), {
      preferences: {
        audio: !value,
      },
    });
  };
  /**
   * mute / unmute user
   */
  const handelCaneraToggle = (item, value) => {
    update(ref(db, `/-N2uPUf722bPbIXTvo3T/participants/${item}`), {
      preferences: {
        video: !value,
      },
    });
  };

  return (
    <div className="container my-5">
      <h3 className='text-center text-primary'>Admin Control (Video Call)</h3>
      <h5 className='text-danger text-bold mt-5'>No of people join -({realData.length})</h5>

      <div class="card shadow" style={{ border: 'none', outline: 'none' }}>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Index</th>
                <th scope="col">Name</th>
                <th scope="col">Mic</th>
                <th scope="col">Video</th>
                <th scope="col">Controls</th>
              </tr>
            </thead>
            <tbody>
              {realData.map((item, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.userName}</td>
                    <td>
                      {item.preferences.audio ? (
                        <i class="fa fa-microphone" aria-hidden="true"></i>
                      ) : (
                        <i
                          class="fa fa-microphone-slash"
                          aria-hidden="true"
                        ></i>
                      )}
                    </td>
                    <td>
                      {item.preferences.video ? (
                        <i class="fa fa-video-camera" aria-hidden="true"></i>
                      ) : (
                        <i class="fa-solid fa-video-slash"></i>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handelDelete(perticepentKey[index])}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-primary mx-2"
                        onClick={() =>
                          handelMicToggle(
                            perticepentKey[index],
                            item.preferences.audio
                          )
                        }
                      >
                        Mic
                      </button>
                      <button
                        className="btn btn-info"
                        onClick={() =>
                          handelCaneraToggle(
                            perticepentKey[index],
                            item.preferences.video
                          )
                        }
                      >
                        Camera
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <h5 className='text-danger text-bold mt-5'>join id " -N2uPUf722bPbIXTvo3T "</h5>
    </div>
  );
}

export default App;
