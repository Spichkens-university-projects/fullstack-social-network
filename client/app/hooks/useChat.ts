import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { IMessage } from "../components/types/message.interface";

const SOCKET_SERVER = `http://${process.env["API_HOST"]}:${process.env["API_PORT"]}/chat`;

const useChat = (roomId: string) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);

  useEffect(() => {
    if (!roomId) return;
    const newSocket = io(SOCKET_SERVER, {
      query: { roomId },
      transports: ["websocket"],
    });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [roomId, setSocket]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("dialog:join", { roomId });

    socket.on("message:get", (message: IMessage) => {
      setMessages((prevState) => [...prevState, message]);
    });

    socket.on("dialog:joined", () => {
      console.log("подрубился");
    });

    return () => {
      socket.emit("dialog:leave", roomId);
      socket.disconnect();
    };
  }, [roomId, socket]);

  const sendMessage = (message: IMessage) => {
    socket?.emit("message:send", message);
  };

  return { messages, sendMessage };
};

export default useChat;
