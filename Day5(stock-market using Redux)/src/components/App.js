import { Navbar } from './Navbar';
import { Portfolio } from './Portfolio';
import { StockList } from './StockList';

function App() {
  return (
    <div className="flex-column gap-3">
      <Navbar />
      <div className="flex-row gap-2 flex-wrap">
        <div className="flex-grow flex-basis-0" style={{"minWidth": "300px"}}>
          <StockList />
        </div>
        <div className="flex-grow flex-basis-0" style={{"minWidth": "300px"}}>
          <Portfolio />
        </div>
      </div>
    </div>
  );
}

export default App;
