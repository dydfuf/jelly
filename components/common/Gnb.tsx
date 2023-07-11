export default function Gnb() {
  return (
    <header className="flex fixed top-0 h-40 w-full items-center px-12">
      <button className="mr-auto w-20 h-20 flex items-center justify-center"> {`<-`} </button>
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">hello world!</div>
      <button className="ml-auto w-32 h-32 flex items-center justify-center">Add</button>
    </header>
  );
}
