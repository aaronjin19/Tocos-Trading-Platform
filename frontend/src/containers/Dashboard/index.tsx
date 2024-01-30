import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import {
  AppActions,
  AppDispatch,
  RootState,
  useAppSelector,
} from "../../store";
import {
  AddTransactionComponent,
  AddUserComponent,
  DashboardComponent,
} from "../../components";
import { IAddTransaction, IAddUser } from "../../types";
import { FormikHelpers } from "formik";

export const DashboardContainer: React.FC = () => {
  const [modal, setModal] = useState({ select: false, show: false });
  const dispatch = useDispatch<AppDispatch>();
  const users = useAppSelector((store: RootState) => store.user.users);
  useEffect(() => {
    dispatch(AppActions.loading.setNavNumber(0));
    dispatch(AppActions.user.getUserRequest());
  }, []);
  const onUserSubmit = (value: IAddUser, actions: FormikHelpers<IAddUser>) => {
    dispatch(AppActions.user.addUserRequest(value));
    actions.resetForm();
    closeModal();
  };
  const onTransactionSubmit = (
    value: IAddTransaction,
    actions: FormikHelpers<IAddTransaction>
  ) => {
    dispatch(AppActions.transaction.addTransactionRequest(value));
    actions.resetForm();
    closeModal();
  };
  const closeModal = () => setModal({ ...modal, show: false });
  const overlayClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <div className="w-full h-full">
      <DashboardComponent
        users={users}
        showUser={() => setModal({ select: true, show: true })}
        showTransaction={() => setModal({ select: false, show: true })}
      />
      <div
        className={`fixed inset-0 z-10 flex items-center w-full ${
          modal.show ? "" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={overlayClose}
        ></div>
        <div className="z-20 bg-white p-6 m-auto bg-opacity-90">
          {modal.select ? (
            <AddUserComponent onSubmit={onUserSubmit} />
          ) : (
            <AddTransactionComponent
              onSubmit={onTransactionSubmit}
              users={users}
            />
          )}
        </div>
      </div>
    </div>
  );
};
