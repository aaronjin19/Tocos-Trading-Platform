import { Link } from "react-router-dom";

import { IUser } from "../../types";

interface DashboardComponentProps {
  users: IUser[];
  showUser: () => void;
  showTransaction: () => void;
}
export const DashboardComponent: React.FC<DashboardComponentProps> = ({
  users,
  showUser,
  showTransaction,
}) => {
  return (
    <div className=" bg-white h-full px-10 py-5">
      <div className="mb-5 flex flex-row gap-5">
        <button
          className="bg-white border border-black text-black hover:bg-black hover:text-white transition-colors px-5 py-2 font-semibold"
          onClick={showUser}
        >
          Add User
        </button>
        <button
          className="bg-white border border-black text-black hover:bg-black hover:text-white transition-colors px-5 py-2 font-semibold"
          onClick={showTransaction}
        >
          Add Transaction
        </button>
      </div>
      <table className="table w-full text-center">
        <thead className="bg-black text-white text-xl">
          <tr>
            <th className="p-2">No</th>
            <th className="p-2">Name</th>
            <th className="p-2">Token</th>
            <th className="p-2">Detail</th>
          </tr>
        </thead>
        <tbody className="text-lg">
          {users.map((item, index) => (
            <tr className="border-b bg-white border-black hover:bg-black hover:text-white transition-colors duration-300" key={index}>
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.token}</td>
              <td className="p-2 underline">
                <Link to={`/user/${item._id}`}>Detail View</Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className="bg-black p-5"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
