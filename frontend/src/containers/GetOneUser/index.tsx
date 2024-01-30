import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import {
  AppActions,
  AppDispatch,
  RootState,
  useAppSelector,
} from "../../store";
import { GetOneUserComponent } from "../../components";

export const GetOneUserContainer: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (id) {
      dispatch(AppActions.user.getOneUserRequest(id));
      dispatch(AppActions.transaction.getTransactionRequest(id));
    }
  }, []);

  const transaction = useAppSelector(
    (store: RootState) => store.transaction.transactions
  );

  const user = useAppSelector(
    (store: RootState) => store.user.user
  )
  return <GetOneUserComponent transaction={transaction} user={user} />;
};
