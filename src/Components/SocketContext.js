import React, { useRef, useState, createContext } from "react";
import io from "socket.io-client";
import { Device } from "mediasoup-client";

const SocketContext = createContext();

const videoConstraints = {
  width: {
    min: 640,
    max: 1920,
  },
  height: {
    min: 400,
    max: 1080,
  },
};

const ContextProvider = ({ children }) => {
  const [CallOnline, setCallOnline] = useState(false);
  const [fontSizeProvider, setfontSizeProvider] = useState(14);
  const socketRef = useRef();
  const userVideo = useRef();
  const producerTransport = useRef();
  const device = useRef();
  const producer = useRef();
  const rtpCapabilities = useRef();
  const consumerTransports = useRef([]);

  const TurnOnsocket = () => {
    socketRef.current = io.connect("http://localhost:4000/mediasoup");
    joinRoom();
    getProducers();
    socketRef.current.on("producer-closed", ({ remoteProducerId }) => {
      // server notification is received when a producer is closed
      // we need to close the client-side consumer and associated transport

      const producerToClose = consumerTransports.current.find(
        (transportData) => transportData.producerId === remoteProducerId
      );
      producerToClose.consumerTransport.close();
      producerToClose.consumer.close();

      consumerTransports.current = consumerTransports.current.filter(
        (transportData) => transportData.producerId !== remoteProducerId
      );

      const videoContainer = document.getElementById("videoContainer");
      videoContainer.removeChild(
        document.getElementById(`td-${remoteProducerId}`)
      );
    });

    socketRef.current.on("some-one-joined", () => {
      console.log("called");
      getProducers();
    });

    socketRef.current.on("new-producer", ({ producerId }) =>
      signalNewConsumerTransport(producerId)
    );
  };

  let params = {
    encodings: [
      { rid: "r0", scalabilityMode: "S1T3" },
      { rid: "r1", scalabilityMode: "S1T3" },
      { rid: "r2", scalabilityMode: "S1T3" },
      { rid: "r3", scalabilityMode: "S1T3" },
    ],
    codecOptions: {
      videoGoogleStartBitrate: 1000,
    },
  };

  const VideoCallStart = () => {
    setCallOnline(true);
    const isMobile = navigator.userAgentData.mobile;
    if (isMobile) {
      videoConstraints.facingMode = "user";
    }
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        const track = stream.getVideoTracks()[0];
        params = {
          track,
          ...params,
        };
        createSendTransport();
      })
      .catch((e) => {
        setCallOnline(false);
        alert(e.message);
      });
  };

  const createSendTransport = () => {
    // see server's socket.on('createWebRtcTransport', sender?, ...)
    // this is a call from Producer, so sender = true
    socketRef.current.emit(
      "createWebRtcTransport",
      { consumer: false },
      ({ params }) => {
        // The server sends back params needed
        // to create Send Transport on the client side
        if (params.error) {
          console.log(params.error);
          return;
        }

        // creates a new WebRTC Transport to send media
        // based on the server's producer transport params
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#TransportOptions
        producerTransport.current = device.current.createSendTransport(params);
        console.log(params);
        // https://mediasoup.org/documentation/v3/communication-between-client-and-server/#producing-media
        // this event is raised when a first call to transport.produce() is made
        // see connectSendTransport() below
        producerTransport.current.on(
          "connect",
          async ({ dtlsParameters }, callback, errback) => {
            try {
              // Signal local DTLS parameters to the server side transport
              // see server's socketRef.current.on('transport-connect', ...)
              await socketRef.current.emit("transport-connect", {
                dtlsParameters,
              });
              // Tell the transport that parameters were transmitted.
              callback();
            } catch (error) {
              errback(error);
            }
          }
        );

        producerTransport.current.on(
          "produce",
          async (parameters, callback, errback) => {
            try {
              // tell the server to create a Producer
              // with the following parameters and produce
              // and expect back a server side producer id
              // see server's socketRef.current.on('transport-produce', ...)
              console.log(parameters);
              await socketRef.current.emit(
                "transport-produce",
                {
                  kind: parameters.kind,
                  rtpParameters: parameters.rtpParameters,
                  appData: parameters.appData,
                },
                ({ id, producersExist }) => {
                  // Tell the transport that parameters were transmitted and provide it with the
                  // server side producer's id.
                  callback({ id });

                  // if producers exist, then join room
                  if (producersExist) {
                    getProducers();
                  }
                }
              );
            } catch (error) {
              errback(error);
            }
          }
        );

        connectSendTransport();
      }
    );
  };

  const connectSendTransport = async () => {
    // we now call produce() to instruct the producer transport
    // to send media to the Router
    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#transport-produce
    // this action will trigger the 'connect' and 'produce' events above
    producer.current = await producerTransport.current.produce(params);

    producer.current.on("trackended", () => {
      console.log("track ended");

      // close video track
    });

    producer.current.on("transportclose", () => {
      console.log("transport ended");

      // close video track
    });
  };

  const signalNewConsumerTransport = async (remoteProducerId) => {
    await socketRef.current.emit(
      "createWebRtcTransport",
      { consumer: true },
      ({ params }) => {
        // The server sends back params needed
        // to create Send Transport on the client side
        if (params.error) {
          console.log(params.error);
          return;
        }
        console.log(`PARAMS... ${params}`, params);

        let consumerTransport;
        try {
          consumerTransport = device.current.createRecvTransport(params);
        } catch (error) {
          // exceptions:
          // {InvalidStateError} if not loaded
          // {TypeError} if wrong arguments.
          console.log(error);
          return;
        }

        consumerTransport.on(
          "connect",
          async ({ dtlsParameters }, callback, errback) => {
            try {
              // Signal local DTLS parameters to the server side transport
              // see server's socketRef.current.on('transport-recv-connect', ...)
              await socketRef.current.emit("transport-recv-connect", {
                dtlsParameters,
                serverConsumerTransportId: params.id,
              });

              // Tell the transport that parameters were transmitted.
              callback();
            } catch (error) {
              // Tell the transport that something was wrong
              errback(error);
            }
          }
        );
        connectRecvTransport(consumerTransport, remoteProducerId, params.id);
      }
    );
  };

  const connectRecvTransport = async (
    consumerTransport,
    remoteProducerId,
    serverConsumerTransportId
  ) => {
    // for consumer, we need to tell the server first
    // to create a consumer based on the rtpCapabilities and consume
    // if the router can consume, it will send back a set of params as below

    await socketRef.current.emit(
      "consume",
      {
        rtpCapabilities: device.current.rtpCapabilities,
        remoteProducerId,
        serverConsumerTransportId,
      },
      async ({ params }) => {
        if (params.error) {
          console.log("Cannot Consume");
          return;
        }

        console.log(`Consumer Params`, params);
        // then consume with the local consumer transport
        // which creates a consumer
        const consumer = await consumerTransport.consume({
          id: params.id,
          producerId: params.producerId,
          kind: params.kind,
          rtpParameters: params.rtpParameters,
        });

        consumerTransports.current = [
          ...consumerTransports.current,
          {
            consumerTransport,
            serverConsumerTransportId: params.id,
            producerId: remoteProducerId,
            consumer,
          },
        ];

        // create a new div element for the new consumer media
        // and append to the video container

        const divVal = document.getElementById(`td-${remoteProducerId}`);

        if (!divVal) {
          const newElem = document.createElement("div");
          newElem.setAttribute("id", `td-${remoteProducerId}`);
          newElem.innerHTML =
            '<video class="remoteVideo" id="' +
            remoteProducerId +
            '" autoPlay muted ></video>';
          const videoContainer = document.getElementById("videoContainer");
          videoContainer.appendChild(newElem);
          //     console.log("called")

          // destructure and retrieve the video track from the producer
          const { track } = consumer;

          document.getElementById(remoteProducerId).srcObject = new MediaStream(
            [track]
          );
          // the server consumer started with media paused
          // so we need to inform the server to resume
          socketRef.current.emit("consumer-resume", {
            serverConsumerId: params.serverConsumerId,
          });
        }
        //   setremoteTrack(old=>[...old,{remoteProducerId,track}])
      }
    );
  };

  const getProducers = () => {
    socketRef.current.emit("getProducers", (producerIds) => {
      // for each of the producer create a consumer
      // producerIds.forEach(id => signalNewConsumerTransport(id))
      producerIds.forEach(signalNewConsumerTransport);
    });
  };

  const joinRoom = () => {
    const roomName = window.location.pathname.split("/")[1];
    socketRef.current.emit("joinRoom", { roomName }, (data) => {
      console.log(`Router RTP Capabilities... ${data.rtpCapabilities}`);
      // we assign to local variable and will be used when
      // loading the client Device (see createDevice above)
      rtpCapabilities.current = data.rtpCapabilities;
      // once we have rtpCapabilities from the Router, create Device
      createDevice();
    });
  };

  const createDevice = async () => {
    try {
      device.current = new Device();
      // https://mediasoup.org/documentation/v3/mediasoup-client/api/#device-load
      // Loads the device with RTP capabilities of the Router (server side)
      await device.current.load({
        // see getRtpCapabilities() below
        routerRtpCapabilities: rtpCapabilities.current,
      });

      console.log("Device RTP Capabilities", device.current.rtpCapabilities);

      // once the device loads, create transport
    } catch (error) {
      console.log(error);
      if (error.name === "UnsupportedError")
        console.warn("browser not supported");
    }
  };

  const VideoCallEnd = () => {
    window.location.reload(true);
  };

  return (
    <SocketContext.Provider
      value={{
        userVideo,
        TurnOnsocket,
        VideoCallStart,
        VideoCallEnd,
        CallOnline,
        socketRef,
        fontSizeProvider,
        setfontSizeProvider,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
