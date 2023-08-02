const Chat = ({ selectedFriend }: { selectedFriend: string }) => {
  return (
    <div className="h-[100vh] py-8 flex-1 flex flex-col justify-between">
      <div className="flex justify-between px-3 shadow-lg py-2 border-l">
        <div className="flex gap-2 items-center">
          <img
            src="https://t3.ftcdn.net/jpg/03/16/72/68/360_F_316726850_Kp5gHry52XIA0Cedl7b2K1remR1hJ8NU.jpg"
            className="h-14 w-14 rounded-full"
          />
          <div className="font-bold text-lg">{selectedFriend}</div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="p-4 bg-gray-300 rounded-full"></div>
          <div className="p-4 bg-gray-300 rounded-full"></div>

          <div className="p-4 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Message section */}
      <div className="flex justify-center items-center flex-1 border border-1 m-2">
        this is chat section
      </div>
      {/* Footer section */}
      <div className="flex gap-2 px-2">
        <div className="flex gap-2 items-center">
          <div className="p-4 bg-gray-300 rounded-full"></div>
          <div className="p-4 bg-gray-300 rounded-full"></div>

          <div className="p-4 bg-gray-300 rounded-full"></div>
        </div>
        <input
          type="text"
          placeholder="Aa"
          className="border-1 border-gray-500 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-slate-200 rounded-3xl text-sm shadow outline-none focus:outline-none focus:ring w-full pl-4"
        />
        <div className="p-4 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default Chat;
