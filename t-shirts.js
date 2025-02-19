// array of shirts with their details, including stock and quantity
const tshirts = [
  { id: 1, title: 'Blue T-Shirt', image: 'blue-t-shirt.jpg', price: 7.99, stock: 4, quantity: 1 },
  { id: 2, title: 'Bright Purple T-Shirt', image: 'bright-purple-t-shirt.jpg', price: 5.99, stock: 1, quantity: 1 },
  { id: 3, title: 'Cobalt Blue T-Shirt', image: 'cobalt-blue-t-shirt.jpg', price: 9.99, stock: 5, quantity: 1 },
  { id: 4, title: 'Green T-Shirt', image: 'green-t-shirt.jpg', price: 6.99, stock: 0, quantity: 1 },
  { id: 5, title: 'Grey T-Shirt', image: 'blue-t-shirt.jpg', price: 4.99, stock: 2, quantity: 1 },
  { id: 6, title: 'Light Green T-Shirt', image: 'light-green-t-shirt.jpg', price: 7.99, stock: 4, quantity: 1 },
  { id: 7, title: 'Purple T-Shirt', image: 'purple-t-shirt.jpg', price: 7.99, stock: 0, quantity: 1 },
  { id: 8, title: 'Red T-Shirt', image: 'red-t-shirt.jpg', price: 6.99, stock: 3, quantity: 1 },
  { id: 9, title: 'Teal T-Shirt', image: 'teal-t-shirt.jpg', price: 7.99, stock: 2, quantity: 1 }
];

// component for displaying the t-shirts
function Image({ image }) {
  return <img className="img-fluid" src={`images/${image}`} alt="T-Shirt" />;
}

// for displaying the title
function Title({ title }) {
  return <h2>{title}</h2>;
}

// for displaying the price
function Price({ price }) {
  return <p><strong><em>$ {price.toFixed(2)}</em></strong></p>;
}

// for displaying the stock information
function Stock({ stock }) {
  return stock ? <p>{stock} left!</p> : <p className="text-danger">Out of stock</p>;
}

// for handling the purchasing process
function Buy({ stock, quantity, onBuy, onQtyChange }) {
  // creates the options array 
  const options = [];
  for (let i = 1; i <= stock; i++) {
    options.push(i);
  }

  return (
    <form>
      <div className="input-group mb-3">
        <select
          className="form-control"
          value={quantity}
          onChange={(e) => onQtyChange(Number(e.target.value))}
        >
          {/* dropdown to select quantity */}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {/* button to buy shirt with x quantity, only shows if shirt is available */}
        <button
          type="button"
          className="btn btn-outline-secondary input-group-text"
          onClick={onBuy}
          disabled={stock === 0}
        >
          Buy
        </button>
      </div>
    </form>
  );
}

// maint-shirt component that brings everything together for each t-shirt
function Tshirt({ tshirt }) {
  const [stock, setStock] = React.useState(tshirt.stock);
  const [quantity, setQuantity] = React.useState(tshirt.quantity);

  function buyHandler() {
    if (stock >= quantity) {
      setStock(stock - quantity);
      setQuantity(1);
    }
  }

  function qtyChangeHandler(value) {
    setQuantity(value);
  }

  return (
    <div className="col col-12 col-md-6 col-lg-4 my-3">
      <Image image={tshirt.image} />
      <Title title={tshirt.title} />
      <Price price={tshirt.price} />
      <Stock stock={stock} />
      {stock > 0 && (
        <Buy stock={stock} quantity={quantity} onBuy={buyHandler} onQtyChange={qtyChangeHandler} />
      )}
    </div>
  );
}


// main app component that renders the list of t-shirts
function App() {
  return ( 
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>T-Shirts</h1>
        </div>
      </div>
      <div className="row">
         {/*loops through the array of t-shirts and displays a t-shirt component for each one*/}
        {tshirts.map(tshirt => <Tshirt key={tshirt.id} tshirt={tshirt} />)}
      </div>
    </div>
  );
}

// root
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
