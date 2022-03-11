import { Layout } from 'components/Layout';
import { ToastContainer } from 'react-toastify';
import '../styles/index.css'
import 'react-toastify/dist/ReactToastify.css'

const App = ({ Component, pageProps }) => {
  return (
      <Layout>
        <ToastContainer/>
        <Component {...pageProps} />
      </Layout>
  )
}

export default App;
