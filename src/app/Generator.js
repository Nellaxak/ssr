import DataLength from "./DataLength";
function* generateSequence() {
  yield 1;//event (start/click)
  yield 11;//new Item start?
  yield 2;//concat
  return 3;
}
export default generateSequence