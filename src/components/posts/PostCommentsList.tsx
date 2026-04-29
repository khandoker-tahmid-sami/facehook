import DeleteIcon from "../../assets/icons/delete.svg";
import { useAuth } from "../../hooks/useAuth";

export const PostCommentsList = ({ postComments }) => {
  const { auth } = useAuth();
  const handleCommentDelete = () => {};
  return (
    <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
      {postComments &&
        [...postComments]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .map((comment, index) => {
            const isMe = comment?.author?.id === auth?.user?.id;
            return (
              <div key={index} className="flex items-center gap-3 pt-4">
                <img
                  className="max-w-6 max-h-6 rounded-full aspect-square object-cover"
                  src={`${import.meta.env.VITE_SERVER_BASE_URL}/${comment?.author?.avatar}`}
                  alt="avatar"
                />
                <div>
                  <div className="flex gap-1 text-xs lg:text-sm">
                    <span>{comment?.author?.name}: </span>
                    <span>{comment?.comment}</span>
                    {isMe && (
                      <button
                        onClick={handleCommentDelete}
                        className="cursor-pointer ml-4"
                      >
                        <img src={DeleteIcon} alt="3dots of Action" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

// export const PostCommentsList = ({ postComments }) => {
//   return (
//     <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
//       {postComments &&
//         [...postComments]
//           .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
//           .map((comment, index) => (
//             <div key={index} className="flex items-center gap-3 pt-4">
//               <img
//                 className="max-w-6 max-h-6 rounded-full aspect-square object-cover"
//                 src={`${import.meta.env.VITE_SERVER_BASE_URL}/${comment?.author?.avatar}`}
//                 alt="avatar"
//               />
//               <div>
//                 <div className="flex gap-1 text-xs lg:text-sm">
//                   <span>{comment?.author?.name}: </span>
//                   <span>{comment?.comment}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//     </div>
//   );
// };
