import ReactDOM from 'react-dom'
import App from './App'

it('renders without crashing', () => {
  const div = staff.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})



