/* eslint-disable react-hooks/exhaustive-deps */

import { db } from "./firebase";
import { ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect } from "react";
import "./App.css";
import errorImge from './asset/image/error.gif'

function App() {
  var firepadRef = ref(db);
  const [realData, setRealData] = useState([]);
  const [perticepentKey, setPerticepentKey] = useState([]);
  const urlparams = new URLSearchParams(window.location.search);
  const roomId = urlparams.get("管理员密钥");
  const [load, setLoad] = useState(null)

  useEffect(() => {
    if (roomId) {
      setLoad(true)
      onValue(ref(db), (snapshot) => {
        const data = snapshot.val();

        if (data !== null) {
          dataSync(data[roomId].participants);
        }
      });

    } else {

      setLoad(false)

    }

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
    remove(ref(db, `/${roomId}/participants/${item}`));
    console.log(item);
  };
  /**
   * mute / unmute user
   */
  const handelMicToggle = (item, value) => {
    update(ref(db, `/${roomId}/participants/${item}`), {
      preferences: {
        audio: !value,
      },
    });
  };
  /**
   * mute / unmute user
   */
  const handelCaneraToggle = (item, value) => {
    update(ref(db, `/${roomId}/participants/${item}`), {
      preferences: {
        video: !value,
      },
    });
  };

  return (
    <>
      {load ?
        <div className="container my-5">
          <h3 className='text-center text-primary'>Admin Control (Video Call)</h3>


          <h5 className='text-danger text-bold mt-5'>No of people join ({realData.length})</h5>
          <div class="card shadow rounded" style={{ border: 'none', outline: 'none' }}>
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
                          <button
                            style={{ boxShadow: "none", height: "40px", width: "40px" }}
                            className={item.preferences.audio ? "btn btn-danger mx-2 rounded-circle" : "btn btn-primary mx-2 rounded-circle"}
                            onClick={() =>
                              handelMicToggle(
                                perticepentKey[index],
                                item.preferences.audio
                              )
                            }
                          >
                            {item.preferences.audio ? (
                              <i class="fa fa-microphone" aria-hidden="true"></i>
                            ) : (
                              <i
                                class="fa fa-microphone-slash"
                                aria-hidden="true"

                              ></i>
                            )}
                          </button>

                        </td>
                        <td>
                          <button
                            style={{ boxShadow: "none", height: "40px", width: "40px" }}
                            className={item.preferences.video ? "btn btn-danger rounded-circle" : "btn btn-info rounded-circle"}
                            onClick={() =>
                              handelCaneraToggle(
                                perticepentKey[index],
                                item.preferences.video
                              )
                            }
                          >

                            {item.preferences.video ? (
                              <i class="fa fa-video-camera" aria-hidden="true"></i>
                            ) : (
                              <i class="fa-solid fa-video-slash" ></i>
                            )}
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handelDelete(perticepentKey[index])}
                          >
                            Delete
                          </button>


                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
        :
        <>
          <div className="container">
            <div className="page-body">
              <img src={errorImge} alt="" />
              <h2>Hmm....... Page Not Found !</h2>
            </div>
          </div>
        </>
      }
    </>
  );
}

export default App;
