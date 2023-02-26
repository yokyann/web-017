import { ReactDOM } from "react";
import { CardList } from "./components/CardList";

// A l'ancienne

ReactDOM.render(
    <CardList/>,
  document.getElementById('root')
);

// A la nouvelle

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CardList/>
    </React.StrictMode>
)


