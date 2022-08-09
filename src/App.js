import React,{useState, useEffect, useRef} from "react";
import "./App.css";

function App() {
	const[number, setNumber] = useState(0);
	const[input, setInput] = useState("");
	const[users, setUsers] = useState([]);
	const[loading, setLoading] = useState(false);
	const inputRef = useRef();

	const increaseHandler = () => {
		setNumber(prevState => prevState + 1);
		console.log(number);
	};
	const decreaseHandler = () => {
		setNumber(prevState => prevState - 1);
		console.log(number);
	};

	useEffect(() => {
		try {
			fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => {
				setLoading(true);
				return response.json()})
			.then(json => { setUsers(json)
				setLoading(false);
			});
		} catch (error) {
			setLoading(false);
		}
		
	}, []);

	const changeInputValue = e => setInput(e.target.value);
	const filteredItems = [...users.filter(item => item.name.toLowerCase().includes(input))];

	const clearHandler = () => {
		setInput("");
		inputRef.current.focus();
	};

	return (
		<div className="counter-container">
			<h1>Counter</h1>
			<div className="counter">{number}</div>
			<div className="counter-btn">
				<div>
					<button onClick={decreaseHandler} className="decrease-btn">Decrease</button>
				</div>
				<div>
					<button onClick={increaseHandler} className="increase-btn">Increase</button>
				</div>
			</div>
			<input ref={inputRef} value={input} type="search" onChange={changeInputValue} />

			{
				loading ? (<p>Loading...</p>) : (
					<React.Fragment>
						{filteredItems.map(user => (
						<p key={user.id}>{user.name}</p> 
						))	}
					</React.Fragment>
				)
			}
		</div>
	);
}

export default App;
