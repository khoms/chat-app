// const MessageBody =({loading:Boolean})=>{

//     return (

// <div className="flex flex-1 border border-1 m-2 ">
//         {loading ? (
//           <div className="w-full flex justify-center items-center">
//             Loading Message...
//           </div>
//         ) : (
//           <div className="w-full flex-col items-center justify-center m-2">
//             {ids.map((id) => {
//               const message = entities[id];
//               const isSender = Boolean(user?._id === message?.senderId);

//               return (
//                 <>
//                   {isSender ? (
//                     <div
//                       className="w-full  flex gap-1 flex-row-reverse p-1 my-1 text-white "
//                       key={id}
//                     >
//                       <div className="flex items-center mt-4">
//                         <div className="w-6 h-6 bg-[#0084FF] rounded-full"></div>
//                       </div>
//                       <div
//                         className=" min-w-[60px] flex justify-center
//                     bg-[#0084FF] px-4 py-3 rounded-full"
//                       >
//                         {message?.message.text}
//                       </div>
//                     </div>
//                   ) : (
//                     <div
//                       className="w-full  flex gap-1 p-1 my-1 text-white "
//                       key={id}
//                     >
//                       <div className="flex items-center mt-4">
//                         <img
//                           src={selectedFriend.image}
//                           className="w-6 h-6 rounded-full bottom-0"
//                         />
//                       </div>
//                       <div className="min-w-[60px] flex justify-center bg-slate-300 text-black px-4 py-3 rounded-full">
//                         {message?.message.text}
//                       </div>
//                     </div>
//                   )}
//                 </>
//               );
//             })}
//           </div>
//         )}
//       </div>

//     )
// }

// export default MessageBody;
