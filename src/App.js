import Main from './Main';
import { AppProvider } from './contexts/AppContext';

function App() {
	return (
		<AppProvider>
			<Main />
		</AppProvider>
	);
}

export default App;
