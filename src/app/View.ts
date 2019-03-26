
export interface View {
  start: (onSuccess: Function, onFail: Function) => void;
  loadData?: (onSuccess: Function, onFail: Function) => void;
  render: (onSuccess: Function, onFail: Function) => void;
}
