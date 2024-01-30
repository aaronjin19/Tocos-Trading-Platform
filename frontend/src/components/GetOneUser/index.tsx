import { Link } from "react-router-dom";
import { ITransaction, IUser } from "../../types";
import { formatDate } from "../../utils/formatDate";
import { PATH } from "../../consts";

interface GetOneUserProps {
  transaction: ITransaction[];
  user: IUser | null;
}

export const GetOneUserComponent: React.FC<GetOneUserProps> = ({
  transaction,
  user,
}) => {
  return (
    <div className="bg-white h-full px-10 py-10 w-full">
      <h1 className="text-center text-4xl font-bold">User Details</h1>
      {user ? (
        <div className="text-center text-xl flex flex-col gap-5 p-5">
          <div>name: {user.name}</div>
          <div>token: {user.token}</div>
          <div>createdDate: {formatDate(user.createdDate)}</div>
          <h3 className="text-center text-4xl font-bold">Transactions</h3>
          <div className="text-center text-xl flex flex-col gap-5">
            {transaction.map((item, index) => (
              <div key={index}>
                {user.name === item.sender.name
                  ? `${item.sender.name} sent ${item.amount} tocos to ${item.receiver.name}`
                  : `${item.receiver.name} received ${item.amount} tocos from ${item.sender.name}`}
              </div>
            ))}
            <Link
              className="m-auto bg-white border border-black text-black hover:bg-black hover:text-white transition-colors px-5 py-2 font-semibold"
              to={PATH.DASHBOARD}
            >
              Go to the Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center p-5">No user information</div>
      )}
    </div>
  );
};
