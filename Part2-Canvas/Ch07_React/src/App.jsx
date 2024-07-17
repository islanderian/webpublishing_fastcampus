import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("asdf");
  }, []);

  return <div className="App">hi</div>;
}

export default App;
