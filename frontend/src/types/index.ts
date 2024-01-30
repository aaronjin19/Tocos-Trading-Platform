export interface IAddUser {
  name: string;
  token: number;
}

export interface IUser extends IAddUser {
  _id: string;
  createdDate: Date;
}

export interface IAddTransaction {
  sender: string;
  receiver: string;
  amount: number;
}

export interface ITransaction {
  sender: {
    _id: string;
    name: string;
  };
  receiver: {
    _id: string;
    name: string;
  };
  amount: number;
  createdDate: Date;
}

export interface ResponseGenerator {
  config?: any;
  data: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
  error?: any;
}
